import { ShapeID } from "src/types";
import { createID } from "../helper/utils";
import { Layer } from "./layer";
import { Source } from "./source";
import { ShapeRenderState, Points, RegisterID } from "../types";

interface ShapeOptions {
  registerID: RegisterID;
  points: Points;
  visible?: boolean;
}

export type ShapeProps = Partial<ShapeOptions> &
  Pick<ShapeOptions, "points" | "registerID">;

export class Shape {
  readonly id: ShapeID;
  readonly layer: Layer;
  readonly source: Source;
  readonly registerID: RegisterID;
  private points: Points;
  private visible: boolean;

  constructor(layer: Layer, options: ShapeOptions) {
    this.id = createID();
    this.layer = layer;
    this.source = layer.source;
    this.visible = true;
    this.registerID = options.registerID;
    this.points = options.points;
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
  getPoints() {
    return this.points;
  }
}
