import {
  EventReceiver,
  antMouseEvents,
  antLvs,
  AntMouseEvent,
  IAnte,
  IAntEvent,
} from "./EventReceiver";
import { Image, ImageLoadSource, ImagePlacement } from "./Image";
import { Shape, ShapeType, QueryShapeInput } from "./Shape";
import {
  ShapeRegister,
  IShapeCfg,
  IShapeContent,
  RegisterID,
} from "./ShapeRegister";
import { EventEmitter } from "./EventEmitter";
import { Canvas } from "./Canvas";
import { isInSide, isInCircle, getRectPoints, getAdaptImgScale } from "./utils";
import { Point, Points } from "./structure";
import { ICursor, displayCursor } from "./cursor";
import _ from "./lodash";
import { css, create } from "./element";
import { MoveKeyCode, FuncKeyCode } from "./keycode";

// 默认配置
const defaulOptions = {
  width: 800,
  height: 600,
  bgColor: `#000`,
  tagShow: true,
  guideLine: false,
  shouldShapeStyleScale: true,
  shouldTagScale: false,
  imagePlacement: ImagePlacement.default,
};
export type LabelImgOptions = typeof defaulOptions;

export class Platform extends EventReceiver {
  private container: HTMLDivElement;
  private tagContainer: HTMLDivElement;
  private _scale: number;
  private _options: LabelImgOptions;
  private shapeRegister: ShapeRegister;
  private drawing: IShapeCfg | null;
  private cache: Shape | null;
  private activeShape: Shape | null;
  private shapeList: Shape[];

  public canvas: Canvas;
  public Image: Image;
  public emitter: EventEmitter;
  private continuity: boolean;

  private _isInit: boolean;
  private _isMouseDown: boolean;
  private _isShapeMoving: boolean;
  private _guideLineOrigin: Point; // 记录坐标点位用于画辅助线中心点

  public isExport?: boolean;

