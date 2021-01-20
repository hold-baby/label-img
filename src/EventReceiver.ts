import { Shape } from "./Shape"
import { Map, Point } from "./structure"

export enum EAntMouseEvents {
  "mousedown" = "mousedown",
  "mouseenter" = "mouseenter",
  "mouseleave" = "mouseleave",
  "mousemove" = "mousemove",
  "mouseout" = "mouseout",
  "mouseover" = "mouseover",
  "mouseup" = "mouseup",
  "dblclick" = "dblclick",
  "click" = "click",
  "auxclick" = "auxclick",
  "contextmenu" = "contextmenu",
  "wheel" = "wheel",
}
export type IAntMouseEvent = keyof typeof EAntMouseEvents
export const antMouseEvents = Object.keys(EAntMouseEvents) as IAntMouseEvent[]

export enum AntLv {
  "top" = "top",
  "mid" = "mid",
  "bot" =" bot"
}
export type IAntLv = keyof typeof AntLv
export const antLvs = Object.keys(AntLv) as IAntLv[]

export interface IAnte {
  offset: Point;
  stopPropagation: () => void;
  isPropagation: boolean;
  getTargetShape: () => [Shape | null, number];
  currentTarget: Shape | null
}
export interface AntMouseEvent extends MouseEvent, WheelEvent {
  ante: IAnte;
}
type ICallback = (e: AntMouseEvent, antEvent: Omit<IAntEvent, "callback">) => void;

interface IAntEvent {
  lv: string;
  type: IAntMouseEvent;
  callback: ICallback;
  target: any;
}
export class EventReceiver {
  public getEventList: (type: IAntMouseEvent) => IAntEvent[]
  private addEvent: (type: string, antEvent: IAntEvent) => void;
  constructor(){
    const eventMap: Map<IAntEvent[]> = {}
    this.getEventList = (type: IAntMouseEvent) => {
      return eventMap[type] || []
    }
    this.addEvent = (type: string, antEvent: IAntEvent) => {
      if(eventMap[type]){
        eventMap[type].push(antEvent)
      }else{
        eventMap[type] = [antEvent]
      }
    }
  }
  on(eventLv: IAntMouseEvent | string, callback: ICallback){
    const [type, lv = "mid"] = eventLv.split(".") as [IAntMouseEvent, IAntLv]
    const kType = `${type}.${lv}`
    const antEvent = {
      lv,
      type,
      callback,
      target: this
    }
    this.addEvent(kType, antEvent)
    
  }
  public getEventsByType = (type: IAntMouseEvent, level?: IAntLv) => {
    const lv = level || "mid"
    return this.getEventList(`${type}.${lv}` as IAntMouseEvent)
  }
}