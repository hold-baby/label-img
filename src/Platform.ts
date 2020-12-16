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

export type AntOptions = typeof dfOptions

export class Platform extends EventReceiver {
  private container: HTMLDivElement
  private options: AntOptions
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

	private eventHook: EventHook

	private continuity: boolean
	private isGuideLine: boolean
	private isTagShow: boolean
  constructor(container: HTMLDivElement, options?: AntOptions){
		super()
		this.container = container
		css(this.container, {
			position: "relative",
			overflow: "hidden"
		})
		this.options = options || dfOptions
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

		this.init()
	}
	reset(){
		this.scale = 1
		this.offset = [0, 0]
		this.cache = null
		this.activeShape = null
		this.drawing = null
		this.shapeList = []
	}
	init(){
		this.initMouseEvent()
		this.initGuideLine()
		this.initDrawEvent()
		this.initShapeEvent()
		this.initImageEvent()
	}
	// 事件相关
	initMouseEvent(){
		antMouseEvents.forEach((type) => {
			const Image = this.Image
			this.canvas.addEventListener(type, (e) => {
				e.preventDefault()
				const offset = [e.offsetX, e.offsetY] as Point
				const isOnImage = isInSide(offset, Image.getPosition(this.scale))
				const isPropagation = true

				const getTargetShape = () => {
					let target = null
					let arcIndex = -1
					let shapeLen = this.shapeList.length
					while(shapeLen > 0){
						const shape = this.shapeList[shapeLen - 1]
						const shapeOffset = Image.getRelative(offset, this.scale)

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
					return [target, arcIndex]
				}
				const [currentTarget] = getTargetShape()
				
				const ante = {
					offset,
					isOnImage,
					isPropagation,
					stopPropagation: () => {
						ante.isPropagation = false
					},
					getTargetShape,
					currentTarget
				} as IAnte

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
	}
	initGuideLine(){
		this.on("mousemove.top", (e) => {
			this.offset = e.ante.offset
			this.render()
		})
	}
	initImageEvent(){
		let start = [0, 0] // 点击在图片的起始位置
		let isMouseDown = false
		const Image = this.Image

		let isOnShape = false
		Image.on("mousedown.bot", (e) => {
			isOnShape = !!e.ante.currentTarget
			
			if(this.drawing && this.drawing.type === "Rect" && !isMouseDown){
				isOnShape = true
			}
			if(isOnShape || !Image.complate) return
			isMouseDown = true
			const { offset } = e.ante
      const [sx, sy] = offset // start x, start y
      const [x, y] = Image.getOrigin() // image origin
			start = [sx - x, sy - y]
		})
		Image.on("mousemove.bot", (e) => {
			if(isOnShape) return
      if(!isMouseDown) return
			const { offset } = e.ante
			const [ox, oy] = offset // offset x, offset y
      const diff = [ox - start[0], oy - start[1]] as Point
      const position = diff
			Image.setOrigin(position)
      this.render()
		})
		Image.on("mouseup.bot", () => {
			isMouseDown = false
			isOnShape = false
			start = [0, 0]
		})
		Image.on("mouseout.bot", () => {
			isMouseDown = false
			isOnShape = false
			start = [0, 0]
		})
		
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
	initDrawEvent(){
		let start: Point = [0, 0]
		const Image = this.Image
		this.on( "mousedown.top", (e) => {
			if(!this.drawing || !Image.el) return
			const { offset, isOnImage } = e.ante

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
						const shape = this.createShape(this.drawing.name, {
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
				const shape = this.createShape(this.drawing.name, {
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
			// if(this.isMoving || !this.isOnShape) return
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
				const shape = this.createShape(this.drawing.name, {
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
  initShapeEvent(){
    let start: Point = [0, 0]
    let cp = [] as Points // cache postion
		let arcIndex = -1
		let isOnShape = false

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
			isOnShape = !!shape

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
      if(!isOnShape || !this.activeShape || this.drawing) return
      const { offsetX, offsetY } = e
      const diff: Point = [offsetX - start[0], offsetY - start[1]]
      let rp: Points = []

      if(arcIndex === -1){
				// shape move
        rp = cp.map(([cx, cy]) => {
          return [cx + diff[0] / this.scale, cy + diff[1] / this.scale]
        })
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
			isOnShape = false
		})
  }
	// 加载
	load(source: string | File){
		this.reset()
		return new Promise((c, e) => {
			this.Image.load(source).then((img) => {
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
        this.scale = scale
				this.render()
				c(img)
			}, (err) => {
				e(err)
			})
		})
	}
	register(name: string, options: IShapeCfg){
    this.shapeRegister.add(name, options)
	}
	createShape(name: string, options?: IShapeContent){
		const opts = this.shapeRegister.get(name)
		return new Shape(Object.assign(opts, options))
	}
	isRegister(name: string){
		return this.shapeRegister.is(name)
	}
	label(name: string, continuity?: boolean){
		this.drawing = this.shapeRegister.get(name)
		if(!_.isUndefined(continuity)){
			this.continuity = !!continuity
		}
	}
	addShape(shape: Shape, idx?: number){
		if(typeof idx === "number"){
			this.shapeList.splice(idx, 0, shape)
		}else{
			this.shapeList.push(shape)
		}
		this.render()
	}
	remove(input: Shape | string){
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
	setActive(shape: Shape){
		this.loseActive()
		shape.setActive(true)
		this.render()
	}
	
	public cancel(){
		this.drawing = null
		this.continuity = false
    if(this.cache){
      this.cache = null
      this.render()
    }
	}
	// 提升图形层级到最顶层
  public orderShape(input: InputShapeOrID, flag?: boolean){
		const [idx, shape] = this.findShapeIndex(input)
		if(idx === null) return
		this.shapeList.splice(idx, 1)
		if(flag){
			this.shapeList.unshift(shape as Shape)
		}else{
			this.shapeList.push(shape as Shape)
		}
	}
	private findShapeIndex(input: InputShapeOrID): [null | number, null | Shape]{
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
	getShapeList(){
		return this.shapeList
	}
	getShapeByName(name: string){
		return this.shapeList.filter((shape) => shape.name === name)
	}
	// 取消所有图形高亮状态
  private loseActive(){
    this.shapeList.forEach((shape) => {
      shape.setActive(false)
    })
	}
	guideLine(status?: boolean){
		this.isGuideLine = _.isUndefined(status) ? !this.isGuideLine : !!status
		this.render()
	}
	tagShow(status?: boolean){
		this.isTagShow = _.isUndefined(status) ? !this.isTagShow : !!status
		this.render()
	}
	setContinuity(status: boolean){
		this.continuity = !!status
	}

	// 渲染相关
	clearCanvas(){
		const ctx = this.ctx
		const { width, height } = this.options
		ctx.clearRect(0, 0, width, height)
	}
	renderBackground(){
		const ctx = this.ctx
		const { bgColor, width, height } = this.options
		ctx.fillStyle = bgColor
		ctx.fillRect(0, 0, width, height)
	}
	renderImage(){
		const ctx = this.ctx
		const Image = this.Image
		
		if(!Image || !Image.complate) return

		const el = Image.getEl() as HTMLImageElement
    const [width, height] = Image.getSize()
    const x = width * this.scale;
    const y = height * this.scale;
    const [ox, oy] = Image.getOrigin()
		ctx.drawImage(el, ox, oy, x, y)
		
    // ctx.beginPath()
    // ctx.fillStyle = "red"
    // ctx.fillText(`${x}, ${y}`, 10, 550)
    // ctx.closePath()
  }
	renderGuideLine(){
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
	private renderShape(shape: Shape){
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
	private renderCache(){
		if(!this.cache) return
    this.renderShape(this.cache)
	}
	private renderShapeList(){
    const shapeList = this.shapeList
		if(!shapeList.length) return
		let active: null | Shape = null
    shapeList.forEach((shape) => {
			if(shape.isActive()){
				active = shape
				return
			}
			this.renderShape(shape)
		})
		if(active){
			this.renderShape(active)
		}
	}
	forceRender(){
		this.clearCanvas()
		this.renderBackground()
		this.renderImage()
		this.renderShapeList()
		this.renderCache()
		if(this.isGuideLine){
			this.renderGuideLine()
		}
	}
	public render = _.throttle(() => {
		this.forceRender()
	}, 17)
}