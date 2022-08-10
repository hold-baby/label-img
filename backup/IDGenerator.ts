import _ from "./lodash";

interface IIDGProps {
  len?: number;
  start?: number;
}
export class IDGenerator {
  private len: number;
  private count: number;
  constructor(props?: IIDGProps) {
    const { len = 8, start = 1 } = props || {};
    this.count = start;
    this.len = len;
  }
  getID() {
    const id = _.padStart(String(this.count), this.len, "0");
    this.count++;
    return id;
  }
}

export const IDG = new IDGenerator();
