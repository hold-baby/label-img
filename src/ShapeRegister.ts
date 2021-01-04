import { Map } from "./structure"
import { IShapeOptions } from "./Shape"

export type IShapeCfg = Omit<IShapeOptions, "data" | "positions">
export type IShapeContent = Partial<Omit<IShapeOptions, "type">>

export class ShapeRegister {
  private shapeMap: Map<any>
  constructor(){
    this.shapeMap = {}
  }
  add(rid: string, shapeCfg: Omit<IShapeCfg, "registerID">){
    if(!this.shapeMap[rid]){
      (shapeCfg as IShapeCfg).registerID = rid
      this.shapeMap[rid] = shapeCfg
    }
  }
  get(rid: string){
    if(this.shapeMap[rid]){
      return Object.assign({}, this.shapeMap[rid])
    }
    throw "图形未注册"
  }
  is(rid: string){
    return !!this.shapeMap[rid]
  }
}