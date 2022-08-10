import { Source } from "./source";
import { Layer } from "./layer";
import { Shape } from "./shape";

export class Manager {
  private sourceMap: Map<string, Source>;
  private layerMap: Map<string, Layer>;
  private shapeMap: Map<string, Shape>;
  constructor() {
    // 存放所有的 source
    this.sourceMap = new Map();
    // 存放所有的 layer
    this.layerMap = new Map();
    // 存放所有的 shape
    this.shapeMap = new Map();
  }
  addSource(instance: Source) {
    this.sourceMap.set(instance.id, instance);
  }
  getSourceSize() {
    return this.sourceMap.size;
  }

  addLayer(instance: Layer) {
    this.layerMap.set(instance.id, instance);
  }

  addShape(instance: Shape) {
    this.shapeMap.set(instance.id, instance);
  }
  getShape(id: string) {
    return this.shapeMap.get(id);
  }
}
