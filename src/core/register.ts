import { RegisterID, ShapeStyles, ShapeRegisterOptions } from "src/types";
import { createID } from "../helper/utils";

export type ShapeRegisterProps = Partial<ShapeRegisterOptions> &
  Pick<ShapeRegisterOptions, "type" | "id">;

const defaultRectStyles: ShapeStyles = {
  normal: {
    dotStyle: { color: "red", raduis: 5 },
    lineStyle: { color: "black", width: 2, type: "solid" },
    areaStyle: { color: "blue" },
  },
  active: {
    dotStyle: { color: "red", raduis: 5 },
    lineStyle: { color: "black", width: 2, type: "solid" },
    areaStyle: { color: "blue" },
  },
  disabled: {
    dotStyle: { color: "red", raduis: 5 },
    lineStyle: { color: "black", width: 2, type: "solid" },
    areaStyle: { color: "blue" },
  },
};

const defaultPolygonStyles: ShapeStyles = {
  normal: {
    dotStyle: { color: "red", raduis: 5 },
    lineStyle: { color: "black", width: 2, type: "solid" },
    areaStyle: { color: "blue" },
  },
  active: {
    dotStyle: { color: "red", raduis: 5 },
    lineStyle: { color: "black", width: 2, type: "solid" },
    areaStyle: { color: "blue" },
  },
  disabled: {
    dotStyle: { color: "red", raduis: 5 },
    lineStyle: { color: "black", width: 2, type: "solid" },
    areaStyle: { color: "blue" },
  },
};

export class Register {
  private registerMap: Map<RegisterID, ShapeRegisterOptions>;
  constructor() {
    this.registerMap = new Map();
  }
  register(options: ShapeRegisterProps) {
    if (!options.type || !options.id) return;
    const _options = Object.assign(
      {},
      {
        styles:
          options.type === "Polygon" ? defaultPolygonStyles : defaultRectStyles,
      },
      options
    );
    this.registerMap.set(options.id, _options);
  }
  getOption(id: RegisterID) {
    return this.registerMap.get(id) as ShapeRegisterOptions;
  }
}
