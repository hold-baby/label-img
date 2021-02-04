const ele = $("#container")
const btn = {
  polygon: $("#polygon"),
  rect: $("#rect"),
  cancel: $("#cancel"),
  guide: $("#guide"),
  tag: $("#tag"),
  resize: $("#resize"),
  data: $("#data"),
  addr: $("#addr"),
  load: $("#load"),
  source: $("#source"),
}
const dom = {
  list: $("#list"),
  file: $("#file"),
  addr: $("#addr"),
  continuity: $("#continuity")
}

const lb = new LabelImg(ele[0])
const emitter = lb.emitter
emitter.on("select", (s) => {
  const list = lb.getShapeList()
  const target = lb.findShapeIndex(s)
  renderList(list, target[0])
})
emitter.on("create", () => {
  const list = lb.getShapeList()
  renderList(list)
})
const Shape = LabelImg.Shape

lb.register("polygon", {
  type: "Polygon",
  style: {
    normal: {
      lineColor: "black",
      opacity: .2
    }
  },
  tag: "多边形",
})
lb.register("rect", {
  type: "Rect"
})
lb.register("black-dog", {
  type: "Rect",
  tag: "black dog"
})
lb.register("dog-ear", {
  type: "Polygon",
  tag: "狗耳朵",
  style: {
    normal: {
      lineColor: "aqua",
      fillColor: "blueviolet",
      dotColor: "burlywood"
    }
  }
})
dom.file.on("change", (e) => {
  const file = e.target.files[0]
  lb.load(file)
})
dom.continuity.on("change", (e) => {
  const continuity = e.target.checked
  lb.setContinuity(continuity)
})
btn.load.on("click", () => {
  const url = dom.addr.val()
  if(!url) return
  lb.load(url)
})
const blackDogs = [
  [[620,244],[799,244],[799,441],[620,441]],
  [[265,26],[420,26],[420,436],[265,436]]
]
const dogEar = [
  [[559,116],[554,125],[547,135],[542,151],[532,166],[535,180],[539,189],[546,189],[558,183],[566,175],[574,170],[579,166],[582,159],[581,152],[576,146],[570,134],[567,126],[563,118]]
]
btn.source.on("click", () => {
  lb.load("./dog.jpg").then(() => {
    blackDogs.forEach((positions) => {
      const shape = lb.createShape("black-dog", {
        positions
      })
      lb.addShape(shape)
    })
    dogEar.forEach((positions) => {
      const shape = lb.createShape("dog-ear", {
        positions
      })
      lb.addShape(shape)
    })
    const list = lb.getShapeList()
    console.log(list)
    renderList(list)
  })
})
btn.polygon.on("click", () => {
  lb.label("polygon")
})
btn.rect.on("click", () => {
  lb.label("rect")
})
btn.cancel.on("click", () => {
  lb.labelOff()
})
btn.guide.on("click", () => {
  lb.setGuideLine()
})
btn.tag.on("click", () => {
  lb.setTagShow(!lb.isTagShow())
})
btn.resize.on("click", () => {
  lb.resize()
})
btn.data.on("click", () => {
  const list = lb.getShapeList().map(({ id, tag, positions }) => {
    return {
      id: id,
      tag: tag,
      positions: positions
    }
  })
  console.log(list);
  alert(JSON.stringify(list))
})
const className = {
  item: "shape-item",
  rm: "rm",
  disable: "disable",
  normal: "normal",
  tag: "tag",
  hidden: "hidden",
  show: "show"
}
dom.list.on("click", (e) => {
  const tartget = $(e.target)
  const item = tartget.hasClass(className.item) ? tartget : tartget.parents(`.${className.item}`)
  if(!item.length) return
  const idx = item.data("index")
  const shape = lb.getShapeList()[idx]
  if(tartget.hasClass(className.rm)){
    lb.remove(shape)
  }
  if(tartget.hasClass(className.disable)){
    shape.disabled()
  }
  if(tartget.hasClass(className.normal)){
    shape.normal()
  }
  if(tartget.hasClass(className.tag)){
    shape.tagShow()
  }
  if(tartget.hasClass(className.hidden)){
    shape.hidden()
  }
  if(tartget.hasClass(className.show)){
    shape.show()
  }
  const list = lb.getShapeList()
  renderList(list, idx)
  lb.render()
})
console.log(lb)
function renderCtrl(shape){
  const statusBtn = shape.isDisabled() ? "normal" : "disable"
  const hiddenBtn = shape.isHidden() ? "show" : "hidden"
  return (
    `<div class="ctrl">
      <button class="${hiddenBtn}">${hiddenBtn}</button>
      <button class="${statusBtn}">${statusBtn}</button>
      <button class="rm">delete</button>
      <button class="tag">tag</button>
    </div>`
  )
}
function renderDetail(shape){
  return (
    `<div class="detail">
      <div>type: ${shape.type}</div>
      <div>point count: ${shape.positions.length}</div>
      <div>status: ${shape.isDisabled() ? "disable" : shape.isActive() ? "active" : "normal"}</div>
    </div>`
  )
}
function renderList(shapes, index){
  const html = shapes.map((shape, idx) => (
    `<div class="shape-item ${index === idx ? "shape-active" : ""}" data-index="${idx}">
      <div class="name">
        ${shape.registerID}-${shape.id}
      </div>
      ${renderCtrl(shape)}
      ${renderDetail(shape)}
    </div>`
  )).join("")
  dom.list.html(html)
}