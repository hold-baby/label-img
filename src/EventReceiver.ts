import { Shape } from "./Shape";
import { Image } from "./Image";
import { Map, Point } from "./structure";
import _ from "./lodash";

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
export type IAntMouseEvent = keyof typeof EAntMouseEvents;
export const antMouseEvents = Object.keys(EAntMouseEvents) as IAntMouseEvent[];

export enum AntLv {
  "top" = "top",
  "mid" = "mid",
  "bot" = " bot",
}
export type IAntLv = keyof typeof AntLv;
export const antLvs = Object.keys(AntLv) as IAntLv[];

export interface IAnte {
  offset: Point;
  stopPropagation: () => void;
  isPropagation: boolean;
  getTargetShape: () => [Shape | null, number];
  currentTarget: Shape | null;
  currentDotIndex: number;
  isOnImage: boolean;
  isOnShape: boolean;
  isOnArc: boolean;
}
export interface AntMouseEvent extends MouseEvent, WheelEvent {
  ante: IAnte;
}
type ICallback = (
  e: AntMouseEvent,
  antEvent: Omit<IAntEvent, "callback">
) => void;
interface EventHandler {
  lv: IAntLv;
  callback: ICallback;
}
export interface IAntEvent {
  lv: IAntLv;
  type: IAntMouseEvent;
  callback: ICallback;
  target: null | Image | Shape;
}
export class EventReceiver {
  public getEventList: (type: IAntMouseEvent) => IAntEvent[];
  private addEvent: (type: string, antEvent: IAntEvent) => void;
  constructor() {
    const eventMap: Map<IAntEvent[]> = {};
    this.getEventList = (type: IAntMouseEvent) => {
      return eventMap[type] || [];
    };
    this.addEvent = (type: string, antEvent: IAntEvent) => {
      if (eventMap[type]) {
        eventMap[type].push(antEvent);
      } else {
        eventMap[type] = [antEvent];
      }
    };
  }
  on(type: IAntMouseEvent, level: IAntLv | ICallback, handler?: ICallback) {
    let callback = _.isFunction(level) ? level : (handler as ICallback);
    let lv = _.isFunction(level) ? "mid" : level;

    const kType = `${type}.${lv}`;
    const antEvent = {
      lv,
      type,
      callback,
      target: this as any,
    };
    this.addEvent(kType, antEvent);
  }
  public getEventsByType = (type: IAntMouseEvent, level?: IAntLv) => {
    const lv = level || "mid";
    return this.getEventList(`${type}.${lv}` as IAntMouseEvent);
  };
}
