import { getDistance } from "../../src/utils"
import { Point } from "../../src/structure"

describe("getDistance", () => {
  const p1: Point = [0, 0]
  const p2: Point = [3, 0]
  const p3: Point = [3, 4]

  it("p1到p2的距离是3", () => {
    expect(getDistance(p1, p2)).toBe(3)
  })
  it("p1到p3的距离是3", () => {
    expect(getDistance(p1, p3)).toBe(5)
  })
  it("p2到p3的距离是3", () => {
    expect(getDistance(p2, p3)).toBe(4)
  })
})
