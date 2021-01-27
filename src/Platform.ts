import { EventReceiver, antMouseEvents, antLvs, AntMouseEvent, IAnte } from "./EventReceiver"
import { Image, ImageLoadSource } from "./Image"
import { Shape, ShapeType, QueryShapeInput } from "./Shape"
import { ShapeRegister, IShapeCfg, IShapeContent, RegisterID } from "./ShapeRegister"
import { EventHook } from "./EventHook"
import { Canvas } from "./Canvas"
import { isInSide, isInCircle, getRectPoints, getAdaptImgScale } from "./utils"
import { Point, Points } from "./structure"
import { ICursor, displayCursor } from "./cursor"
import _ from "./lodash"
import { css, create } from "./element"

// 默认配置
const defaulOptions = {
	width: 800,
  height: 600,
	bgColor: `#000`,
	tagShow: true,
	guideLine: false
}
export type LabelImgOptions = typeof defaulOptions
let options: LabelImgOptions = Object.assign({}, defaulOptions)

let isInit = false

let isMouseDown = false
let isOnShape = false
let isOnImage = false
const outSideFn = () => {
	isMouseDown = false;
	isOnShape = false;
}
export class Platform extends EventReceiver {
  private container: HTMLDivElement
  private canvas: Canvas
	private Image: Image
	private tagContainer: HTMLDivElement
  private scale: number
  private offset: Point

  private shapeRegister: ShapeRegister
	private drawing: IShapeCfg | null
	private cache: Shape | null
	private activeShape: Shape | null
	private shapeList: Shape[]

	public eventHook: EventHook

	private continuity: boolean

