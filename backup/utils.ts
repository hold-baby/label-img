import { Point, Points } from "./structure";

/**
 * 判断点位是否在图形内部
 * @param point Point 待检测点位
 * @param vs Points 图形点位集合
 * @return boolean
 */
export const isInSide = (point: Point, vs: Point[]) => {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0],
      yi = vs[i][1];
    const xj = vs[j][0],
      yj = vs[j][1];

    const intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};
/**
 * 获取矩形完整的4个点位
 * @param start Point 矩形起始点位
 * @param end Point 矩形结束点位
 * @return ps Points 矩形完整的4个点位
 */
export const getRectPoints = (start: Point, end: Point) => {
  const p0 = start;
  const p1: Point = [end[0], start[1]];
  const p2 = end;
  const p3: Point = [start[0], end[1]];
  const ps: Points = [p0, p1, p2, p3];
  return ps;
};
/**
 * 获取两点之间的距离
 * @param p1 Point 点位坐标
 * @param p2 Point 点位坐标
 * @return distance number 距离长度
 */
export const getDistance = (p1: Point, p2: Point) => {
  const x = p2[0] - p1[0];
  const y = p2[1] - p1[1];
  const x2 = Math.pow(x, 2);
  const y2 = Math.pow(y, 2);
  const distance = Math.abs(Math.sqrt(x2 + y2));
  return distance;
};
/**
 * 判断点是否在圆内
 * @param origin Point 圆心坐标
 * @param r number 圆的半径
 * @param target 待检测坐标点
 * @return boolean
 */
export const isInCircle = (origin: Point, r: number, target: Point) => {
  return getDistance(origin, target) < r;
};
/**
 * 获取图像适应容器的缩放大小
 * @param img HTMLImageElement 图片节点对象
 * @param options {width: number, height: number} 容器宽高
 * @reutrn scale number 适应容器的缩放大小
 */
export const getAdaptImgScale = (
  img: HTMLImageElement,
  options: { width: number; height: number }
) => {
  const { width, height } = img;
  let scale = 1;
  // 初始化图片缩放
  if (options.width < width || options.height < height) {
    if (width > height) {
      // 长大于高
      scale = options.width / width;
    } else {
      // 高大于长
      scale = options.height / height;
    }
  }
  return scale;
};
/**
 * 颜色值 16 进制转 rgba
 * @param {String} hex 16 进制
 * @param {Float} opacity 透明度 (16 进制有效)
 */
export const hexToRgba = (hex: string, opacity = 1) => {
  const start = hex.slice(0, 1);
  if (start === "#") {
    let hexNumbs = hex.slice(1).split("");
    if (hexNumbs.length === 3) {
      hexNumbs = hexNumbs.map((v) => v + v);
    } else if (hexNumbs.length === 6) {
      hexNumbs = hexNumbs
        .reduce<string[]>((arr, item, index) => {
          if (index % 2 === 0) {
            arr.unshift(item);
          } else {
            arr[0] = arr[0] + item;
          }
          return arr;
        }, [])
        .reverse();
    } else {
      throw "请输入正确的 16 进制颜色";
    }
    return `rgba(${hexNumbs
      .map((v) => Number.parseInt(v, 16))
      .join(",")}, ${opacity})`;
  } else {
    return hex;
  }
};

export const dataURIToBlob = (dataURI: string) => {
  const binStr = atob(dataURI.split(",")[1]),
    len = binStr.length,
    arr = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }

  return new Blob([arr]);
};
