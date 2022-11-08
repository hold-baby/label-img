import { Source } from "./source";
import { LayerID } from "../types";
import { createID } from "../helper/utils";
import { Shape, ShapeProps } from "./shape";

export class Layer {
  readonly id: LayerID;
  readonly type: String;
  readonly source?: Source;
  private visible: boolean;
  private list: Array<string>;
  constructor(source?: Source) {
    this.id = createID();
    this.type = "Layer";
    this.source = source;
    this.visible = true;
    this.list = [];
  }
  hidden() {
    this.visible = false;
  }
  show() {
    this.visible = true;
  }
  isShow() {
    return this.visible;
  }
  createShape(options: ShapeProps) {
    const shape = new Shape(this, options);
    this.list.push(shape.id);
    this.source?.platform._manager.addShape(shape);
  }
  getShapes() {
    return this.list.slice();
  }
}
