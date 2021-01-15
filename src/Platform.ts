import { EventReceiver, antMouseEvents, antLvs, AntMouseEvent, IAnte } from "./EventReceiver"
import { Image } from "./Image"
import { Shape, ShapeType } from "./Shape"
import { ShapeRegister, IShapeCfg, IShapeContent } from "./ShapeRegister"
import { EventHook } from "./EventHook"
import { isInSide, isInCircle, getRectPoints } from "./utils"
import { Point, Points } from "./structure"
import _ from "./lodash"
import { css, create } from "./element"

type InputShapeOrID = Shape | string;

const dfOptions = {
	width: 800,
  height: 600,
	bgColor: `#000`,
}

export type LabelImgOptions = typeof dfOptions
enum Cursor {
	"draggable" = "grab",
	"default" = "all-scroll",
	"point" = "crosshair",
	"drag" = "grabbing",
	"pointer" = "pointer"
}
type ICursor = keyof typeof Cursor
const displayCursor = (cursor: ICursor) => {
	return Cursor[cursor]
}

let isMouseDown = false
let isOnShape = false
let isOnImage = false
const outSideFn = () => {
	isMouseDown = false;
	isOnShape = false;
}
export class Platform extends EventReceiver {
  private container: HTMLDivElement
  private options: LabelImgOptions
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
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
	private isGuideLine: boolean
	private isTagShow: boolean
  constructor(container: HTMLDivElement, options?: Partial<LabelImgOptions>){
		super()
		this.container = container
		css(this.container, {
			position: "relative",
			overflow: "hidden"
		})
		this.options = Object.assign({}, options, dfOptions)
		this.eventHook = new EventHook()

		const canvas = create("canvas")
		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

		canvas.width = this.options.width
		canvas.height = this.options.height
		this.container.append(canvas)

		// 标签容器
		const tagContainer = create("div")
		this.tagContainer = tagContainer
		this.container.appendChild(this.tagContainer)

		this.canvas = canvas
		this.ctx = ctx
		this.scale = 1
		this.continuity = false
		this.isGuideLine = false
		this.isTagShow = true
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
	}
	public resize = () => {
		if(!this.Image || !this.Image.el) return
		this.scale = this._getInitImgScale(this.Image.el)
		this.Image.setOrigin([0, 0])
		this.render()
	}
	private _getInitImgScale = (img: HTMLImageElement) => {
		const { width, height } = img
		const options = this.options
		let scale = 1
		// 初始化图片缩放
		if(options.width < width || options.height < height){
			if(width > height){
				// 长大于高
				scale = options.width / width
			}else{
				// 高大于长
				scale = options.height / height
			}
		}
		return scale
	}
	private _init = () => {
		// 事件相关
		const _initMouseEvent = () => {
			antMouseEvents.forEach((type) => {
				const Image = this.Image
				this.canvas.addEventListener(type, (e) => {
					e.preventDefault()
					const offset = [e.offsetX, e.offsetY] as Point
					isOnImage = isInSide(offset, Image.getPosition(this.scale))
					const isPropagation = true
	
					const getTargetShape = () => {
						let target = null
						let arcIndex = -1
						const shapeOffset = Image.getRelative(offset, this.scale)

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
					const shapeOffset = this.Image.getRelative(offset, this.scale)
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
		const _initGuideLine = () => {
			this.on("mousemove.top", (e) => {
				this.offset = e.ante.offset
				this.render()
			})
		}
		const _initImageEvent = () => {
			let start = [0, 0] // 点击在图片的起始位置
			const Image = this.Image
			Image.on("mousedown.bot", (e) => {
				if(isOnShape || !Image.complate) return
				const { offset } = e.ante
				const [sx, sy] = offset // start x, start y
				const [x, y] = Image.getOrigin() // image origin
				start = [sx - x, sy - y]
			})
			Image.on("mousemove.bot", (e) => {
				if(!isOnImage || !isMouseDown) return;
				if(isOnShape) return;
				if(this.drawing) return

				const { offset } = e.ante
				const [ox, oy] = offset // offset x, offset y
				const diff = [ox - start[0], oy - start[1]] as Point
				const position = diff
				
				Image.setOrigin(position)
				this.render()
			})
			const cancel = () => {
				outSideFn()
				start = [0, 0]
			}
			Image.on("mouseup.bot", cancel)
			Image.on("mouseout.bot", cancel)
			
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
		const _initDrawEvent = () => {
			let start: Point = [0, 0]
			const Image = this.Image
			this.on( "mousedown.top", (e) => {
				if(!this.drawing || !Image.el) return
				const { offset } = e.ante
				
				// 判断当前点击是否在img上
				if(!isOnImage) return
				// 计算出当前点位在img的什么位置
				let point = Image.getRelative(offset, this.scale)
	
				start = point
				const cache = this.cache
				if(cache){
					if(this.drawing.type === ShapeType.Polygon){
						let isClose = false;
						if(cache.positions.length > 2){
							const first = cache.positions[0]
							const style = cache.getStyle()
							isClose = isInCircle(point, first, style.dotRadius)
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
							this.eventHook.trigger("create", shape)
							if(!this.continuity){
								this.cancel()
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
				this.render()
			})
			this.on("mousemove.top", (e) => {
				const cache = this.cache
				const Image = this.Image
				if(!this.drawing || !Image.complate || !cache) return
				
				const shapeType = this.drawing.type
	
				if(shapeType === ShapeType.Rect){
					const { offset } = e.ante
					const end = Image.getRelative(offset, this.scale)
					const positions: Points = getRectPoints(start, end)
					cache.updatePositions(positions)
					this.render()
				}
			})
	
			this.on("mouseup.top", () => {
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
					this.eventHook.trigger("create", shape)
					this.cache = null
					if(!this.continuity){
						this.cancel()
					}
					this.render()
				}
			})
			this.on("mouseout.top", () => {
			}) 
		}
		// 绑定图形事件
		const _initShapeEvent = () => {
			let start: Point = [0, 0]
			let cp = [] as Points // cache postion
			let arcIndex = -1
	
			const select = (shape: Shape) => {
				this.loseActive()
				shape.setActive(true)
				this.activeShape = shape
				this.eventHook.trigger("select", shape)
				this.render()
			}
	
			this.on("mousedown.top", (e) => {
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
			this.on("mousemove.top", (e) => {
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
				this.render()
			})
			this.on("mouseup.top", (e) => {
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

	// 加载
	public load = (source: string | File) => {
		this.reset()
		return new Promise((c, e) => {
			this.Image.load(source).then((img) => {
        this.scale = this._getInitImgScale(img)
				this.render()
				c(img)
			}, (err) => {
				e(err)
			})
		})
	}
	public register = (rid: string, options: Omit<IShapeCfg, "registerID">) => {
    this.shapeRegister.add(rid, options)
	}
	public createShape = (id: string, options?: IShapeContent) => {
		const opts = this.shapeRegister.get(id)
		return new Shape(Object.assign(opts, options))
	}
	public isRegister = (id: string) => {
		return this.shapeRegister.is(id)
	}
	public label = (id: string, continuity?: boolean) => {
		const drawing = this.shapeRegister.get(id)
		if((this.drawing && drawing && id !== this.drawing.id) || (!this.drawing && drawing)){
			this.drawing = drawing
			this.eventHook.trigger("labelType")
		}
		if(!_.isUndefined(continuity)){
			this.continuity = !!continuity
		}
	}
	public getDrawing = () => {
		return this.drawing
	}
	public addShape = (shape: Shape, idx?: number) => {
		if(typeof idx === "number"){
			this.shapeList.splice(idx, 0, shape)
		}else{
			this.shapeList.push(shape)
		}
		this.render()
	}
	public remove = (input: Shape | string) => {
		const [idx, shape] = this.findShapeIndex(input)
		if(idx === null) return
		const tagNode = (shape as Shape).tagNode()
		if(this.tagContainer.contains(tagNode)){
			this.tagContainer.removeChild(tagNode)
		}
		this.shapeList.splice(idx, 1)
		this.render()
		this.eventHook.trigger("update")
	}
	public setActive = (shape: Shape) => {
		this.loseActive()
		shape.setActive(true)
		this.render()
	}
	public cancel = () => {
		this.drawing = null
		this.continuity = false
		this.eventHook.trigger("labelType")
    if(this.cache){
      this.cache = null
      this.render()
    }
	}
	// 提升图形层级到最顶层
  public orderShape = (input: InputShapeOrID, flag?: boolean) => {
		const [idx, shape] = this.findShapeIndex(input)
		if(idx === null) return
		this.shapeList.splice(idx, 1)
		if(flag){
			this.shapeList.unshift(shape as Shape)
		}else{
			this.shapeList.push(shape as Shape)
		}
	}
	private findShapeIndex = (input: InputShapeOrID): [null | number, null | Shape] => {
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
	public getShapeList = () => {
		return this.shapeList
	}
	public getShapeByName = (name: string) => {
		return this.shapeList.filter((shape) => shape.name === name)
	}
	// 取消所有图形高亮状态
  private loseActive = () => {
    this.shapeList.forEach((shape) => {
      shape.setActive(false)
    })
	}
	public guideLine = (status?: boolean) => {
		this.isGuideLine = _.isUndefined(status) ? !this.isGuideLine : !!status
		this.render()
	}
	public tagShow = (status?: boolean) => {
		this.isTagShow = _.isUndefined(status) ? !this.isTagShow : !!status
		this.render()
	}
	public setContinuity = (status: boolean) => {
		this.continuity = !!status
	}
	public cursor = _.throttle((cursor: ICursor) => {
		this.canvas.style.cursor = displayCursor(cursor)
	}, 100)
	// 渲染相关
	private _clearCanvas = () => {
		const ctx = this.ctx
		const { width, height } = this.options
		ctx.clearRect(0, 0, width, height)
	}
	private _renderBackground = () => {
		const ctx = this.ctx
		const { bgColor, width, height } = this.options
		ctx.fillStyle = bgColor
		ctx.fillRect(0, 0, width, height)
	}
	private _renderImage = () => {
		const ctx = this.ctx
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
		const ctx = this.ctx
		const [x, y] = this.offset
		ctx.beginPath()
		ctx.strokeStyle = "red"
		ctx.moveTo(0, y)
		ctx.lineTo(this.options.width, y)

		ctx.moveTo(x, 0)
		ctx.lineTo(x, this.options.height)
		ctx.setLineDash([5])
		ctx.stroke()
		ctx.closePath()
		ctx.setLineDash([0])
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
    const ctx = this.ctx
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
    
    const rp = Image.getRelativePositions(positions, scale)

		let before: null | Point = null;
		// 线
    ctx.beginPath()
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth * scale
    rp.forEach((point, index) => {
      const [cx, cy] = point
      if(before){
        ctx.moveTo(before[0], before[1])
        ctx.lineTo(cx, cy)
        if(rp.length - 1 === index && (shape.isClose() || shape.type === ShapeType.Rect)){
          const [[x, y],] = rp
          ctx.lineTo(x, y)
        }
      }
      before = [cx, cy]
    })
    ctx.stroke()
    ctx.closePath()
		// 点
    ctx.beginPath()
    rp.forEach((point, idx) => {
      const [cx, cy] = point
      if(idx === 0){
        ctx.moveTo(point[0], point[1])
      }else{
        ctx.lineTo(cx, cy)
      }
    })
    ctx.globalAlpha = .7
    ctx.fillStyle = fillColor
    ctx.fill()
    ctx.closePath()
    ctx.globalAlpha = 1

		// 颜色填充
    rp.forEach((point) => {
      const [cx, cy] = point
      ctx.beginPath()
      ctx.fillStyle = dotColor
      ctx.arc(cx, cy, dotRadius * this.scale, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
    })
		// 标签
    if(this.isTagShow && shape.isShowTag()){
      const [x, y] = rp[0]
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
		if(this.isGuideLine){
			this._renderGuideLine()
		}
	}
	public render = _.throttle(() => {
		this.forceRender()
	}, 17)
}