import { Platform, LabelImgOptions } from "./Platform";
import { Shape } from "./Shape";
import { IDGenerator } from "./IDGenerator";
import * as utils from "./utils";

export default class LabelImg extends Platform {
  constructor(container: HTMLDivElement, options?: Partial<LabelImgOptions>) {
    super(container, options);
  }
  static Shape = Shape;
  static IDGenerator = IDGenerator;
  static utils = utils;
}
