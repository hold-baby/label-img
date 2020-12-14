import { EventReceiver } from "./EventReceiver"
import { Point, Points } from "./structure"

const dfOrigin: Point = [0, 0]

export class Image extends EventReceiver {
  private origin: Point
  public complate: boolean
  public el: HTMLImageElement | null
  constructor(origin?: Point){
    super()
    this.origin = origin || dfOrigin
    this.complate = false
    this.el = null
  }
  load(source: string | File){
    this.origin = dfOrigin
    return new Promise<HTMLImageElement>((resolve, reject) => {
      this.complate = false;
			const img = document.createElement("img")
			new Promise((resolve, reject) => {
				let src = source
				if(source instanceof File){
					const reader = new FileReader()
					reader.readAsDataURL(source)
					reader.onload = (e) => {
						src = e.target?.result as string
						resolve(src)
					}
					reader.onerror = () => {
						reject()
						throw "图片加载错误"
					}
				}else if(typeof source === "string"){
					resolve(src)
				}
			}).then((src) => {
				img.src = src as string
				img.onload = () => {
					this.complate = true
					this.el = img
					resolve(img)
				}
				img.onerror = () => {
					reject()
					throw "图片加载错误"
				}
			})
    })
	}
	getEl(){
		return this.el
	}
	getSize(){
		if(this.el){
			const { width, height } = this.el
			return [width, height]
		}
		return dfOrigin
	}
	getOrigin(){
		return this.origin
	}
	getPosition(scale = 1){
		const [w, h] = this.getSize()
		const sw = w * scale
		const sh = h * scale
		const [x, y] = this.origin
		const postion: Point[] = [
			this.origin,
			[x + sw, y],
			[x + sw, y + sh],
			[x, y + sh]
		]
		return postion
	}
	getRelative(offset: Point, scale: number){
		const [px, py] = offset
		const [ox, oy] = this.origin
		const point: Point = [
			(px - ox) / scale,
			(py - oy) / scale
		]
		return point
	}
  // shape相对于图片的坐标转换成相对于画布的坐标
	getRelativePositions(positions: Points, scale: number){
    const orgin = this.getOrigin()
    const [ox, oy] = orgin
    const rp: Points = positions.map(([sx, sy]) => {
      const cx = ox + sx * scale
      const cy = oy + sy * scale
      return [cx, cy]
    })
    return rp
	}
	setOrigin(origin: Point){
		this.origin = origin
	}
}