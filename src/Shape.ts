import { EventReceiver } from "./EventReceiver"
import { Points, TColor, Point } from "./structure"
import { isInCircle, isInSide, getDistance, getRectPoints } from "./utils"
import merge from "lodash/merge"
import { IDG } from "./IDGenerator"

export enum ShapeType {
  "Polygon" = "Polygon",
  "Rect" = "Rect"
}
export type TShapeType = keyof typeof ShapeType
enum ShapeStatus {
  "normal" = "normal",
  "active" = "active",
  "disabled" = "disabled"
}
type TShapeStatus = keyof typeof ShapeStatus
export interface IShapeStyle {
  dotColor: TColor;
  dotRadius: number;
  lineColor: TColor;
  lineWidth: number;
  fillColor: TColor;
}
export type IShapeOptionsStyle = Record<TShapeStatus, IShapeStyle>
export type TShapeStyle = Partial<IShapeStyle>

export const normal: IShapeStyle = {
  dotColor: "red",
  dotRadius: 3,
  lineColor: "#c30",
  lineWidth: 2,
  fillColor: "pink",
}
export const active: IShapeStyle = {
  dotColor: "red",
  dotRadius: 3,
  lineColor: "transparent",
  lineWidth: 0,
  fillColor: "#c30",
}
export const disabled: IShapeStyle = {
  dotColor: "#ccc",
  dotRadius: 3,
  lineColor: "transparent",
  lineWidth: 0,
  fillColor: "#666",
}

const defaultStyle: IShapeOptionsStyle = {
  normal,
  active,
  disabled
}
export interface IShapeOptions {
  id?: string;
  type: TShapeType;
  name: string;
  status: TShapeStatus;
  positions: Points;
  data?: any;
  tag?: string,
  showTag?: boolean,
  closed?: boolean;
  visible?: boolean;
  active?: boolean;
  disabled?: boolean;
  insert?: boolean;
  max?: number;
  style?: Partial<IShapeOptionsStyle>;
}
interface ILinePoint {
  idx: number;
  position: Point;
}
export class Shape extends EventReceiver {
  readonly id: string
  readonly type: TShapeType
  readonly name: string
  public positions: Points
  public style: IShapeOptionsStyle
  private status: TShapeStatus
  private closed: boolean
  private visible: boolean
  private insert: boolean
  private showTag: boolean
  public tag: string
  public max: number | undefined
  public data: any
  constructor(options: IShapeOptions){
    super()
    const {
      id = IDG.getID(),
      type, 
      name, 
      positions, 
      data,
      active = false,
      closed = true, 
      disabled = false,
      insert = false, 
      visible = true,
      showTag = true,
      max,
      tag = "",
      style = {}
    } = options

    this.id = id
    this.type = type
    this.name = name
    this.status = disabled ? "disabled" : active ? "active" : "normal"
    this.positions = positions
    this.data = data || null
    this.style = merge(defaultStyle, style)
    this.closed = closed
    this.visible = visible
    this.insert = insert
    this.showTag = showTag
    this.tag = tag
    this.max = max
    if(this.type === ShapeType.Rect){
      this.insert = false
      if(positions.length === 2 && closed){
        this.positions = getRectPoints(positions[0], positions[1])
      }
    }
  }
  getPositions(){
    return this.positions || []
  }
  /**
   * 判断是否在点上
   * @param offset 相对图片的位置
   */
  isOnArc(offset: Point){
    const positions = this.getPositions()
    const style = this.getStyle()
    const { dotRadius } = style
    const arcIndex = positions.findIndex((point) => isInCircle(offset, point, dotRadius))
    return arcIndex
  }
  /**
   * 判断是否在图形上
   * @param offset 相对图片的位置
   */
  isOnShape(offset: Point){
    return isInSide(offset, this.getPositions())
  }
  /**
   * 判断是否在边上
   * @param offset 相对图片的位置
   */
  isOnLine(offset: Point){
    const [ox1, oy1] = offset

    const positions = this.getPositions()
    const start = positions[0] // 获取第一个坐标点
    positions.push(start as Point) // 形成闭合

    let pre = null as null | ILinePoint
    let ps = [] as [ILinePoint, ILinePoint][]
    positions.forEach((point, idx) => {
      const lp = {
        idx,
        position: point
      }
      if(!pre){
        pre = lp
        return
      }
      ps.push([pre, lp])
      pre = lp
    })

    // 1.filter 筛选出在两个坐标点范围内的点
    // 2.map 计算出边上的点位
    const linePoints = ps.filter(([lp1, lp2]) => {
      const [x1, y1] = lp1.position
      const [x2, y2] = lp2.position

      let isInX: boolean
      let isInY: boolean

      if(x1 === x2){
        isInX = x1 - 5 < ox1 && ox1 < x1 + 5
      }else if(x1 < x2){
        isInX = x1 < ox1 && ox1 < x2
      }else{
        isInX = x2 < ox1 && ox1 < x1
      }

      if(y1 === y2){
        isInY = y1 - 5 < oy1 && oy1 < y1 + 5
      }else if(y1 < y2){
        isInY = y1 < oy1 && oy1 < y2
      }else{
        isInY = y2 < oy1 && oy1 < y1
      }
      
      return isInX && isInY
    }).map(([lp1, lp2]) => {
      const [x1, y1] = lp1.position
      const [x2, y2] = lp2.position

      let linePoint = {} as ILinePoint

      let ox2: number
      let oy2: number
      if(y2 - y1 === 0){
        ox2 = ox1
        oy2 = y1
      }else if(x2 - x1 === 0){
        ox2 = x1
        oy2 = oy1
      }else{
        const k1 = (y2 - y1) / (x2 - x1)
        const b1 = y1 - (k1 * x1)
        const k2 = -k1
        const b2 = oy1 - (k2 * ox1)

        ox2 = (b2 - b1) / (k1 - k2)
        oy2 = k2 * ox2 + b2
      }
      
      linePoint = {
        idx: lp1.idx,
        position: [ox2, oy2]
      }
      return linePoint
    }) as ILinePoint[]

    // 1.map 计算出鼠标点到边上的距离
    // 2.sort 距离升序排序
    const sort = linePoints.map((lp) => {
      const { position, idx } = lp
      const distance = getDistance(position, offset)
      const sp = {
        idx,
        position,
        distance
      }
      return sp
    }).sort((sp1, sp2) => sp1.distance - sp2.distance)

    const min = sort[0] // 获取最小的距离点
    if(min){
      // 如果最小点距离小于5 在返回此点位
      return min.distance < 5 ? min : false
    }else{
      return false
    }
  }
  getStyle(){
    return this.style[this.status]
  }
  setActive(status: boolean){
    if(this.isDisabled()) return this
    this.status = status ? "active" : "normal"
    return this
  }
  isActive(){
    return this.status === "active"
  }
  close(){
    this.closed = true
    return this
  }
  isClose(){
    return this.closed
  }
  disabled(){
    this.status = "disabled"
    return this
  }
  isDisabled(){
    return this.status === "disabled"
  }
  normal(){
    this.status = "normal"
    return this
  }
  hidden(){
    this.visible = true
    return this
  }
  isHidden(){
    return !this.visible
  }
  isInsert(){
    return this.insert
  }
  isShowTag(){
    return this.showTag
  }
  tagShow(status?: boolean){
    this.showTag = typeof status === "undefined" ? !this.showTag : !!status
  }
  setTag(tag: string){
    this.tag = tag
  }

  updatePositions(positions: Points){
    this.positions = positions
    return this
  }
}