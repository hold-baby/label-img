declare type Point = [number, number];
declare type Points = Point[];
declare type TColor = string;

declare enum ShapeType {
    "Polygon" = "Polygon",
    "Rect" = "Rect"
}
declare type TShapeType = keyof typeof ShapeType;
declare enum ShapeStatus {
    "normal" = "normal",
    "active" = "active",
    "disabled" = "disabled"
}
declare type TShapeStatus = keyof typeof ShapeStatus;
interface IShapeStyle {
    dotColor: TColor;
    dotRadius: number;
    lineColor: TColor;
    lineWidth: number;
    fillColor: TColor;
}
declare type IShapeOptionsStyle = Record<TShapeStatus, IShapeStyle>;
interface IShapeOptions {
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
declare class Shape extends EventReceiver {
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

declare enum EAntMouseEvents {
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
declare type IAntMouseEvent = keyof typeof EAntMouseEvents;
declare enum AntLv {
    "top" = "top",
    "mid" = "mid",
    "bot" = " bot"
}
declare type IAntLv = keyof typeof AntLv;
interface IAnte {
    offset: Point;
    isOnImage: boolean;
    stopPropagation: () => void;
    isPropagation: boolean;
    getTargetShape: () => [Shape | null, number];
    currentTarget: Shape | null;
}
interface AntMouseEvent extends MouseEvent, WheelEvent {
    ante: IAnte;
}
declare type ICallback = (e: AntMouseEvent, antEvent: Omit<IAntEvent, "callback">) => void;
interface IAntEvent {
    lv: string;
    type: IAntMouseEvent;
    callback: ICallback;
    target: any;
}
declare class EventReceiver {
    private eventMap;
    constructor();
    on(eventLv: IAntMouseEvent | string, callback: ICallback): void;
    getEventsByType(type: IAntMouseEvent, level?: IAntLv): IAntEvent[];
}

declare type IShapeCfg = Omit<IShapeOptions, "data" | "positions">;
declare type IShapeContent = Partial<Omit<IShapeOptions, "type">>;

declare type InputShapeOrID = Shape | string;
declare const dfOptions: {
    width: number;
    height: number;
    bgColor: string;
};
declare type AntOptions = typeof dfOptions;
declare class Platform extends EventReceiver {
    private container;
    private options;
    private canvas;
    private ctx;
    private Image;
    private scale;
    private offset;
    private shapeRegister;
    private drawing;
    private cache;
    private activeShape;
    private shapeList;
    private eventHook;
    private fontSize;
    private continuity;
    private isGuideLine;
    private isTagShow;
    private renderLocker;
    constructor(container: HTMLDivElement, options?: AntOptions);
    reset(): void;
    init(): void;
    initMouseEvent(): void;
    initGuideLine(): void;
    initImageEvent(): void;
    initDrawEvent(): void;
    initShapeEvent(): void;
    load(source: string | File): Promise<unknown>;
    register(name: string, options: IShapeCfg): void;
    createShape(name: string, options?: IShapeContent): Shape;
    label(name: string, continuity?: boolean): void;
    addShape(shape: Shape, idx?: number): void;
    remove(input: Shape | string): void;
    setActive(shape: Shape): void;
    cancel(): void;
    orderShape(input: InputShapeOrID, flag?: boolean): void;
    private findShapeIndex;
    getShapeList(): Shape[];
    getShapeByName(name: string): Shape[];
    private loseActive;
    guideLine(status?: boolean): void;
    tagShow(status?: boolean): void;
    setContinuity(status: boolean): void;
    clearCanvas(): void;
    renderBackground(): void;
    renderImage(): void;
    renderGuideLine(): void;
    private renderShape;
    private renderCache;
    private renderShapeList;
    forceRender(): void;
    render(): void;
}

interface IIDGenerator {
    len?: number;
    start?: number;
}
declare class IDGenerator {
    private len;
    constructor(props?: IIDGenerator);
    getID(): string;
}

declare class LabelImg extends Platform {
    version: string;
    author: string;
    constructor(container: HTMLDivElement, options?: AntOptions);
    static Shape: typeof Shape;
    static IDGenerator: typeof IDGenerator;
}

export default LabelImg;
