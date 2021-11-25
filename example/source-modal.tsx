import React, { useEffect, useState } from "react"
import { Modal, Divider, Button, Input, Upload } from "antd"
import { useLabelImg } from "./label-img-provider"
import { useStore } from "./store-provider"
import { Points } from "src/structure"

const blackDogs = [
  [[620,244],[799,244],[799,441],[620,441]],
  [[265,26],[420,26],[420,436],[265,436]]
] as Points[]
const dogEar = [
  [[559,116],[554,125],[547,135],[542,151],[532,166],[535,180],[539,189],[546,189],[558,183],[566,175],[574,170],[579,166],[582,159],[581,152],[576,146],[570,134],[567,126],[563,118]]
] as Points[]

const SourceModal = () => {
  const [visible, setVisible] = useState(true)
  const [url, setUrl] = useState("")
  const [lb] = useLabelImg()
  const [_, setStore] = useStore()

  useEffect(() => {
    if(!lb) return
    lb.register("polygon", {
      type: "Polygon",
      style: {
        normal: {
          lineColor: "black",
          opacity: .05
        }
      },
      tag: "多边形",
    })
    lb.register("rect", {
      type: "Rect",
      tag: "矩形"
    })
  }, [lb])

  const close = () => {
    if(!lb) return
    const list = lb.getShapeList()
    const labelTypes = lb.getLabels()
    setStore({
      list,
      labelTypes
    })
    setVisible(false)
  }

  const loadData = () => {
    if(!lb) return
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
      close()
    })
  }

  const lodaByUrl = () => {
    if(!url || !lb) return
    lb.load(url).then(() => {
      close()
    })
  }
  
  return (
    <Modal 
      title="选择数据源"
      visible={visible}
      footer={false}
      closable={false}
      centered
    >
      <div>
        <Upload accept="image/*" style={{
          width: "100%"
        }} className="w-full block"
          onChange={({ file }) => {
            lb?.load(file.originFileObj as any)
            close()
          }}
          action={""}
        >
          <Button type="primary" block>上传本地图片</Button>
        </Upload>
      </div>
      <Divider />
      <div>
        <Input value={url} onChange={(e) => {
          setUrl(e.target.value)
        }} style={{
          marginBottom: 8
        }} placeholder="请输入图片地址" />
        <Button type="primary" block onClick={lodaByUrl}>加载线上图片</Button>
      </div>
      <Divider />
      <div>
        <Button type="primary" block onClick={loadData} >
          加载示例数据
        </Button>
      </div>
    </Modal>
  )
}

export default SourceModal
