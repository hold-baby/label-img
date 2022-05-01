import { create } from "./element";
import { Point, Points } from "./structure";
import { hexToRgba } from "./utils";

type StrokeStyle = string | CanvasPattern | CanvasGradient;
type FillStyle = string | CanvasGradient | CanvasPattern;

interface IBasePoint {
  dotColor: FillStyle;
  dotRadius: number;
}
interface ILineStyle {
  lineColor: StrokeStyle;
  lineWidth: number;
  lineDash: number[];
}
interface IFillStyle {
  fillColor: FillStyle;
  opacity: number;
}
interface IPolygonStyle {
  lineWidth: number;
  lineColor: StrokeStyle;
  dotRadius: number;
  dotColor: FillStyle;
  fillColor: FillStyle;
  opacity: number;
}
interface ITextStyle {
  fontSize: number;
  color: FillStyle;
  bgColor: FillStyle;
  offset: Point;
  padding: Point;
}
export class Canvas {
  public el: () => HTMLCanvasElement;
  public ctx: () => CanvasRenderingContext2D;
  constructor() {
    const el = create("canvas");
    const ctx = el.getContext("2d") as CanvasRenderingContext2D;
    el.tabIndex = -1;
    el.focus();
    this.el = () => el;
    this.ctx = () => ctx;
  }
  public setPoints = (points: Points) => {
    const ctx = this.ctx();
    points.forEach(([x, y], i) => {
      if (!i) {
        ctx.moveTo(x, y);
        return;
      }
      ctx.lineTo(x, y);
    });
  };
  public line = (points: Points, lineStyle: Partial<ILineStyle>) => {
    if (points.length > 1) {
      const ctx = this.ctx();
      let before: null | Point = null;
      const { lineColor = "", lineWidth = 1, lineDash = [0] } = lineStyle;

      const _lineDash = ctx.getLineDash();

      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(lineDash);
      points.forEach((point) => {
        const [cx, cy] = point;
        if (before) {
          ctx.moveTo(before[0], before[1]);
          ctx.lineTo(cx, cy);
        }
        before = [cx, cy];
      });
      ctx.stroke();
      ctx.setLineDash(_lineDash);
      ctx.closePath();
    }
    return this;
  };
  public fill = (points: Points, style: Partial<IFillStyle>) => {
    if (points.length > 2) {
      const ctx = this.ctx();
      const { fillColor = "", opacity } = style;

      // 填充
      ctx.beginPath();
      const _opacity = this.el().style.opacity || 1;

      this.setPoints(points);
      ctx.fillStyle = fillColor;

      if (opacity) {
        this.opacity(opacity);
      }
      ctx.fill();
      ctx.closePath();
      this.opacity(Number(_opacity));
    }
  };
  public fillReact = (start: Point, end: Point, style: Partial<IFillStyle>) => {
    const ctx = this.ctx();
    const { fillColor = "", opacity = 1 } = style;
    // 填充
    ctx.beginPath();
    const _opacity = this.el().style.opacity || 1;
    ctx.fillStyle = hexToRgba(fillColor.toString(), opacity);
    if (opacity) {
      this.opacity(opacity);
    }
    ctx.fillRect(...start, ...end);
    ctx.closePath();
    this.opacity(Number(_opacity));
    return this;
  };
  public polygon = (points: Points, style: Partial<IPolygonStyle>) => {
    this.fill(points, style);
    this.line(points, style);
    this.dots(points, style);
    return this;
  };
  public dot = (point: Point, pointStyle: Partial<IBasePoint>) => {
    const ctx = this.ctx();
    const { dotColor = "", dotRadius = 1 } = pointStyle;
    if (dotRadius <= 0) return this;
    const [x, y] = point;
    ctx.beginPath();
    ctx.fillStyle = dotColor;
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    return this;
  };
  public dots = (points: Points, pointStyle: Partial<IBasePoint>) => {
    const { dotRadius = 1 } = pointStyle;
    if (dotRadius <= 0) return this;
    points.forEach((point) => {
      this.dot(point, pointStyle);
    });
    return this;
  };
  public text = (
    content: string,
    point: Point,
    style?: Partial<ITextStyle>
  ) => {
    const {
      fontSize = 16,
      color,
      bgColor,
      offset = [],
      padding = [],
    } = style || {};
    const ctx = this.ctx();
    const [x, y] = point;
    const [px = 4, py = 0] = padding;
    const [ox = 0, oy = 5] = offset;

    ctx.font = `${fontSize}px`;
    const text = ctx.measureText(content);
    // tag 的总长度
    const w = text.width + px * 2;
    // tag 的总高度
    const h = fontSize + py * 2;
    // tag 左上坐标
    const [lx, ly] = [x + ox, y - h - oy];

    // 绘制背景
    ctx.beginPath();
    ctx.rect(lx, ly, w, h);
    if (bgColor) {
      ctx.fillStyle = bgColor;
    }
    ctx.fill();
    ctx.closePath();

    // 绘制文字
    ctx.beginPath();
    if (color) {
      ctx.fillStyle = color;
    }
    ctx.textBaseline = "middle";
    ctx.fillText(content, lx + px, ly + h * 0.5);
    ctx.closePath();
    return this;
  };
  public opacity = (alpha: number) => {
    this.ctx().globalAlpha = alpha;
  };
  public size = (width: number, height: number) => {
    const el = this.el();
    el.width = width;
    el.height = height;
  };
  public getSize = () => {
    const el = this.el();
    const { width = 0, height = 0 } = el;
    return [width, height];
  };
  public cursor = (cursor: string) => {
    this.el().style.cursor = cursor;
    return this;
  };
  public clear = () => {
    const { width, height } = this.el();
    this.ctx().clearRect(0, 0, width, height);
    return this;
  };
}
