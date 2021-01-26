import { create } from "./element"
import { Point, Points } from "./structure"
import { ICursor, displayCursor } from "./cursor"

type StrokeStyle = string | CanvasPattern | CanvasGradient;
type FillStyle = string | CanvasGradient | CanvasPattern;

interface IBasePoint {
  fillStyle: FillStyle;
  radius: number;
}
interface ILineStyle {
  strokeStyle: StrokeStyle
  lineWidth: number;
}
export class Canvas {
  public el: () => HTMLCanvasElement;
  public ctx: () => CanvasRenderingContext2D;
  constructor(){
    const el = create("canvas")
    const ctx = el.getContext("2d") as CanvasRenderingContext2D
    
    this.el = () => el
    this.ctx = () => ctx
  }
  public line = (points: Points, lineStyle: ILineStyle) => {
    if(points.length > 1){
      const ctx = this.ctx()
      let before: null | Point = null;
      const { strokeStyle, lineWidth, } = lineStyle

      ctx.beginPath()
      ctx.strokeStyle = strokeStyle
      ctx.lineWidth = lineWidth
      points.forEach((point) => {
        const [cx, cy] = point
        if(before){
          ctx.moveTo(before[0], before[1])
          ctx.lineTo(cx, cy)
        }
        before = [cx, cy]
      })
      ctx.stroke()
    }
    return this
  }
  public dot = (point: Point, pointStyle: IBasePoint) => {
    const ctx = this.ctx()
    const { fillStyle, radius } = pointStyle
    const [x, y] = point
    ctx.beginPath()
    ctx.fillStyle = fillStyle
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    return this
  }
  public opacity = (alpha: number) => {
    this.ctx().globalAlpha = alpha
  }
  public size = (width: number, height: number) => {
    const el = this.el()
    el.width = width;
    el.height = height
  }
  public cursor = (cursor: string) => {
    this.el().style.cursor = cursor
  }
}