  constructor(container: HTMLDivElement, LabelImgOptions?: Partial<LabelImgOptions>){
		super()
		this.container = container
		css(this.container, {
			position: "relative",
			overflow: "hidden"
		})
		options = Object.assign({}, LabelImgOptions, defaulOptions)
		this.eventHook = new EventHook()

		this.canvas = new Canvas()
		
		this.canvas.size(options.width, options.height)
		
		this.container.append(this.canvas.el())

		// 标签容器
		const tagContainer = create("div")
		this.tagContainer = tagContainer
		this.container.appendChild(this.tagContainer)

		this.scale = 1
		this.continuity = false
		this.offset = [0, 0]

		this.cache = null
		this.activeShape = null

		this.Image = new Image()
		this.shapeRegister = new ShapeRegister()
		this.drawing = null

		this.shapeList = []

		this.render()
		this._init()
	}
	public reset = () => {
		this.scale = 1
		this.offset = [0, 0]
		this.cache = null
		this.activeShape = null
		this.drawing = null
		this.shapeList = []
		this.tagContainer.innerHTML = ""
	}
	/**
	 * 重置图片大小与坐标点
	 */
	public resize = () => {
		if(!this.Image || !this.Image.el) return
		this.scale = getAdaptImgScale(this.Image.el, options)
		this.Image.setOrigin([0, 0])
		this.render()
	}
	/**
	 * 初始化
	 */
	private _init = () => {
		if(isInit) return
		isInit = true
		// 初始化事件相关
		const _initMouseEvent = () => {
			const canvas = this.canvas.el()
			antMouseEvents.forEach((type) => {
				const Image = this.Image
				canvas.addEventListener(type, (e) => {
					e.preventDefault()
					const offset = [e.offsetX, e.offsetY] as Point
					isOnImage = isInSide(offset, Image.getPosition(this.scale))
					const isPropagation = true
	
					const getTargetShape = () => {
						let target = null
						let arcIndex = -1
						const shapeOffset = Image.toImagePoint(offset, this.scale)

						if(this.activeShape){
							const shape = this.activeShape
							arcIndex = shape.isOnArc(shapeOffset)
							if(arcIndex !== -1){
								target = shape
							}
							const isInShape = shape.isOnShape(shapeOffset)
							if(isInShape){
								target = shape
							}
						}
						if(!target){
							let shapeLen = this.shapeList.length
							while(shapeLen > 0){
								const shape = this.shapeList[shapeLen - 1]
		
								arcIndex = shape.isOnArc(shapeOffset)
								if(arcIndex !== -1){
									target = shape
									break
								}
								const isInShape = shape.isOnShape(shapeOffset)
								if(isInShape){
									target = shape
									break
								}
								shapeLen--
							}
						}
						if(target && target.isHidden()){
							target = null
							arcIndex = -1
						}
						return [target, arcIndex]
					}
					const [currentTarget] = getTargetShape()
					isOnShape = isMouseDown ? isOnShape : !!currentTarget
					
					const ante = {
						offset,
						// isOnImage,
						// isOnShape,
						isPropagation,
						stopPropagation: () => {
							ante.isPropagation = false
						},
						getTargetShape,
						currentTarget
					} as IAnte

					switch(type){
						case "mousedown":
							isMouseDown = true
							break
						case "mouseup":
							outSideFn()
							break
						case "mouseout":
							outSideFn()
							break
						case "mouseleave":
							outSideFn()
							break
					}
	
					const ev = e as AntMouseEvent
					ev.ante = ante
					antLvs.forEach((lv) => {
						this.shapeList.forEach((shape) => {
							const sEvList = shape.getEventsByType(type, lv)
							let sLen = sEvList.length
							while(sLen){
								if(!ev.ante.isPropagation){
									sLen = 0;
									break
								}
								const event = sEvList[sLen - 1]
								const { callback, ...other } = event
								if(currentTarget === shape){
									callback(ev, other)
								}
								sLen--
							}
						})

						ev.ante.isPropagation = true
						const iEvList = Image.getEventsByType(type, lv)
						let iLen = iEvList.length
						while(iLen){
							if(!ev.ante.isPropagation){
								iLen = 0;
								break
							}
							const event = iEvList[iLen - 1]
							const { callback, ...other } = event
							callback(ev, other)
							iLen--
						}
	
						ev.ante.isPropagation = true
						const pEvList = this.getEventsByType(type, lv)
						let pLen = pEvList.length
						while(pLen){
							if(!ev.ante.isPropagation){
								pLen = 0;
								break
							}
							const event = pEvList[pLen - 1]
							const { callback, ...other } = event
							callback(ev, other)
							pLen--
						}
					})
				})
			})
			this.on("mousemove", ({ ante }) => {
				if(!this.Image || isMouseDown) return
				const { currentTarget: shape, offset } = ante
				if(shape){
					const shapeOffset = this.Image.toImagePoint(offset, this.scale)
					const arcIndex = shape.isOnArc(shapeOffset)
					if(arcIndex !== -1){
						this.cursor("point")
					}else{
						const isInShape = shape.isOnShape(shapeOffset)
						if(isInShape){
							this.cursor("pointer")
						}
					}
				}else if(this.drawing){
					this.cursor("point")
				}else{
					this.cursor("default")
				}
			})
		}
		// 初始化辅助线
		const _initGuideLine = () => {
			const lv = "top"
			this.on("mousemove", lv, (e) => {
				if(!options.guideLine) return
				this.offset = e.ante.offset
				this.render()
			})
		}
		// 初始化图片事件
		const _initImageEvent = () => {
			const lv = "bot"
			let start = [0, 0] // 点击在图片的起始位置
			const Image = this.Image
			Image.on("mousedown", lv, (e) => {
				if(isOnShape || !Image.complate) return
				const { offset } = e.ante
				const [sx, sy] = offset // start x, start y
				const [x, y] = Image.getOrigin() // image origin
				start = [sx - x, sy - y]
			})
			Image.on("mousemove", lv, (e) => {
				if(!isOnImage || !isMouseDown) return;
				if(isOnShape) return;
				if(this.drawing) return

				const { offset } = e.ante
				const [ox, oy] = offset // offset x, offset y
				const diff = [ox - start[0], oy - start[1]] as Point
				const position = diff
				
				Image.setOrigin(position)
				if(isMouseDown){
					this.render()
				}
			})
			const cancel = () => {
				outSideFn()
				start = [0, 0]
			}
			Image.on("mouseup", lv, cancel)
			Image.on("mouseout", lv, cancel)
			
			Image.on("wheel", (e) => {
				const Image = this.Image
				if(!Image.el) return
				const { offset } = e.ante
				const [px, py] = offset
				
				const step = 0.05;
				const direction = e.deltaY < 0 ? 1 : -1;
	
				const after = direction * step;
				let scale = Number((after + this.scale).toFixed(2));
	
				if(scale < 0.01){
					scale = 0.01;
				}
				// 计算画布缩放(以鼠标位置为中心点)
				const [width, height] = Image.getSize()
				const [ox, oy] = Image.getOrigin()
	
				const sw = width * this.scale
				const sw2 = width * scale
				const dx = Math.abs(px - ox)
				const fx = px - ox > 0 ? -1 : 1
				const sx = ((dx * sw2) / sw) - dx
				const x = fx * sx + ox
	
				const sh = height * this.scale
				const sh2 = height * scale
				const dy = Math.abs(py - oy)
				const fy = py - oy > 0 ? -1 : 1
				const sy = ((dy * sh2) / sh) - dy
				const y = fy * sy + oy
	
				Image.setOrigin([x, y])
				this.scale = scale;
				this.render()
			})
		}
		// 初始化标注事件
		const _initDrawEvent = () => {
			const lv = "top"
			let start: Point = [0, 0]
			const Image = this.Image
			this.on("mousedown", lv, (e) => {
				if(!this.drawing || !Image.el) return
				const { offset } = e.ante
				
				// 判断当前点击是否在img上
				if(!isOnImage) return
				// 计算出当前点位在img的什么位置
				let point = Image.toImagePoint(offset, this.scale)
	
				start = point
				const cache = this.cache
				if(cache){
					if(this.drawing.type === ShapeType.Polygon){
						let isClose = false;
						if(cache.positions.length > 2){
							const first = cache.positions[0]
							const style = cache.getStyle()
							isClose = isInCircle(point, style.dotRadius, first,)
						}
						if(cache.max && cache.positions.length + 1 >= cache.max){
							cache.positions.push(point)
							isClose = true
						}
						if(isClose){
							const shape = this.createShape(this.drawing.registerID, {
								positions: cache.positions,
								closed: false,
							})
							shape.updatePositions(cache.positions).close()
							this.shapeList.push(shape)
							this.cache = null;
							this.eventHook.emit("create", shape)
							if(!this.continuity){
								this.labelOff()
							}
						}else{
							cache.positions.push(point)
						}
					}
				}else{
					let positions: Point | Points = []
					if(this.drawing.type === ShapeType.Polygon){
						positions = [point]
					}else if(this.drawing.type === ShapeType.Rect){
						positions = [point, point, point, point]
					}
					const shape = this.createShape(this.drawing.registerID, {
						positions,
						closed: false,
						id: "cache"
					})
					this.cache = shape
				}
				console.log(this.cache);
				
				this.render()
			})
			this.on("mousemove", lv, (e) => {
				const cache = this.cache
				const Image = this.Image
				if(!this.drawing || !Image.complate || !cache) return
				
				const shapeType = this.drawing.type
	
				if(shapeType === ShapeType.Rect){
					const { offset } = e.ante
					const end = Image.toImagePoint(offset, this.scale)
					const positions: Points = getRectPoints(start, end)
					cache.updatePositions(positions)
					this.render()
				}
			})
			this.on("mouseup", lv, () => {
				const cache = this.cache
				const shapeType = this.drawing?.type
				start = [0, 0]
				if(shapeType === ShapeType.Rect && cache && this.drawing){
					const positions = cache.getPositions()
					const shape = this.createShape(this.drawing.registerID, {
						positions
					})
					shape.close()
					this.shapeList.push(shape)
					this.eventHook.emit("create", shape)
					this.cache = null
					if(!this.continuity){
						this.labelOff()
					}
					this.render()
				}
			})
			this.on("mouseout", lv, () => {
			}) 
		}
		// 初始化图形事件
		const _initShapeEvent = () => {
			const lv = "top"
			let start: Point = [0, 0]
			let cp = [] as Points // cache postion
			let arcIndex = -1
	
			const select = (shape: Shape) => {
				this.loseActive()
				shape.setActive(true)
				this.activeShape = shape
				this.eventHook.emit("select", shape)
				this.render()
			}
	
			this.on("mousedown", lv, (e) => {
				const { getTargetShape, offset } = e.ante
				start = offset
				const [shape, index] = getTargetShape()
				if(this.drawing) return
				if(!shape) return
				if(shape.isDisabled()){
					this.activeShape = null
					return
				} 
				e.ante.stopPropagation()
	
				// 获取shape相对于画布的坐标
				arcIndex = index
				cp = shape.getPositions()
				// this.orderShape(shape)
	
				if(this.activeShape !== shape){
					select(shape)
				}
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
			})
			this.on("mousemove", lv, (e) => {
				if(!isOnShape || !this.activeShape || this.drawing || !isMouseDown) return
				const { offsetX, offsetY } = e
				const diff: Point = [offsetX - start[0], offsetY - start[1]]
				let rp: Points = []
	
				if(arcIndex === -1){
					// shape move
					rp = cp.map(([cx, cy]) => {
						return [cx + diff[0] / this.scale, cy + diff[1] / this.scale]
					})
					this.cursor("drag")
				}else{
					// shape point move
					rp = cp.slice()
					const p = rp[arcIndex]
					
					if(this.activeShape.type === "Rect"){
						switch(arcIndex){
							case 1:
								rp[0] = [rp[0][0], rp[0][1] + diff[1] / this.scale]
								rp[2] = [rp[2][0] + diff[0] / this.scale, rp[2][1]]
								break
							case 3:
								rp[0] = [rp[0][0] + diff[0] / this.scale, rp[0][1]]
								rp[2] = [rp[2][0], rp[2][1] + diff[1] / this.scale]
								break
							default:
								rp[arcIndex] = [p[0] + diff[0] / this.scale, p[1] + diff[1] / this.scale]
						}
						rp = getRectPoints(rp[0], rp[2])
					}else{
						rp[arcIndex] = [p[0] + diff[0] / this.scale, p[1] + diff[1] / this.scale]
					}
				}
				this.activeShape.updatePositions(rp)
				if(isMouseDown){
					this.render()
				}
			})
			this.on("mouseup", lv, (e) => {
				start = [0, 0]
				arcIndex = -1
			})
		}
		_initMouseEvent()
		_initGuideLine()
		_initDrawEvent()
		_initShapeEvent()
		_initImageEvent()
	}
	/**
	 * 加载图片
	 * @param source ImageLoadSource 图片对象或图片路径
	 */
	public load = (source: ImageLoadSource) => {
		this.reset()
		return new Promise((c, e) => {
			this.Image.load(source).then((img) => {
        this.scale = getAdaptImgScale(img, options)
				this.render()
				c(img)
			}, (err) => {
				e(err)
			})
		})
	}
	/**
	 * 注册图形
	 * @param rid RegisterID 图形注册ID
	 * @param options IShapeCfg 图形配置
	 */
	public register = (rid: RegisterID, options: Omit<IShapeCfg, "registerID">) => {
    this.shapeRegister.add(rid, options)
	}
	/**
	 * 以注册的图形模版创建图形
	 * @param rid RegisterID 图形注册ID
	 * @param options IShapeCfg 图形配置
	 * @returns Shape
	 */
	public createShape = (rid: RegisterID, options?: IShapeContent) => {
		const opts = this.shapeRegister.get(rid)
		return new Shape(Object.assign(opts, options))
	}/**
	 * 判断图形是否注册
	 * @param rid RegisterID 图形注册ID
	 * @returns boolean
	 */
	public isRegister = (rid: RegisterID) => {
		return this.shapeRegister.is(rid)
	}
	/**
	 * 设置标注图形
	 * @param rid RegisterID 图形注册ID
	 * @param continuity boolean 是否连续标注
	 */
	public label = (rid: RegisterID, continuity?: boolean) => {
		const drawing = this.shapeRegister.get(rid)
		if((this.drawing && drawing && rid !== this.drawing.id) || (!this.drawing && drawing)){
			this.drawing = drawing
			this.eventHook.emit("labelType")
		}
		if(!_.isUndefined(continuity)){
			this.continuity = !!continuity
		}
	}
	/**
	 * 获取当前标注的图形配置
	 * @returns IShapeOptions
	 */
	public getDrawing = () => {
		return this.drawing
	}
	/**
	 * 添加图形
	 * @param shape Shape 待添加的图形
	 * @param idx number 待插入的位置
	 */
	public addShape = (shape: Shape, idx?: number) => {
		if(typeof idx === "number"){
			this.shapeList.splice(idx, 0, shape)
		}else{
			this.shapeList.push(shape)
		}
		this.render()
	}
  /**
	 * 删除图形
	 * @param input QueryShapeInput 待删除的图形或ID
	 */
	public remove = (input: QueryShapeInput) => {
		const [idx, shape] = this.findShapeIndex(input)
		if(idx === null) return
		const tagNode = (shape as Shape).tagNode()
		if(this.tagContainer.contains(tagNode)){
			this.tagContainer.removeChild(tagNode)
		}
		this.shapeList.splice(idx, 1)
		this.render()
		this.eventHook.emit("update")
	}
	/**
	 * 设置选中的图形
	 * @param shape Shape 选中的图形
	 */
	public setActive = (shape: Shape) => {
		this.loseActive()
		shape.setActive(true)
		this.render()
	}
	/**
	 * 取消标注状态
	 */
	public labelOff = () => {
		this.drawing = null
		this.continuity = false
		this.eventHook.emit("labelType")
    if(this.cache){
      this.cache = null
      this.render()
    }
	}
	/**
	 * 改变图形排序
	 * @param input QueryShapeInput 图形对象或ID
	 * @param flag boolean true: 添加到列表最前 false: 添加到列表最后
	 */
  public orderShape = (input: QueryShapeInput, flag?: boolean) => {
		const [idx, shape] = this.findShapeIndex(input)
		if(idx === null) return
		this.shapeList.splice(idx, 1)
		if(flag){
			this.shapeList.unshift(shape as Shape)
		}else{
			this.shapeList.push(shape as Shape)
		}
	}
	/**
	 * 查询index与Shape对象
	 * @param input QueryShapeInput 图形对象或ID
	 * @returns [number | null, Shape | null]
	 */
	private findShapeIndex = (input: QueryShapeInput): [null | number, null | Shape] => {
		let idx: null | number = null
		if(input instanceof Shape){
			const shape = input
			idx = this.shapeList.findIndex((item) => item === shape)
		}else if(typeof input === "string"){
			const id = input
			idx = this.shapeList.findIndex((item) => item.id === id)
		}
		const shape = idx === null ? null : this.shapeList[idx]
		return [idx, shape]
	}
	/**
	 * 获取图形列表
	 * @returns Shape[] 图形列表
	 */
	public getShapeList = () => {
		return this.shapeList
	}
	public getShapeByName = (name: string) => {
		return this.shapeList.filter((shape) => shape.name === name)
	}
	/**
	 * 取消所有图形高亮状态
	 */
  private loseActive = () => {
    this.shapeList.forEach((shape) => {
      shape.setActive(false)
    })
	}
	/**
	 * 设置辅助线显示
	 * @param status boolean
	 */
	public setGuideLine = (status?: boolean) => {
		options.guideLine = _.isUndefined(status) ? !options.guideLine : !!status
		this.render()
	}
	/**
	 * 获取是否允许标签显示
	 * @return boolean
	 */
	public isTagShow = () => {
		return options.tagShow
	}
	/**
	 * 设置标签显示
	 * @param status boolean 标签是否显示
	 */
	public setTagShow = (status?: boolean) => {
		options.tagShow = _.isUndefined(status) ? !this.isTagShow : !!status
		this.render()
	}
	/**
	 * 设置是否连续标注
	 * @param status boolean
	 */
	public setContinuity = (status: boolean) => {
		this.continuity = !!status
	}
	/**
	 * 设置手势
	 * @param cursor ICursor 
	 */
	public cursor = _.throttle((cursor: ICursor) => {
		this.canvas.cursor(displayCursor(cursor))
	}, 100)
	// 渲染相关
	private _clearCanvas = () => {
		this.canvas.clear()
	}
	private _renderBackground = () => {
		const { bgColor, width, height } = options
		this.canvas.fillReact([0, 0], [width, height], {
			fillColor: bgColor
		})
	}
	private _renderImage = () => {
		const ctx = this.canvas.ctx()
		const Image = this.Image
		if(!Image || !Image.complate) return
		const el = Image.getEl() as HTMLImageElement
    const [width, height] = Image.getSize()
    const x = width * this.scale;
    const y = height * this.scale;
    const [ox, oy] = Image.getOrigin()
		ctx.drawImage(el, ox, oy, x, y)
  }
	private _renderGuideLine = () => {
		const [x, y] = this.offset

		const lineColor = "red"
		const lineWidth = 1
		const lineDash = [5]
		const row: Points = [
			[0, y],
			[options.width, y]
		]
		this.canvas.line(row, {
			lineColor,
			lineWidth,
			lineDash
		})
		const col: Points = [
			[x, 0],
			[x, options.height]
		]
		this.canvas.line(col, {
			lineColor,
			lineWidth,
			lineDash
		})
	}
	private _renderShape = (shape: Shape) => {
		const Image = this.Image
    if(shape.isHidden()){
			const tagNode = shape.tagNode()
			if(this.tagContainer.contains(tagNode)){
				this.tagContainer.removeChild(tagNode)
			}
      return
    }
    const scale = this.scale
    const { positions } = shape
    const style = shape.getStyle()
		
    const { 
      dotColor,
      dotRadius,
      lineColor,
      lineWidth,
      fillColor
    } = style
    
    const points = Image.getShape2CanvasPoints(positions, scale)

		// 判断是否闭合
		if((shape.isClose() || shape.type === ShapeType.Rect)){
			points.push(points[0])
		}
		
		// 图形
		this.canvas.polygon(points, {
			lineColor: lineColor,
			lineWidth: lineWidth * scale,
			dotRadius: dotRadius * this.scale,
			dotColor: dotColor,
			fillColor: fillColor,
			opacity: .7
		})

		// 标签
    if(this.isTagShow() && shape.isShowTag()){
      const [x, y] = points[0]
			const scale = this.scale
			const tagNode = shape.tagNode()
			css(tagNode, {
				left: `${x}px`,
				top: `${y}px`,
				transform: `scale(${scale})`
			})
			if(!this.tagContainer.contains(tagNode)){
				this.tagContainer.appendChild(tagNode)
			}
    }else{
			const tagNode = shape.tagNode()
			if(this.tagContainer.contains(tagNode)){
				this.tagContainer.removeChild(tagNode)
			}
		}
  }
	private _renderCache = () => {
		if(!this.cache) return
    this._renderShape(this.cache)
	}
	private _renderShapeList = () => {
		const Image = this.Image
		if(!Image || !Image.complate) return
    const shapeList = this.shapeList
		if(!shapeList.length) return
		let active: null | Shape = null
    shapeList.forEach((shape) => {
			if(shape.isActive()){
				active = shape
				return
			}
			this._renderShape(shape)
		})
		if(active){
			this._renderShape(active)
		}
	}
	public forceRender = () => {
		this._clearCanvas()
		this._renderBackground()
		this._renderImage()
		this._renderShapeList()
		this._renderCache()
		if(options.guideLine){
			this._renderGuideLine()
		}
	}
	public render = _.throttle(() => {
		this.forceRender()
	}, 17)
}