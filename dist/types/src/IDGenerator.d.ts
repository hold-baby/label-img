interface IIDGenerator {
    len?: number;
    start?: number;
}
export default class IDGenerator {
    private len;
    constructor(props?: IIDGenerator);
    getID(): string;
}
export declare const IDG: IDGenerator;
export {};
