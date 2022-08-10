export type SourceID = string;
export type ShapeID = string;
export type LayerID = string;
export type ImageID = string;
export type PlatformID = string;
export type RegisterID = string;

export type Point = [number, number];
export type Points = Point[];

export enum ShapeTypes {
  "Polygon" = "Polygon",
  "Rect" = "Rect",
}
export type ShapeType = keyof typeof ShapeTypes;

export enum ShapeStates {
  "normal" = "normal",
  "active" = "active",
  "disabled" = "disabled",
}
export type ShapeState = keyof typeof ShapeStates;

interface ShapeDotStyle {
  color: string;
  raduis: number;
}
interface ShpaeLineStyle {
  color: string;
  width: number;
  type: string;
}
interface ShapeAreaStyle {
  color: string;
}

export interface ShapeStyle {
  dotStyle: ShapeDotStyle;
  lineStyle: ShpaeLineStyle;
  areaStyle: ShapeAreaStyle;
}

export type ShapeStyles = Record<ShapeState, ShapeStyle>;

export interface ShapeRenderState {
  type: ShapeType;
  points: Points;
  styles: ShapeStyles;
  show: boolean;
  tag?: string | null | object;
}

export interface ShapeRegisterOptions
  extends Pick<ShapeRenderState, "type" | "styles" | "tag"> {
  id: string;
}

interface ShapeBaseStyle {
  type: ShapeType;
}
