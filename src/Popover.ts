import { Point, TColor } from "./structure";
import { create, css } from "./element";
import _ from "./lodash";

interface IPopoverStyleMap {
  width: number;
  offset: number;
  padding: CSSStyleDeclaration["padding"];
  color: TColor;
  bgColor: TColor;
  scale: number;
}
const defaultStyle: IPopoverStyleMap = {
  width: 200,
  offset: 5,
  padding: "0 4px",
  color: "#000",
  bgColor: "#fff",
  scale: 1,
};
export type PopoverContent = string | HTMLElement;
interface IPopoverOptions {
  center: Point;
  content: PopoverContent;
  style: Partial<IPopoverStyleMap>;
}

export class Popover {
  private center: Point;
  public content: PopoverContent;
  private container: HTMLDivElement;
  private body: HTMLDivElement;
  private parent: HTMLDivElement | null;
  private style: IPopoverStyleMap;
  constructor(props: Partial<IPopoverOptions>) {
    const { center, content, style } = props;
    this.center = center || [0, 0];
    this.content = content || "";

    this.style = Object.assign({}, defaultStyle, style);

    // 用于定位中心点
    const container = create("div");
    // 包裹一层用于设置偏移
    const body = create("div");

    container.appendChild(body);
    this.container = container;
    this.body = body;
    this.parent = null;
  }
  move(positon: Point, scale: number) {
    this.center = positon;
    this.style.scale = scale;
    this.render();
  }
  css(style: Partial<IPopoverStyleMap>) {
    Object.assign(this.style, style);
    this.render();
  }
  render() {
    const [x, y] = this.center;
    const { width, bgColor, offset, color, padding, scale } = this.style;
    css(this.container, {
      position: "absolute",
      display: "inline-block",
      width: `${width}px`,
      transformOrigin: "left",
      left: `${x}px`,
      top: `${y}px`,
      transform: `scale(${scale})`,
    });
    css(this.body, {
      background: `${bgColor}`,
      position: "absolute",
      bottom: `${offset}px`,
      display: "inline-block",
      color,
      padding,
    });
    if (_.isString(this.content)) {
      this.body.innerHTML = this.content;
    } else {
      if (!this.body.contains(this.content)) {
        this.body.appendChild(this.content);
      }
    }
  }
  addTo(ele?: HTMLDivElement) {
    const parent = ele || this.parent;
    if (parent && !parent.contains(this.container)) {
      this.parent = parent;
      parent.appendChild(this.container);
    }
  }
  remove() {
    if (this.parent && this.parent.contains(this.container)) {
      this.parent.removeChild(this.container);
    }
  }
}
