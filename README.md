# 图片标注工具

image annotation tool with javascript

> 本工具专注图形标注，不局限某种方式与格式，只输出关键点位信息，不与业务逻辑耦合，并提供方法自定义展示方式与实体属性填写的实现（持续开发当中，文档更新可能滞后，请使用固定版本）

### 示例

[demo for react](https://hold-baby.github.io/label-img/)

### 安装

```
npm install label-img
```

or

```html
<script src="./labelImg.js"></script>
```

### 使用

```javascript
/**
 * 生成实例
 * @element   挂载节点
 * @options   配置 非必填
 */
const labeler = new LabelImg(element, {
  width: 800,
  height: 600,
  bgColor: `#000`, // 背景色
  imagePlacement: "default", // default | center
});
// 注册图形
labeler.register("polygon", {
  type: "Polygon",
  tag: "多边形",
});
// 加载图片
labeler.load(url);
// 选择标注多边形
labeler.label("polygon");
```

### 图形

```js
const { Shape } from "label-img"
// or
const Shape = LabelImg.Shape

// IShapeOptions
const shapeOptions = {
  id, // 图形唯一 id 可自动生成
  type, // 图形类型 必填 Polygon | Rect
  name, // 图形名称
  positions, // 坐标集合 ex: [[0, 0], [100, 100]]
  data, // 自定义数据 可用于存储实体属性等内容
  tag, // 展示在图形上的说明标签
  showTag, // 是否展示标签
  closed, // 是否闭合
  visible, // 是否可见
  active, // 是否被选中
  disabled, // 是否禁用
  /**
   * { normal, active, disabled }
   * {
   *  normal: {
   *    dotColor: "red", // 坐标点颜色
   *    dotRadius: 3, // 坐标点大小
   *    lineColor: "#c30", // 连线颜色
   *    lineWidth: 2, // 连线宽度
   *    fillColor: "pink", // 填充色
   *  }
   * }
   */
  style, // 图形样式
}
const shape = new Shape(shapeOptions)
// or
/**
 * @id      图形注册 ID
 * @options 配置  Partial<Omit<IShapeOptions, "type">>
 */
const shape = LabelImg.createShape(id, options)
// 添加到画布中
labeler.addShape(shape)
```

### 注册图形

```js
/**
 * @id        图形 ID   Polygon: 多边形，Rect: 矩形
 * @options   图形配置  Omit<IShapeCfg, "registerID">
 */
labeler.register(id, options);
```

### 加载图片

```js
/**
 * @param   url || file
 * return   Promise
 */
labeler.load(param);
```

### labeler API

```js
isRegister(id)  // 判断是否注册
label(id, continuity)  // 选择标注类型
labelOff()  // 取消当前标注
addShape(shape, index)  // 添加图形
remove(shape || id)  // 删除图形
setActive(shape)  // 选中某一图形
getShapeList()  // 获取图形列表
setGuideLine(status?: boolean)  // 是否启用参照线
setTagShow(status?: boolean)  // 是否启用标签
isTagShow()  // 获取是否启用标签
toDataURL()  // 导出标注图片的 base64 格式
setContinuity(status: boolean)  // 设置是否连续标注
render()  // 渲染画面
forceRender()  // 强制渲染
```

### Shape API

```js
getPositions()  // 获取坐标点集合
updatePositions(positions) // 更新坐标信息
setActive(status) // 设置选中
isActive()  // 是否被选中
close()  // 图形闭合
isClose()  // 是否闭合
disabled() //禁用
isDisabled()  // 是否禁用
hidden()  // 隐藏
isHidden()  // 是否隐藏
show()  // 显示
isShowTag()  // 是否展示标签
tagShow(status?: boolean) // 控制标签展示
setTag(val)  // 标签内容
```
