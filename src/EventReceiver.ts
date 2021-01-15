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
  isOnImage: boolean;
  isOnShape: boolean;
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
  private eventMap: Map<IAntEvent[]>
  constructor(){
    this.eventMap = {}
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
    const eMap = this.eventMap
    if(eMap[kType]){
			eMap[kType].push(antEvent)
		}else{
			eMap[kType] = [antEvent]
		}
  }
  getEventsByType(type: IAntMouseEvent, level?: IAntLv){
    const lv = level || "mid"
    const eMap = this.eventMap[`${type}.${lv}`]
    return eMap || []
  }
}