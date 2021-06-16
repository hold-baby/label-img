import { hexToRgba } from "../../src/utils"

describe("hex to rgba", () => {
  it("16进制转rgba", () => {
    expect(hexToRgba("#cc3300")).toBe("rgba(204,51,0, 1)")
  })

  it("简写16进制转rgba", () => {
    expect(hexToRgba("#c30")).toBe("rgba(204,51,0, 1)")
  })

  it("0.5的透明度", () => {
    expect(hexToRgba("#cc3300", .5)).toBe("rgba(204,51,0, 0.5)")
  })

  it("错误的16进制颜色", () => {
    expect(() => {
      hexToRgba("#c0")
    }).toThrowError("输入正确的16进制颜色")
  })

  it("颜色别名返回原值", () => {
    expect(hexToRgba("red")).toBe("red")
  })
})
