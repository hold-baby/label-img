class List {
  private list: Array<string>;
  constructor() {
    this.list = [];
  }
  add(id: string) {
    this.list.push(id);
  }
}
