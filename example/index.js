const ele = $("#container")
const btn = {
  polygon: $("#polygon"),
  rect: $("#rect"),
  cancel: $("#cancel"),
  guide: $("#guide"),
  tag: $("#tag"),
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

const labeler = new LabelImg(ele[0])
const hook = labeler.eventHook
hook.on("select", (s) => {
  const list = labeler.getShapeList()
  const target = labeler.findShapeIndex(s)
  renderList(list, target[0])
})
hook.on("create", () => {
  const list = labeler.getShapeList()
  renderList(list)
})
const Shape = LabelImg.Shape

labeler.register("polygon", {
  type: "Polygon",
  style: {
    normal: {
      lineColor: "black"
    }
  },
  tag: "多边形",
})
labeler.register("rect", {
  type: "Rect"
})
labeler.register("black-dog", {
  type: "Rect",
  tag: "black dog"
})
dom.file.on("change", (e) => {
  const file = e.target.files[0]
  labeler.load(file)
})
dom.continuity.on("change", (e) => {
  const continuity = e.target.checked
  labeler.setContinuity(continuity)
})
btn.load.on("click", () => {
  const url = dom.addr.val()
  if(!url) return
  labeler.load(url)
})
const blackDogs = [
  [[620,244],[799,244],[799,441],[620,441]],
  [[265,26],[420,26],[420,436],[265,436]]
]
btn.source.on("click", () => {
  labeler.load("./dog.jpg").then(() => {
    blackDogs.forEach((positions) => {
      const shape = labeler.createShape("black-dog", {
        positions
      })
      labeler.addShape(shape)
    })
    renderList(labeler.getShapeList())
  })
})
btn.polygon.on("click", () => {
  labeler.label("polygon")
})
btn.rect.on("click", () => {
  labeler.label("rect")
})
btn.cancel.on("click", () => {
  labeler.cancel()
})
btn.guide.on("click", () => {
  labeler.guideLine()
})
btn.tag.on("click", () => {
  labeler.tagShow()
})
btn.data.on("click", () => {
  const list = labeler.getShapeList()
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
  const shape = labeler.getShapeList()[idx]
  if(tartget.hasClass(className.rm)){
    labeler.remove(shape)
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
  const list = labeler.getShapeList()
  renderList(list, idx)
  labeler.render()
})

console.log(labeler)

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
        ${shape.name}-${shape.id}
      </div>
      ${renderCtrl(shape)}
      ${renderDetail(shape)}
    </div>`
  )).join("")
  dom.list.html(html)
}