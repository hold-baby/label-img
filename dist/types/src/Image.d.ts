import EventReceiver from "./EventReceiver";
import { Point, Points } from "./structure";
export default class Image extends EventReceiver {
    private origin;
    complate: boolean;
    el: HTMLImageElement | null;
    constructor(origin?: Point);
    load(source: string | File): Promise<HTMLImageElement>;
    getEl(): HTMLImageElement | null;
    getSize(): number[];
    getOrigin(): Point;
    getPosition(scale?: number): Point[];
    getRelative(offset: Point, scale: number): Point;
    getRelativePositions(positions: Points, scale: number): Points;
    setOrigin(origin: Point): void;
}
