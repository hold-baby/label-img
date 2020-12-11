import padStart from "lodash/padStart"
let count = 0

interface IIDGenerator {
  len?: number;
  start?: number;
}
export default class IDGenerator {
  private len: number
  constructor(props?: IIDGenerator){
    const {
      len = 8,
      start = 0
    } = props || {}
    count = start
    this.len = len
  }
  getID(){
    const id = padStart(String(count), this.len, "0")
    count++
    return id
  }
}

export const IDG = new IDGenerator()