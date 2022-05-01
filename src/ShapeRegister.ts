import { Map } from "./structure";
import { IShapeOptions } from "./Shape";

export type IShapeCfg = Omit<IShapeOptions, "data" | "positions">;
export type IShapeContent = Partial<Omit<IShapeOptions, "type">>;
export type RegisterID = string;
/**
 * 图形样式注册
 */
export class ShapeRegister {
  public add: (
    rid: RegisterID,
    shapeCfg: Omit<IShapeCfg, "registerID" | "name">
  ) => void;
  public get: (rid: RegisterID) => any;
  public is: (rid: RegisterID) => boolean;
  public getMap: () => Map<any>;
  constructor() {
    const shapeMap: Map<any> = {};
    this.add = (rid, shapeCfg) => {
      if (!shapeMap[rid]) {
        (shapeCfg as IShapeCfg).registerID = rid;
        shapeMap[rid] = shapeCfg;
      }
    };
    this.get = (rid) => {
      if (shapeMap[rid]) {
        return Object.assign({}, shapeMap[rid]);
      }
      throw "图形未注册";
    };
    this.is = (rid) => {
      return !!shapeMap[rid];
    };
    this.getMap = () => Object.assign({}, shapeMap);
  }
}
