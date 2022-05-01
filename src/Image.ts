import { EventReceiver } from "./EventReceiver";
import { Point, Points } from "./structure";

export enum ImagePlacement {
  default = "default",
  center = "center",
}
export type ImageLoadSource = File | string;

const dfOrigin: Point = [0, 0];
export class Image extends EventReceiver {
  private origin: Point;
  public complate: boolean;
  public el: HTMLImageElement | null;
  constructor(origin?: Point) {
    super();
    this.origin = origin || dfOrigin;
    this.complate = false;
    this.el = null;
  }
  /**
   * 加载图片
   * @param source ImageLoadSource 图片对象或图片路径
   */
  load(source: ImageLoadSource) {
    this.origin = dfOrigin;
    return new Promise<HTMLImageElement>((resolve, reject) => {
      this.complate = false;
      const img = document.createElement("img");
      new Promise((resolve, reject) => {
        let src = source;
        if (source instanceof File) {
          const reader = new FileReader();
          reader.readAsDataURL(source);
          reader.onload = (e) => {
            src = e.target?.result as string;
            resolve(src);
          };
          reader.onerror = () => {
            reject();
            throw "图片加载错误";
          };
        } else if (typeof source === "string") {
          resolve(src);
        }
      }).then((src) => {
        img.src = src as string;
        img.onload = () => {
          this.complate = true;
          this.el = img;
          resolve(img);
        };
        img.onerror = () => {
          reject();
          throw "图片加载错误";
        };
      });
    });
  }
  loadFromImg(img: HTMLImageElement) {
    this.origin = dfOrigin;
    this.complate = true;
    this.el = img;
  }
  /**
   * 获取图片对象
   * @return {HTMLImageElement | null}
   */
  getEl() {
    return this.el;
  }
  /**
   * 获取图片宽高
   * @param scale number 缩放大小
   * @return [width: number, width: number]
   */
  getSize(scale?: number) {
    if (this.el) {
      const { width, height } = this.el;
      return [width * (scale || 1), height * (scale || 1)];
    }
    return dfOrigin;
  }
  /**
   * 获取图片原点
   * @return Point
   */
  getOrigin() {
    return this.origin.slice();
  }
  /**
   * 获取图片中心点
   * @return Point
   */
  getCenter(scale = 1) {
    if (this.el) {
      const [x, y] = this.origin.slice();
      const { width, height } = this.el;
      const [hx, hh] = [(width * scale) / 2, (height * scale) / 2];
      return [x + hx, y + hh];
    }
    return dfOrigin;
  }
  /**
   * 获取图片缩放后的坐标点
   * @param scale number 缩放大小
   */
  getPosition(scale = 1) {
    const [w, h] = this.getSize();
    const sw = w * scale;
    const sh = h * scale;
    const [x, y] = this.origin;
    const postion: Point[] = [
      this.origin,
      [x + sw, y],
      [x + sw, y + sh],
      [x, y + sh],
    ];
    return postion;
  }
  /**
   * 获取容器点位在图片上的坐标点位
   * @param offset Point 容器的坐标点位
   * @param scale 缩放大小
   * @return Point
   */
  toImagePoint(offset: Point, scale: number) {
    const [px, py] = offset;
    const [ox, oy] = this.origin;
    const point: Point = [(px - ox) / scale, (py - oy) / scale];
    return point;
  }
  /**
   * 获取 shape 坐标点转换成画布的坐标
   * @param positions Points Shape 的坐标点集合
   * @param scale 缩放大小
   * @return Points
   */
  getShape2CanvasPoints(positions: Points, scale: number) {
    const rp: Points = positions.map((position) => {
      return this.getShape2CanvasPoint(position, scale);
    });
    return rp;
  }
  /**
   * 获取 shape 坐标点转换成画布的坐标
   * @param positions Points Shape 的坐标点集合
   * @param scale 缩放大小
   * @return Points
   */
  getShape2CanvasPoint(position: Point, scale: number) {
    const orgin = this.getOrigin();
    const [ox, oy] = orgin;
    const [sx, sy] = position;
    const cx = ox + sx * scale;
    const cy = oy + sy * scale;
    return [cx, cy] as Point;
  }
  /**
   * 设置图片的原点坐标
   * @param origin Point 原点坐标
   */
  moveTo(origin: Point) {
    this.origin = origin;
  }
}
