import Platform, { AntOptions } from "./Platform";
import Shape from "./Shape";
import IDGenerator from "./IDGenerator";
export default class LabelImg extends Platform {
    version: string;
    author: string;
    constructor(container: HTMLDivElement, options?: AntOptions);
    static Shape: typeof Shape;
    static IDGenerator: typeof IDGenerator;
}
