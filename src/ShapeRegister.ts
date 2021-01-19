import { Map } from "./structure"
import { IShapeOptions } from "./Shape"

export type IShapeCfg = Omit<IShapeOptions, "data" | "positions">
export type IShapeContent = Partial<Omit<IShapeOptions, "type">>
export type RegisterID = string;
export class ShapeRegister {
  private shapeMap: Map<any>
  constructor(){
    this.shapeMap = {}
  }
  add(rid: RegisterID, shapeCfg: Omit<IShapeCfg, "registerID">){
    if(!this.shapeMap[rid]){
      (shapeCfg as IShapeCfg).registerID = rid
      this.shapeMap[rid] = shapeCfg
    }
  }
  get(rid: RegisterID){
    if(this.shapeMap[rid]){
      return Object.assign({}, this.shapeMap[rid])
    }
    throw "图形未注册"
  }
  is(rid: RegisterID){
    return !!this.shapeMap[rid]
  }
}