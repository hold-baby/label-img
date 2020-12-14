import { Point, Points } from "./structure"

export const isInSide = (point: Point, vs: Point[]) => {
  const [x, y] = point
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0], yi = vs[i][1];
      const xj = vs[j][0], yj = vs[j][1];
      
      const intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  return inside
}
export const getRectPoints = (start: Point, end: Point) => {
  const p0 = start
  const p1: Point = [end[0], start[1]]
  const p2 = end
  const p3: Point = [start[0], end[1]]

  const ps: Points = [p0, p1, p2, p3]
  return ps
}

export const getDistance = (p1: Point, p2: Point) => {
  const x = p2[0] - p1[0]
  const y = p2[1] - p1[1]
  const x2 = Math.pow(x, 2)
  const y2 = Math.pow(y, 2)
  const cr = Math.abs(Math.sqrt(x2 + y2))
  return cr
}
// 判断是否在圆内
export const isInCircle = (p1: Point, p2: Point, r: number) => {
  return getDistance(p1, p2) < r
}