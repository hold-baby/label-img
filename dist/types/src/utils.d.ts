import { Point, Points } from "./structure";
export declare const isInSide: (point: Point, vs: Point[]) => boolean;
export declare const getRectPoints: (start: Point, end: Point) => Points;
export declare const getDistance: (p1: Point, p2: Point) => number;
export declare const isInCircle: (p1: Point, p2: Point, r: number) => boolean;
declare const _default: {
    isInSide: (point: Point, vs: Point[]) => boolean;
    getRectPoints: (start: Point, end: Point) => Points;
    getDistance: (p1: Point, p2: Point) => number;
    isInCircle: (p1: Point, p2: Point, r: number) => boolean;
};
export default _default;
