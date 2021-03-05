import { create } from "./element"
import { Point, Points } from "./structure"

type StrokeStyle = string | CanvasPattern | CanvasGradient;
type FillStyle = string | CanvasGradient | CanvasPattern;

interface IBasePoint {
  dotColor: FillStyle;
  dotRadius: number;
}
interface ILineStyle {
  lineColor: StrokeStyle;
  lineWidth: number;
  lineDash: number[];
}
interface IFillStyle {
  fillColor: FillStyle;
  opacity: number;
}
interface IPolygonStyle {
  lineWidth: number;
  lineColor: StrokeStyle;
  dotRadius: number;
  dotColor: FillStyle;
  fillColor: FillStyle;
  opacity: number;
}
export class Canvas {
  public el: () => HTMLCanvasElement;
  public ctx: () => CanvasRenderingContext2D;
  constructor(){
    const el = create("canvas")
    const ctx = el.getContext("2d") as CanvasRenderingContext2D
    el.tabIndex = -1
    el.focus()
    this.el = () => el
    this.ctx = () => ctx
  }
  public setPoints = (points: Points) => {
    const ctx = this.ctx()
    points.forEach(([x, y], i) => {
      if(!i) {
        ctx.moveTo(x, y)
        return
      }
      ctx.lineTo(x, y)
    })
  }
  public line = (points: Points, lineStyle: Partial<ILineStyle>) => {
    if(points.length > 1){
      const ctx = this.ctx()
      let before: null | Point = null;
      const { lineColor = "", lineWidth = 1, lineDash = [0] } = lineStyle
      
      const _lineDash = ctx.getLineDash()

      ctx.beginPath()
      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth
      ctx.setLineDash(lineDash)
      points.forEach((point) => {
        const [cx, cy] = point
        if(before){
          ctx.moveTo(before[0], before[1])
          ctx.lineTo(cx, cy)
        }
        before = [cx, cy]
      })
      ctx.stroke()
      ctx.setLineDash(_lineDash)
      ctx.closePath()
    }
    return this
  }
  public fill = (points: Points, style: Partial<IFillStyle>) => {
    if(points.length > 2){
      const ctx = this.ctx()
      const { 
        fillColor = "",
        opacity
      } = style
      
      // 填充
      ctx.beginPath()
      const _opacity = this.el().style.opacity || 1
      
      this.setPoints(points)
      ctx.fillStyle = fillColor
      
      if(opacity){
        this.opacity(opacity)
      }
      ctx.fill()
      ctx.closePath()
      this.opacity(Number(_opacity))
    }
  }
  public fillReact = (start: Point, end: Point, style: Partial<IFillStyle>) => {
    const ctx = this.ctx()
    const { 
      fillColor = "",
      opacity
    } = style
    
    // 填充
    ctx.beginPath()
    const _opacity = this.el().style.opacity || 1
    ctx.fillStyle = fillColor
    if(opacity){
      this.opacity(opacity)
    }
    ctx.fillRect(...start, ...end)
    ctx.closePath()
    this.opacity(Number(_opacity))
    return this
  }
  public polygon = (points: Points, style: Partial<IPolygonStyle>) => {
    this.fill(points, style)
    this.line(points, style)
    this.dots(points, style)
    return this
  }
  public dot = (point: Point, pointStyle: Partial<IBasePoint>) => {
    const ctx = this.ctx()
    const { dotColor = "", dotRadius = 1 } = pointStyle
    const [x, y] = point
    ctx.beginPath()
    ctx.fillStyle = dotColor
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    return this
  }
  public dots = (points: Points, pointStyle: Partial<IBasePoint>) => {
    points.forEach((point) => {
      this.dot(point, pointStyle)
    })
  }
  public opacity = (alpha: number) => {
    this.ctx().globalAlpha = alpha
  }
  public size = (width: number, height: number) => {
    const el = this.el()
    el.width = width;
    el.height = height
  }
  public getSize = () => {
    const el = this.el()
    const { width = 0, height = 0 } = el
    return [width, height]
  }
  public cursor = (cursor: string) => {
    this.el().style.cursor = cursor
  }
  public clear = () => {
    const { width, height } = this.el()
    this.ctx().clearRect(0, 0, width, height)
  }
}