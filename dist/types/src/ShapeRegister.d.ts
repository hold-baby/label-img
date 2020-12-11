import { IShapeOptions } from "./Shape";
export declare type IShapeCfg = Omit<IShapeOptions, "data" | "positions">;
export declare type IShapeContent = Partial<Omit<IShapeOptions, "type">>;
export default class ShapeRegister {
    private shapeMap;
    constructor();
    add(name: string, shapeCfg: IShapeCfg): void;
    get(name: string): any;
}
