import EventReceiver from "./EventReceiver";
import { Points, TColor, Point } from "./structure";
export declare enum ShapeType {
    "Polygon" = "Polygon",
    "Rect" = "Rect"
}
export declare type TShapeType = keyof typeof ShapeType;
declare enum ShapeStatus {
    "normal" = "normal",
    "active" = "active",
    "disabled" = "disabled"
}
declare type TShapeStatus = keyof typeof ShapeStatus;
export interface IShapeStyle {
    dotColor: TColor;
    dotRadius: number;
    lineColor: TColor;
    lineWidth: number;
    fillColor: TColor;
}
export declare type IShapeOptionsStyle = Record<TShapeStatus, IShapeStyle>;
export declare type TShapeStyle = Partial<IShapeStyle>;
export declare const normal: IShapeStyle;
export declare const active: IShapeStyle;
export declare const disabled: IShapeStyle;
export interface IShapeOptions {
    id?: string;
    type: TShapeType;
    name: string;
    status: TShapeStatus;
    positions: Points;
    data?: any;
    tag?: string;
    showTag?: boolean;
    closed?: boolean;
    visible?: boolean;
    active?: boolean;
    disabled?: boolean;
    insert?: boolean;
    max?: number;
    style?: Partial<IShapeOptionsStyle>;
}
export default class Shape extends EventReceiver {
    readonly id: string;
    readonly type: TShapeType;
    readonly name: string;
    positions: Points;
    style: IShapeOptionsStyle;
    private status;
    private closed;
    private visible;
    private insert;
    private showTag;
    tag: string;
    max: number | undefined;
    data: any;
    constructor(options: IShapeOptions);
    getPositions(): Points;
    /**
     * 判断是否在点上
     * @param offset 相对图片的位置
     */
    isOnArc(offset: Point): number;
    /**
     * 判断是否在图形上
     * @param offset 相对图片的位置
     */
    isOnShape(offset: Point): boolean;
    /**
     * 判断是否在边上
     * @param offset 相对图片的位置
     */
    isOnLine(offset: Point): false | {
        idx: number;
        position: Point;
        distance: number;
    };
    getStyle(): IShapeStyle;
    setActive(status: boolean): this;
    isActive(): boolean;
    close(): this;
    isClose(): boolean;
    disabled(): this;
    isDisabled(): boolean;
    normal(): this;
    hidden(): this;
    isHidden(): boolean;
    isInsert(): boolean;
    isShowTag(): boolean;
    tagShow(status?: boolean): void;
    setTag(tag: string): void;
    updatePositions(positions: Points): this;
}
export {};
