import { Point, Points } from "../types";
export const fillRect = (
  ctx: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  style: any
) => {
  const { fillStyle } = style;
  ctx.beginPath();
  ctx.fillStyle = fillStyle || "#000";
  ctx.fillRect(...start, ...end);
  ctx.closePath();
};

export const renderBackground = (
  ctx: CanvasRenderingContext2D,
  size: Point,
  backgroundColor: string
) => {
  fillRect(ctx, [0, 0], size, {
    fillStyle: backgroundColor,
  });
};

export const renderImage = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  origin: Point,
  size: Point
) => {
  ctx.drawImage(img, ...origin, ...size);
};

export const renderRectShape = (ctx: CanvasRenderingContext2D) => {};

export const fixRectPoint2RenderPoints = (points: Points) => {
  const [p1, p3] = points;
  const p2 = [p3[0], p1[1]];
  const p4 = [p1[0], p3[1]];
  return [p1, p2, p3, p4];
};
