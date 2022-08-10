import { Source } from "./source";
import { isString } from "lodash";
import { loadImage } from "../helper/utils";
import { css } from "../helper/dom";
import { Manager } from "./manager";
import {
  renderBackground,
  renderImage,
  fixRectPoint2RenderPoints,
} from "../helper/render";
import { RegisterID } from "src/types";
import { Register, ShapeRegisterProps } from "./register";
import { ShapeProps } from "./shape";

type SourceProps = string | HTMLImageElement;

interface LabelImgOptions {
  width: number;
  height: number;
  backgroundColor: string;
}
type LabelImgOptionsProps = Partial<LabelImgOptions>;

const labelImgDefaultOptions: LabelImgOptions = {
  width: 800,
  height: 600,
  backgroundColor: "#000",
};

export default class LabelImg {
  readonly el: HTMLElement;
  private _drawingCanvas: HTMLCanvasElement;
  private _drawingCtx: CanvasRenderingContext2D;
  private _paintingCanvas: HTMLCanvasElement;
  private _paintingCtx: CanvasRenderingContext2D;

  private _options: LabelImgOptions;
  // 注册器
  private _register: Register;
  // 资源管理器
  public _manager: Manager;
  // 当前选择的资源
  private _source: null | Source;

  constructor(el: HTMLElement, options: LabelImgOptionsProps) {
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error("container 必须为 dom 节点");
    }

    this._options = Object.assign({}, labelImgDefaultOptions, options);
    // 挂载节点
    this.el = el;
    this._register = new Register();
    this._manager = new Manager();
    this._source = null;

    const { width, height } = this._options;

    const container = document.createElement("div");
    css(container, {
      position: "relative",
      width: width + "px",
      height: height + "px",
    });

    // 事件 / 标注层
    const _drawingCanvas = document.createElement("canvas");
    _drawingCanvas.width = width;
    _drawingCanvas.height = height;
    const _drawingCtx = _drawingCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this._drawingCanvas = _drawingCanvas;
    this._drawingCtx = _drawingCtx;

    // 绘图层
    const _paintingCanvas = document.createElement("canvas");
    const _paintingCtx = _drawingCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this._paintingCanvas = _paintingCanvas;
    this._paintingCtx = _paintingCtx;
    _paintingCanvas.width = width;
    _paintingCanvas.height = height;

    css(this._paintingCanvas, {
      position: "absolute",
    });
    css(this._drawingCanvas, {
      position: "absolute",
    });
    container.appendChild(this._paintingCanvas);
    container.appendChild(this._drawingCanvas);
    this.el.appendChild(container);

    this.render();
  }
  loadSource(source: SourceProps, callback?: Function, errHandle?: Function) {
    const handle = (img: HTMLImageElement) => {
      const source = new Source(this, img);
      this._source = source;
      this._manager.addSource(source);
      callback && callback();
      // TODO sourceLoadSeccess
      this.render();
    };
    if (source && isString(source)) {
      loadImage(source).then(
        (img) => {
          handle(img);
        },
        (err) => {
          console.error(err);
          errHandle && errHandle(new Error("资源加载错误"));
        }
      );
    } else if (source instanceof HTMLImageElement) {
      handle(source);
    } else {
      callback && callback(new Error("请传入正确的资源"));
    }
  }

  // 注册图形
  register(options: ShapeRegisterProps) {
    this._register.register(options);
  }
  createShape(options: ShapeProps) {
    this._source?.createShape(options);
  }

  // 强制渲染
  forceRender() {
    // TODO beforeRender
    // 绘制背景
    renderBackground(
      this._paintingCtx,
      [this._drawingCanvas.width, this._drawingCanvas.height],
      this._options.backgroundColor
    );
    // 绘制图片
    if (!this._source) return;
    const source = this._source;
    renderImage(this._paintingCtx, source.el, source.position, source.size());

    const ctx = this._paintingCtx;
    // 绘制 shape
    const layers = source.getLayers();
    Array.from(layers).forEach((layer) => {
      layer
        .getShapes()
        .reverse()
        .forEach((shapeID) => {
          console.log("shapeID", shapeID);
          const shape = this._manager.getShape(shapeID);
          if (!shape) return;
          const options = this._register.getOption(shape.registerID);
          const points = fixRectPoint2RenderPoints(shape.getPoints());
          console.log("points", points, options);
          const style = options.styles.normal;
          // 先画面
          ctx.beginPath();
          points.forEach(([x, y], i) => {
            if (!i) {
              ctx.moveTo(x, y);
              return;
            }
            ctx.lineTo(x, y);
          });
          ctx.fillStyle = style.areaStyle.color;
          ctx.fill();
          ctx.closePath();
          // 再画线
          // 最后画点
        });
    });
    // TODO afterRender
  }
  // 渲染
  render() {
    this.forceRender();
  }
}