  constructor(
    container: HTMLDivElement,
    LabelImgOptions?: Partial<LabelImgOptions>
  ) {
    super();
    this.container = container;
    css(this.container, {
      position: "relative",
      overflow: "hidden",
    });
    this._options = Object.assign({}, defaulOptions, LabelImgOptions);
    this.emitter = new EventEmitter();

    this.canvas = new Canvas();

    const options = this.options();
    this.canvas.size(options.width, options.height);

    this.container.append(this.canvas.el());

    // 标签容器
    const tagContainer = create("div");
    this.tagContainer = tagContainer;
    this.container.appendChild(this.tagContainer);

    this._scale = 1;
    this.continuity = false;
    this._guideLineOrigin = [0, 0]; // 辅助线中心点

    this.cache = null;
    this.activeShape = null;

    this.Image = new Image();
    this.shapeRegister = new ShapeRegister();
    this.drawing = null;

    this.shapeList = [];

    this._isInit = false;
    this._isMouseDown = false;
    this._isShapeMoving = false;

    this.isExport = false;

    this.render();
    this._init();
  }
  public options = () => {
    return Object.assign({}, this._options);
  };
  public setOptions = (options: Partial<LabelImgOptions>) => {
    this._options = _.merge(this._options, options);
    this.render();
  };
  public reset = () => {
    this._scale = 1;
    this.cache = null;
    this.activeShape = null;
    this.drawing = null;
    this.shapeList = [];
    this.tagContainer.innerHTML = "";
  };
  /**
   * 重置图片大小与坐标点
   */
  public resize = () => {
    if (!this.Image || !this.Image.el) return;
    this._scale = getAdaptImgScale(this.Image.el, this.options());
    if (this.options().imagePlacement === ImagePlacement.center) {
      const { width: cw, height: ch } = this.canvas.el();
      const { width: iw, height: ih } = this.Image.el;
      this.Image.moveTo([(cw - iw) / 2, (ch - ih) / 2]);
    } else {
      this.Image.moveTo([0, 0]);
    }
    this.render();
  };
  /**
   * 初始化
   */
  private _init = () => {
    if (this._isInit) return;
    this._isInit = true;
    const canvas = this.canvas.el();
    const Image = this.Image;
    let keyDownCode: null | number = null;

    let position: Point | null = null;
    // 重置状态
    const resetStatus = () => {
      const isMoving = this._isShapeMoving;
      this._isMouseDown = false;
      this._isShapeMoving = false;
      position = null;
      // shape 移动结束 重新 render
      if (isMoving) {
        this.render();
      }
    };
    // 初始化事件相关
    const _initMouseEvent = () => {
      antMouseEvents.forEach((type) => {
        canvas.addEventListener(type, (e) => {
          e.preventDefault();
          const offset = [e.offsetX, e.offsetY] as Point;
          const isPropagation = true;

          const scale = this._scale;
          // 判断是否在 image 上
          const isOnImage = isInSide(offset, Image.getPosition(scale));

          const [shape, dotIndex] = this.getTargetShape(offset);
          const isOnShape = this._isShapeMoving || !!shape;
          const isOnArc = this._isMouseDown || dotIndex !== -1;

          let currentTarget: null | Image | Shape = isOnShape
            ? shape
            : isOnImage
            ? Image
            : null;
          const currentDotIndex = dotIndex;
          position = offset;
          const ante = {
            offset,
            isOnImage,
            isOnShape,
            isOnArc,
            isPropagation,
            stopPropagation: () => {
              ante.isPropagation = false;
            },
            currentTarget,
            currentDotIndex,
          } as IAnte;

          switch (type) {
            case "mousedown":
              this._isMouseDown = true;
              break;
            case "mouseup":
              resetStatus();
              break;
            case "mouseout":
              resetStatus();
              break;
            case "mouseleave":
              resetStatus();
              break;
            case "mouseenter":
              canvas.focus();
              break;
          }

          const runEventQueue = (
            eventList: IAntEvent[],
            ante: IAnte,
            isTarget?: boolean
          ) => {
            let len = eventList.length;
            const { isPropagation, currentTarget } = ante;
            while (len) {
              if (!isPropagation) {
                len = 0;
                break;
              }
              const event = eventList[len - 1];
              const { callback, ...other } = event;
              if (!isTarget) {
                callback(ev, other);
              } else if (currentTarget === shape) {
                callback(ev, other);
              }
              len--;
            }
          };

          const ev = e as AntMouseEvent;
          ev.ante = ante;
          antLvs.forEach((lv) => {
            // shape event
            if (isOnShape) {
              this.shapeList.forEach((shape) => {
                runEventQueue(shape.getEventsByType(type, lv), ante, true);
              });
            }
            // image event
            if (isOnImage) {
              ev.ante.isPropagation = true;
              runEventQueue(Image.getEventsByType(type, lv), ante);
            }
            // platform event
            if (Image.complate) {
              ev.ante.isPropagation = true;
              runEventQueue(this.getEventsByType(type, lv), ante);
            }
          });
        });
      });
    };
    // 初始化鼠标手势
    const _initCursor = () => {
      this.on("mousemove", ({ ante }) => {
        position = ante.offset;
        if (!this.Image || this._isMouseDown) return;
        const { isOnShape, isOnArc } = ante;
        if (this.drawing) {
          // 当前正在标注
          this.cursor("label");
        } else if (isOnArc) {
          // 判断是否在点上
          this.cursor("pointer");
        } else if (isOnShape) {
          // 鼠标在图形上
          this.cursor("default");
        } else {
          this.cursor("default");
        }
      });
    };
    // 初始化辅助线
    const _initGuideLine = () => {
      const lv = "top";
      this.on("mousemove", lv, (e) => {
        if (!this.options().guideLine) return;
        this._guideLineOrigin = e.ante.offset;
        this.render();
      });
    };
    // 初始化图片事件
    const _initImageEvent = () => {
      const lv = "bot";
      let start = [0, 0]; // 点击在图片的起始位置
      const Image = this.Image;
      this.on("mousedown", lv, (e) => {
        const { offset, isOnShape } = e.ante;
        if (isOnShape || !Image.complate) return;
        const [sx, sy] = offset; // start x, start y
        const [x, y] = Image.getOrigin(); // image origin
        start = [sx - x, sy - y];
      });
      this.on("mousemove", lv, (e) => {
        const { offset, isOnShape } = e.ante;
        if (!this._isMouseDown || this._isShapeMoving) return;
        if (isOnShape) return;
        if (this.drawing) return;

        const [ox, oy] = offset; // offset x, offset y
        const diff = [ox - start[0], oy - start[1]] as Point;
        const position = diff;

        Image.moveTo(position);
        if (this._isMouseDown) {
          this.render();
        }
      });
      const cancel = () => {
        resetStatus();
        start = [0, 0];
      };
      this.on("mouseup", lv, cancel);
      this.on("mouseout", lv, cancel);
    };
    // 初始化缩放事件
    const _initScaler = () => {
      const Image = this.Image;
      Image.on("wheel", (e) => {
        const Image = this.Image;
        if (!Image.el) return;
        const { offset } = e.ante;
        const direction = e.deltaY < 0 ? 1 : -1;
        this.scale(direction, offset);
      });
    };
    // 初始化标注事件
    const _initDrawEvent = () => {
      const lv = "top";
      let start: Point = [0, 0];
      const Image = this.Image;
      this.on("mousedown", lv, (e) => {
        const { offset, isOnImage } = e.ante;
        if (!this.drawing || !Image.el) return;
        // 判断当前点击是否在 img 上
        if (!isOnImage) return;
        // 计算出当前点位在 img 的什么位置
        let point = Image.toImagePoint(offset, this._scale);

        start = point;
        const cache = this.cache;
        if (cache) {
          if (this.drawing.type === ShapeType.Polygon) {
            let isClose = false;
            if (cache.positions.length > 2) {
              const first = cache.positions[0];
              const style = cache.getStyle();
              isClose = isInCircle(point, style.dotRadius, first);
            }
            if (cache.max && cache.positions.length + 1 >= cache.max) {
              cache.positions.push(point);
              isClose = true;
            }
            if (isClose) {
              const shape = this.createShape(this.drawing.registerID, {
                positions: cache.positions,
                closed: false,
              });
              shape.updatePositions(cache.positions).close();
              this.shapeList.push(shape);
              this.cache = null;
              this.emitter.emit("create", shape);
              if (!this.continuity) {
                this.labelOff();
              }
            } else {
              cache.addPoint(point);
            }
          }
        } else {
          let positions: Point | Points = [];
          if (this.drawing.type === ShapeType.Polygon) {
            positions = [point];
          } else if (this.drawing.type === ShapeType.Rect) {
            positions = [point, point, point, point];
          }
          const shape = this.createShape(this.drawing.registerID, {
            positions,
            closed: false,
            id: "cache",
          });
          this.cache = shape;
        }
        this.render();
      });
      this.on("mousemove", lv, (e) => {
        const cache = this.cache;
        if (!this.drawing || !Image.complate || !cache) return;
        const { offset } = e.ante;

        this._isShapeMoving = true;
        const shapeType = this.drawing.type;

        if (shapeType === ShapeType.Rect) {
          const { offset } = e.ante;
          const end = Image.toImagePoint(offset, this._scale);
          const positions: Points = getRectPoints(start, end);
          cache.updatePositions(positions);
          this.render();
        } else if (keyDownCode === FuncKeyCode.E) {
          const point = Image.toImagePoint(offset, this._scale);
          const beforeLen = cache.positions.length;
          cache.addPoint(point);
          const afterLen = cache.positions.length;
          if (afterLen > beforeLen) {
            this.render();
          }
        }
      });
      this.on("mouseup", lv, () => {
        const cache = this.cache;
        const shapeType = this.drawing?.type;
        start = [0, 0];
        if (shapeType === ShapeType.Rect && cache && this.drawing) {
          const positions = cache.getPositions();
          const shape = this.createShape(this.drawing.registerID, {
            positions,
          });
          shape.close();
          this.shapeList.push(shape);
          this.emitter.emit("create", shape);
          this.cache = null;
          if (!this.continuity) {
            this.labelOff();
          }
          this.render();
        }
      });
      this.on("mouseout", lv, () => {});
    };
    // 初始化图形事件
    const _initShapeEvent = () => {
      const lv = "top";
      let start: Point = [0, 0];
      let cp = [] as Points; // cache postion
      let dotIndex = -1;

      const select = (shape: Shape) => {
        this.loseActive();
        shape.setActive(true);
        this.activeShape = shape;
        this.emitter.emit("select", shape);
        this.render();
      };

      this.on("mousedown", lv, (e) => {
        const {
          offset,
          currentTarget: shape,
          currentDotIndex,
          isOnShape,
        } = e.ante;
        start = offset;
        if (this.drawing) return;
        if (!isOnShape || !shape) return;
        if (shape.isDisabled()) {
          this.activeShape = null;
          return;
        }
        e.ante.stopPropagation();

        // 获取 shape 相对于画布的坐标
        dotIndex = currentDotIndex;
        cp = shape.getPositions();
        // this.orderShape(shape)

        if (this.activeShape !== shape) {
          select(shape);
        }
        // 选中则变为 moving 状态
        this._isShapeMoving = true;
        // if(shape.isInsert() && shape.isClose()){
        // 	console.log(offset);
        // 	const isInLine = shape.isOnLine(offset)
        // 	if(isInLine){
        // 		const { position, idx } = isInLine
        // 		cp = shape.getPositions()
        // 		cp.splice(idx + 1, 0, position)
        // 		shape.updatePositions(cp)
        // 		this.render()
        // 	}
        // }
      });
      this.on("mousemove", lv, (e) => {
        const { offsetX, offsetY, ante } = e;
        const { isOnShape } = ante;

        if (
          !isOnShape ||
          !this.activeShape ||
          this.drawing ||
          !this._isMouseDown
        )
          return;
        this._isShapeMoving = true;

        const diff: Point = [offsetX - start[0], offsetY - start[1]];
        let rp: Points = [];

        if (dotIndex === -1) {
          // shape move
          rp = cp.map(([cx, cy]) => {
            return [cx + diff[0] / this._scale, cy + diff[1] / this._scale];
          });
          this.cursor("drag");
        } else {
          // shape point move
          rp = cp.slice();
          const p = rp[dotIndex];

          const scale = this._scale;
          if (this.activeShape.type === "Rect") {
            switch (dotIndex) {
              case 1:
                rp[0] = [rp[0][0], rp[0][1] + diff[1] / scale];
                rp[2] = [rp[2][0] + diff[0] / scale, rp[2][1]];
                break;
              case 3:
                rp[0] = [rp[0][0] + diff[0] / scale, rp[0][1]];
                rp[2] = [rp[2][0], rp[2][1] + diff[1] / scale];
                break;
              default:
                rp[dotIndex] = [p[0] + diff[0] / scale, p[1] + diff[1] / scale];
            }
            rp = getRectPoints(rp[0], rp[2]);
          } else {
            rp[dotIndex] = [p[0] + diff[0] / scale, p[1] + diff[1] / scale];
          }
        }
        this.activeShape.updatePositions(rp);
        if (this._isMouseDown) {
          this.render();
        }
      });
      this.on("mouseup", lv, (e) => {
        start = [0, 0];
        dotIndex = -1;
      });
    };
    // 快捷键
    const _initShortcutKey = () => {
      canvas.addEventListener("keydown", (e) => {
        const keyCode = e.keyCode;
        if (Object.values(MoveKeyCode).some((v) => keyCode === v)) {
          // 移动操作
          const distance = 10;
          const [x, y] = Image.getOrigin();
          switch (keyCode) {
            case MoveKeyCode.W:
              Image.moveTo([x, y + distance]);
              break;
            case MoveKeyCode.S:
              Image.moveTo([x, y - distance]);
              break;
            case MoveKeyCode.A:
              Image.moveTo([x + distance, y]);
              break;
            case MoveKeyCode.D:
              Image.moveTo([x - distance, y]);
              break;
          }
          this.render();
        }
        if (Object.values(FuncKeyCode).some((v) => keyCode === v)) {
          switch (keyCode) {
            case FuncKeyCode.F:
              if (!position) break;
              const [shape, dotIndex] = this.getTargetShape(position);
              if (shape && dotIndex !== -1) {
                shape.rmDot(dotIndex);
              }
              this.render();
              break;
          }
        }
        keyDownCode = keyCode;
      });
      canvas.addEventListener("keyup", () => {
        keyDownCode = null;
      });
    };
    _initMouseEvent();
    _initCursor();
    _initGuideLine();
    _initDrawEvent();
    _initShapeEvent();
    _initImageEvent();
    _initScaler();
    _initShortcutKey();
  };
  /**
   * 加载图片
   * @param source ImageLoadSource 图片对象或图片路径
   */
  public load = (source: ImageLoadSource) => {
    this.reset();
    return new Promise((c, e) => {
      this.Image.load(source).then(
        (img) => {
          this.resize();
          this.render();
          this.emitter.emit("imageReady");
          c(img);
        },
        (err) => {
          e(err);
        }
      );
    });
  };
  public loadFormImg = (img: HTMLImageElement) => {
    this.reset();
    this.Image.loadFromImg(img);
    this.resize();
    this.render();
    this.emitter.emit("imageReady");
  };
  /**
   * 注册图形
   * @param rid RegisterID 图形注册 ID
   * @param options IShapeCfg 图形配置
   */
  public register = (
    rid: RegisterID,
    options: Omit<IShapeCfg, "registerID" | "name">
  ) => {
    if (this.isRegister(rid)) return;
    this.shapeRegister.add(rid, options);
    this.emitter.emit("shapeRegister");
  };
  /**
   * 获取已注册图形 map
   */
  public getRegisterMap = () => {
    return this.shapeRegister.getMap();
  };
  /**
   * 以注册的图形模版创建图形
   * @param rid RegisterID 图形注册 ID
   * @param options IShapeCfg 图形配置
   * @returns Shape
   */
  public createShape = (rid: RegisterID, options?: IShapeContent) => {
    const opts = this.shapeRegister.get(rid);
    return new Shape(Object.assign(opts, options));
  };
  /**
   * 判断图形是否注册
   * @param rid RegisterID 图形注册 ID
   * @returns boolean
   */
  public isRegister = (rid: RegisterID) => {
    return this.shapeRegister.is(rid);
  };
  /**
   * 设置标注图形
   * @param rid RegisterID 图形注册 ID
   * @param continuity boolean 是否连续标注
   */
  public label = (rid: RegisterID, continuity?: boolean) => {
    const drawing = this.shapeRegister.get(rid);
    if (
      (this.drawing && drawing && rid !== this.drawing.id) ||
      (!this.drawing && drawing)
    ) {
      this.drawing = drawing;
      this.emitter.emit("labelType");
    }
    if (!_.isUndefined(continuity)) {
      this.continuity = !!continuity;
    }
  };
  public getLabels = (): { key: string; name: string; type: string[] }[] => {
    const labelMaps = this.shapeRegister.getMap();
    return Object.keys(labelMaps).map((key) => {
      const label = labelMaps[key];
      const { tag, type } = label;
      return {
        key,
        name: tag || key,
        type,
      };
    });
  };
  /**
   * 获取当前标注的图形配置
   * @returns IShapeOptions
   */
  public getDrawing = () => {
    return this.drawing;
  };
  /**
   * 添加图形
   * @param shape Shape 待添加的图形
   * @param idx number 待插入的位置
   */
  public addShape = (shape: Shape, idx?: number) => {
    if (typeof idx === "number") {
      this.shapeList.splice(idx, 0, shape);
    } else {
      this.shapeList.push(shape);
      this.emitter.emit("create");
      this.emitter.emit("update");
    }
    this.render();
  };
  /**
   * 删除图形
   * @param input QueryShapeInput 待删除的图形或 ID
   */
  public remove = (input: QueryShapeInput) => {
    const [idx, shape] = this.findShapeIndex(input);
    if (idx === null) return;
    shape?.tagger.remove();
    this.shapeList.splice(idx, 1);
    this.render();
    this.emitter.emit("delete");
    this.emitter.emit("update");
  };
  public getTargetShape = (offset: Point) => {
    const Image = this.Image;
    const scale = this._scale;
    const styleScale = this.getShapeStyleScale() / scale; // 应用到图形的坐标体系比例变更 除以scale以修正

    let target = null;
    let dotIndex = -1;
    const shapeOffset = Image.toImagePoint(offset, scale);
    if (this.activeShape && this.activeShape.isEnable()) {
      const shape = this.activeShape;
      dotIndex = shape.isOnArc(shapeOffset, styleScale);
      if (dotIndex !== -1) {
        target = shape;
      }
      const isInShape = shape.isOnShape(shapeOffset);
      if (isInShape) {
        target = shape;
      }
    }
    if (!target) {
      // 过滤隐藏和禁用的 shape
      const shapeList = this.shapeList.filter((shape) => shape.isEnable());
      let shapeLen = shapeList.length;
      while (shapeLen > 0) {
        const shape = shapeList[shapeLen - 1];
        dotIndex = shape.isOnArc(shapeOffset, styleScale);
        if (dotIndex !== -1) {
          target = shape;
          break;
        }
        const isInShape = shape.isOnShape(shapeOffset);
        if (isInShape) {
          target = shape;
          break;
        }
        shapeLen--;
      }
    }
    return [target, dotIndex] as [Shape | null, number];
  };
  /**
   * 设置选中的图形
   * @param shape Shape 选中的图形
   */
  public setActive = (shape: Shape) => {
    this.loseActive();
    shape.setActive(true);
    this.render();
  };
  /**
   * 取消标注状态
   */
  public labelOff = () => {
    this.drawing = null;
    this.continuity = false;
    this.emitter.emit("labelType");
    if (this.cache) {
      this.cache = null;
      this.render();
    }
  };
  /**
   * 改变图形排序
   * @param input QueryShapeInput 图形对象或 ID
   * @param flag boolean true: 添加到列表最前 false: 添加到列表最后
   */
  public orderShape = (input: QueryShapeInput, flag?: boolean) => {
    const [idx, shape] = this.findShapeIndex(input);
    if (idx === null) return;
    this.shapeList.splice(idx, 1);
    if (flag) {
      this.shapeList.unshift(shape as Shape);
    } else {
      this.shapeList.push(shape as Shape);
    }
  };
  /**
   * 查询 index 与 Shape 对象
   * @param input QueryShapeInput 图形对象或 ID
   * @returns [number | null, Shape | null]
   */
  private findShapeIndex = (
    input: QueryShapeInput
  ): [null | number, null | Shape] => {
    let idx: null | number = null;
    if (input instanceof Shape) {
      const shape = input;
      idx = this.shapeList.findIndex((item) => item === shape);
    } else if (typeof input === "string") {
      const id = input;
      idx = this.shapeList.findIndex((item) => item.id === id);
    }
    const shape = idx === null ? null : this.shapeList[idx];
    return [idx, shape];
  };
  /**
   * 获取图形列表
   * @returns Shape[] 图形列表
   */
  public getShapeList = () => {
    return this.shapeList;
  };
  public getShapeByName = (name: string) => {
    return this.shapeList.filter((shape) => shape.name === name);
  };
  /**
   * 取消所有图形高亮状态
   */
  private loseActive = () => {
    this.shapeList.forEach((shape) => {
      shape.setActive(false);
    });
  };
  /**
   * 设置辅助线显示
   * @param status boolean
   */
  public setGuideLine = (status?: boolean) => {
    this.setOptions({
      guideLine: _.isUndefined(status) ? !this.options().guideLine : !!status,
    });
    this.render();
  };
  /**
   * 获取是否允许标签显示
   * @return boolean
   */
  public isTagShow = () => {
    return this.options().tagShow;
  };
  /**
   * 设置标签显示
   * @param status boolean 标签是否显示
   */
  public setTagShow = (status?: boolean) => {
    this.setOptions({
      tagShow: _.isUndefined(status) ? !this.isTagShow : !!status,
    });
    this.render();
  };
  /**
   * 设置是否连续标注
   * @param status boolean
   */
  public setContinuity = (status: boolean) => {
    this.continuity = !!status;
  };
  /**
   * 设置手势
   * @param cursor ICursor
   */
  public cursor = _.throttle((cursor: ICursor) => {
    this.canvas.cursor(displayCursor(cursor));
  }, 100);
  public scale = (direction?: -1 | 1, point?: Point) => {
    if (_.isUndefined(direction)) {
      return this._scale;
    }
    const slmt = 0.25; // min scale limit
    const step = 0.05;
    // canvas width and height
    const [cw, ch] = this.canvas.getSize();
    // image width and height
    const [iw, ih] = this.Image.getSize(this._scale);
    let count = 0;

    // 判断缩小到 1/4 则不允许再缩小
    if (direction === -1) {
      if (cw * slmt >= iw) {
        count++;
      }
      if (ch * slmt >= ih) {
        count++;
      }
      if (count === 2) return;
    }
    const after = direction * step;
    let scale = Number((after + this._scale).toFixed(2));

    this.scaleTo(scale, point);
  };
  public scaleTo = (scale: number, point?: Point) => {
    const _scale = Number(scale.toFixed(2));
    const Image = this.Image;
    const [px, py] = point ? point : Image.getCenter(this._scale);

    // 计算画布缩放 (以鼠标位置为中心点)
    const [width, height] = Image.getSize();
    const [ox, oy] = Image.getOrigin();

    const sw = width * this._scale;
    const sw2 = width * _scale;
    const dx = Math.abs(px - ox);
    const fx = px - ox > 0 ? -1 : 1;
    const sx = (dx * sw2) / sw - dx;
    const x = fx * sx + ox;

    const sh = height * this._scale;
    const sh2 = height * _scale;
    const dy = Math.abs(py - oy);
    const fy = py - oy > 0 ? -1 : 1;
    const sy = (dy * sh2) / sh - dy;
    const y = fy * sy + oy;

    Image.moveTo([x, y]);
    this._scale = _scale;
    this.render();
  };
  private getShapeStyleScale = () => {
    return this._options.shouldShapeStyleScale
      ? this._scale
      : Number((1 + this._scale).toFixed(2));
  };
  public moveTo = (origin: Point) => {
    this.Image.moveTo(origin);
  };
  public toDataURL = () => {
    const Image = this.Image;
    if (!Image || !Image.complate || !Image.el) return;
    const [width, height] = Image.getSize();
    const shapeList = this.shapeList.slice();
    const wrap = document.createElement("div");
    const lb = new Platform(wrap, {
      width,
      height,
    });
    lb.isExport = true;
    const map = this.getRegisterMap();
    Object.keys(map).forEach((key) => {
      lb.register(key, map[key]);
    });
    lb.loadFormImg(Image.el);
    lb.scaleTo(1);
    shapeList.forEach((shape) => {
      shape.setActive(false);
      lb.addShape(shape);
    });
    lb.forceRender();
    const canvas = lb.canvas.el();
    const dataURL = canvas.toDataURL();
    return dataURL;
  };
  // 渲染相关
  private _clearCanvas = () => {
    this.emitter.emit("beforeClear");
    this.canvas.clear();
    this.emitter.emit("afterClear");
  };
  private _renderBackground = () => {
    const { bgColor, width, height } = this.options();
    this.emitter.emit("beforeRenderBackground");
    this.canvas.fillReact([0, 0], [width, height], {
      fillColor: bgColor,
    });
    this.emitter.emit("afterRenderBackground");
  };
  private _renderImage = () => {
    const ctx = this.canvas.ctx();
    const Image = this.Image;
    if (!Image || !Image.complate) return;
    const el = Image.getEl() as HTMLImageElement;
    const [width, height] = Image.getSize();
    const x = width * this._scale;
    const y = height * this._scale;
    const [ox, oy] = Image.getOrigin();
    this.emitter.emit("beforeRenderImage");
    ctx.drawImage(el, ox, oy, x, y);
    this.emitter.emit("afterRenderImage");
  };
  private _renderGuideLine = () => {
    const [x, y] = this._guideLineOrigin;
    const options = this.options();
    const lineColor = "red";
    const lineWidth = 1;
    const lineDash = [5];
    const row: Points = [
      [0, y],
      [options.width, y],
    ];
    this.canvas.line(row, {
      lineColor,
      lineWidth,
      lineDash,
    });
    const col: Points = [
      [x, 0],
      [x, options.height],
    ];
    this.canvas.line(col, {
      lineColor,
      lineWidth,
      lineDash,
    });
  };
  private _renderShape = (shape: Shape) => {
    const Image = this.Image;
    if (shape.isHidden()) {
      shape.tagger.remove();
      return;
    }
    const scale = this._scale;
    const { positions } = shape;
    const style = shape.getStyle();

    const { dotColor, dotRadius, lineColor, lineWidth, fillColor } = style;

    const points = Image.getShape2CanvasPoints(positions, scale);

    // 判断是否闭合
    if (shape.isClose() || shape.type === ShapeType.Rect) {
      points.push(points[0]);
    }
    const styleScale = this.getShapeStyleScale();

    // 图形
    const shapeStyle = {
      lineColor,
      lineWidth: lineWidth * scale,
      dotRadius: dotRadius * styleScale,
      dotColor,
      fillColor,
      opacity: 0.7,
    };
    if (shape.isClose()) {
      this.canvas.polygon(points, shapeStyle);
    } else {
      this.canvas.fill(points, shapeStyle);
      this.canvas.line(points, shapeStyle);
      this.canvas.dot(points[0], shapeStyle);
    }

    /**
     * 判断是否显示标签
     * shape 移动和标注状态不显示标签
     */
    const isTagShow =
      this.isTagShow() &&
      shape.isShowTag() &&
      !this._isShapeMoving &&
      !this.drawing;
    const tagger = shape.tagger;
    if (isTagShow) {
      if (this.isExport) {
        this.canvas.text(shape.tagContent, points[0], {
          bgColor: dotColor,
          color: "#fff",
        });
      } else {
        const scale = this._scale;
        tagger.addTo(this.tagContainer);
        tagger.move(points[0], this._options.shouldTagScale ? scale : 1);
      }
    } else {
      tagger.remove();
    }
  };
  private _renderCache = () => {
    if (!this.cache) return;
    this.emitter.emit("beforeRenderDrawing");
    this._renderShape(this.cache);
    this.emitter.emit("afterRenderDrawing");
  };
  private _renderShapeList = () => {
    const Image = this.Image;
    if (!Image || !Image.complate) return;
    const shapeList = this.shapeList;
    if (!shapeList.length) return;
    this.emitter.emit("beforeRenderShape");
    let active: null | Shape = null;
    shapeList.forEach((shape) => {
      if (shape.isActive()) {
        active = shape;
        return;
      }
      this._renderShape(shape);
    });
    if (active) {
      this._renderShape(active);
    }
    this.emitter.emit("afterRenderShape");
  };
  public forceRender = () => {
    this.emitter.emit("beforeRender");
    this._clearCanvas();
    this._renderBackground();
    this._renderImage();
    this._renderShapeList();
    this._renderCache();
    if (this.options().guideLine) {
      this._renderGuideLine();
    }
    this.emitter.emit("afterRender");
  };
  public render = _.throttle(() => {
    this.forceRender();
  }, 17);
}
