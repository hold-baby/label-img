import React, { useState, useRef } from "react"
import { Button, Tag, Switch, Modal, Image } from "antd"
import SourceModal from "./source-modal"

import { useLabelImg } from "./label-img-provider"
import { useStore } from "./store-provider"
import { Shape } from "../src/Shape"
import "./control.less"

const ShapeItem = ({ shape, render }: { shape: Shape; render: Function }) => {
  const { registerID, id, type } = shape
  const [lb] = useLabelImg()

  const isHidden = shape.isHidden()
  const isDisabled = shape.isDisabled()

  return (
    <div className="shape-item">
      <div>
        {`${registerID}-${id}`}
      </div>
      <div className="shape-ctrl">
        <Button size="small" onClick={() => {
          if(isHidden){
            shape.show()
          }else{
            shape.hidden()
          }
          render()
        }}>
          {isHidden ? '显示' : '隐藏'}
        </Button>
        <Button size="small" onClick={() => {
          if(isDisabled){
            shape.normal()
          }else{
            shape.disabled()
          }
          render()

        }}>
          {isDisabled ? '正常' : '禁用'}
        </Button>
        <Button size="small" danger onClick={() => {
          lb?.remove(shape)
          render()

        }}>
          删除
        </Button>
        <Button size="small" onClick={() => {
          shape.tagShow()
          render()
        }}>
          标签
        </Button>
      </div>
      <div>
        <Tag color="blue">
          {type}
        </Tag>
      </div>
    </div>
  )
}

const Control = () => {
  const [lb] = useLabelImg()
  const [{ list, labelTypes }, setStore] = useStore()
  const [continuity, setContinuity] = useState(false)
  const imgRef = useRef("")
  const [base64, setBase64] = useState("")

  const render = () => {
    const list = lb?.getShapeList()
    if(!list) return
    setStore({
      list
    })
    lb?.render()
  }
  

  return (
    <div className="control">
      <div className="link">
        <a href="https://github.com/hold-baby/label-img">
          go to github
        </a>
      </div>
      <div>
        {labelTypes.map(({ key, name }) => {
          return (
            <Button key={key} size="small" onClick={() => {
              lb?.label(key)
            }}>
              {name}
            </Button>
          )
        })}
        <div className="continuity">
          <Switch onChange={(continuity) => {
            setContinuity(continuity)
            lb?.setContinuity(continuity)
          }} />
          {continuity ? '连续标注': '单次标注'}
        </div>
      </div>
      <div className="global-ctrl">
          <Button size="small" onClick={() => {
            lb?.setTagShow(!lb.isTagShow())
          }}>
            显示/隐藏标签
          </Button>
          <Button size="small" onClick={() => {
            lb?.getShapeList().forEach((shape) => {
              shape.isHidden() ? shape.show() : shape.hidden()
            })
            lb?.render()
          }}>
            显示/隐藏图形
          </Button>
          <Button size="small" onClick={() => {
            lb?.resize()
          }}>
            重置大小
          </Button>
          <Button size="small" onClick={() => {
            lb?.setGuideLine()
          }}>
            辅助线
          </Button>
          <Button size="small" onClick={() => {
            const list = lb?.getShapeList().map(({ id, tagContent, positions }) => {
              return {
                id,
                tag: tagContent,
                positions
              }
            })
            console.log(list);
            alert(JSON.stringify(list))
          }}>
            获取数据
          </Button>
          <Button size="small" onClick={() => {
            const base64 = lb?.toDataURL()
            if(!base64) return
            setBase64(base64)
          }}>
            导出图片
          </Button>
          <Modal visible={!!base64} onCancel={() => {
            setBase64("")
          }}>
            <Image src={base64} />
          </Modal>
      </div>
      <div className="shape-list">
        {list.map((shape) => {
          return (
            <ShapeItem shape={shape} render={render} key={shape.id} />
          )
        })}
      </div>
      <SourceModal />
    </div>
  )
}

export default Control
