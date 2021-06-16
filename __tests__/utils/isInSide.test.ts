import { isInSide } from "../../src/utils"
import { Point, Points } from "../../src/structure"

describe("isInSide", () => {
  const points: Points = [
    [0, 0], [100, 0], [100, 100], [0, 100]
  ]
  const pointIn: Point = [50, 50]
  const pointOut: Point = [50, 150]
  const pointOnline: Point = [100, 100]
  const pointOnMidLine: Point = [50, 100]
  it("point应该在points里面", () => {
    expect(isInSide(pointIn, points)).toBe(true)
  })
  it("pointOut不应该在points里面", () => {
    expect(isInSide(pointOut, points)).toBe(false)
  })
  it("pointOnline不应该在points里面", () => {
    expect(isInSide(pointOnline, points)).toBe(false)
  })
  it("pointOnMidLine不应该在points里面", () => {
    expect(isInSide(pointOnMidLine, points)).toBe(false)
  })
})
