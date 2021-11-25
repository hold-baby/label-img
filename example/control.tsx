import React, { useState, useRef } from "react"
import { Button, Tag, Switch, Modal, Image, Row, Col, Divider, Tabs } from "antd"
import SourceModal from "./source-modal"

import { useLabelImg } from "./label-img-provider"
import { dataURIToBlob } from "../src/utils"
import { useStore } from "./store-provider"
import { Shape } from "../src/Shape"
import EntityModal from "./entity-modal"
import "./control.less"

const { TabPane } = Tabs

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
  const [isCreate, setIsCreate] = useState(false)
  const [base64, setBase64] = useState("")

  const render = () => {
    const list = lb?.getShapeList()
    if(!list) return
    setStore({
      list
    })
    lb?.render()
  }
  
  const cb = (v: any) => {
    if(!lb) return
    const { id, ...options } = v
    lb.register(id, options)
    const labelTypes = lb.getLabels()
    setStore({
      labelTypes
    })
    setIsCreate(false)
  }

  return (
    <div className="control">
      <Divider></Divider>
      <Row justify="space-between" align="middle">
        <Col className="gutter-row" span={8}>
          <a href="https://github.com/hold-baby/label-img">
            go to github
          </a>
        </Col>
        <Col span={8}>
          <Button onClick={() => {
            setIsCreate(true)
          }}>
            新建实体类型
          </Button>
        </Col>
        <EntityModal visible={isCreate} onCancel={() => {
          setIsCreate(false)
        }} cb={cb} />
      </Row>
      <Divider orientation="left">实体类型列表</Divider>
      <Row justify="start">
        {labelTypes.map(({ key, name }) => {
          return (
            <Col style={{
              marginRight: 8
            }}>
              <Button key={key} size="small" onClick={() => {
                lb?.label(key)
              }}>
                {name}
              </Button>
            </Col>
          )
        })}
      </Row>
      <Divider orientation="left">控制</Divider>
      <div className="continuity">
        <Switch onChange={(continuity) => {
          setContinuity(continuity)
          lb?.setContinuity(continuity)
        }} />
        {continuity ? '连续标注': '单次标注'}
      </div>
      <Row justify="start" align="middle">
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
          }} cancelText="关闭" onOk={() => {
            const blob = dataURIToBlob(base64)
            const a = document.createElement("a")
            a.download = 'labelImage.jpg'
            a.href = URL.createObjectURL(blob)
            a.click()
          }} okText="下载">
            <Image src={base64} preview={false} />
          </Modal>
      </Row>
      <Divider orientation="left">实体列表</Divider>
      <Tabs type="card">
        <TabPane tab="全部" key="all">
          <div className="shape-list">
            {list.map((shape) => {
              return (
                <ShapeItem shape={shape} render={render} key={shape.id} />
              )
            })}
          </div>
        </TabPane>
        {labelTypes.map(({ key, name }) => {
          return (
            <TabPane tab={name} key={key}>
              <div className="shape-list">
                {list.filter(({ registerID }) => registerID === key ).map((shape) => {
                  return (
                    <ShapeItem shape={shape} render={render} key={shape.id} />
                  )
                })}
              </div>
            </TabPane>
          )
        })}
      </Tabs>
      <SourceModal />
    </div>
  )
}

export default Control
