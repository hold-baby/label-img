import { isString } from "lodash";
import { loadImage, createID } from "../helper/utils";
import { Point, SourceID } from "../types";
import { Layer } from "./layer";
import { ShapeProps } from "./shape";
import LabelImg from "./label-img";

export class Source {
  readonly id: SourceID;
  readonly el: HTMLImageElement;
  readonly platform: LabelImg;
  private layerMap: Map<string, Layer>;
  private _layer: Layer;

  public position: Point;
  constructor(platform: LabelImg, el: HTMLImageElement) {
    this.platform = platform;
    this.el = el;
    this.id = createID();
    this.layerMap = new Map();
    this._layer = this.createLayer();
    this.position = [0, 0];
  }
  moveTo(point: Point) {
    this.position = point;
  }
  size() {
    return [this.el.width, this.el.height] as Point;
  }
  createLayer() {
    const layer = new Layer(this);
    // 添加到全局方便查找
    this.platform._manager.addLayer(layer);
    // 内部自身存储一份
    this.layerMap.set(layer.id, layer);
    return layer;
  }
  getLayers() {
    return this.layerMap.values();
  }
  createShape(options: ShapeProps) {
    this._layer.createShape(options);
  }
}
