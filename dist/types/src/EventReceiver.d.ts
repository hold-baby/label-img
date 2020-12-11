import Shape from "./Shape";
import { Point } from "./structure";
export declare enum EAntMouseEvents {
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
    "wheel" = "wheel"
}
export declare type IAntMouseEvent = keyof typeof EAntMouseEvents;
export declare const antMouseEvents: ("mousedown" | "mouseenter" | "mouseleave" | "mousemove" | "mouseout" | "mouseover" | "mouseup" | "dblclick" | "click" | "auxclick" | "contextmenu" | "wheel")[];
export declare enum AntLv {
    "top" = "top",
    "mid" = "mid",
    "bot" = " bot"
}
export declare type IAntLv = keyof typeof AntLv;
export declare const antLvs: ("top" | "mid" | "bot")[];
export interface IAnte {
    offset: Point;
    isOnImage: boolean;
    stopPropagation: () => void;
    isPropagation: boolean;
    getTargetShape: () => [Shape | null, number];
    currentTarget: Shape | null;
}
export interface AntMouseEvent extends MouseEvent, WheelEvent {
    ante: IAnte;
}
declare type ICallback = (e: AntMouseEvent, antEvent: Omit<IAntEvent, "callback">) => void;
interface IAntEvent {
    lv: string;
    type: IAntMouseEvent;
    callback: ICallback;
    target: any;
}
export default class EventReceiver {
    private eventMap;
    constructor();
    on(eventLv: IAntMouseEvent | string, callback: ICallback): void;
    getEventsByType(type: IAntMouseEvent, level?: IAntLv): IAntEvent[];
}
export {};
