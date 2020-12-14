import { Map } from "./structure"
import { IShapeOptions } from "./Shape"

export type IShapeCfg = Omit<IShapeOptions, "data" | "positions">
export type IShapeContent = Partial<Omit<IShapeOptions, "type">>

export class ShapeRegister {
  private shapeMap: Map<any>
  constructor(){
    this.shapeMap = {}
  }
  add(name: string, shapeCfg: IShapeCfg){
    if(!this.shapeMap[name]){
      shapeCfg.name = name
      this.shapeMap[name] = shapeCfg
    }
  }
  get(name: string){
    if(this.shapeMap[name]){
      return Object.assign({}, this.shapeMap[name])
    }
    throw "图形未注册"
  }
  is(name: string){
    return !!this.shapeMap[name]
  }
}