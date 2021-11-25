import React from 'react'
import { Form, Input, Radio, Modal, ModalProps, Button, Collapse, Slider, Tabs, Row } from "antd"
import { ShapeType, ShapeStatus } from "../src/Shape"
import ColorPicker from "./color-picker"

const { Item } = Form
const { Group } = Radio
const { Panel } = Collapse
const { TabPane } = Tabs

const displayStyleStatus = (status: ShapeStatus) => {
  return {
    [ShapeStatus.normal]: '常规',
    [ShapeStatus.active]: '高亮',
    [ShapeStatus.disabled]: '禁用',
  }[status]
}

const EntityModal = ({
  cb,
  ...props
} : Pick<ModalProps, "visible" | "onCancel"> & {
  cb: (v: any) => void;
}) => {

  return (
      <Modal 
        title="新建实体类型"
        closable={false}
        centered
        footer={false}
        {...props}
      >
        <Form onFinish={(values) => {
          const { id, tag, type, ...other } = values
          const style: Record<string, any> = {}
          Object.keys(other).forEach((key) => {
            if(/\-/.test(key)){
              const [status, property] = key.split('-')
              if(!style[status]){
                style[status] = {}
              }
              style[status][property] = other[key]
            }
          })
          cb({
            id, tag, type,
            style
          })
        }}>
          <Item label="实体 ID" name="id" required rules={[{ required: true, message: "请输入「实体 ID」" }]}>
            <Input />
          </Item>
          <Item label="实体标签名称" name="tag" required rules={[{ required: true, message: "请输入「实体标签名称」" }]}>
            <Input />
          </Item>
          <Item label="标注类型" name="type" required rules={[{ required: true, message: "请选择「标注类型」" }]}>
            <Group>
              <Radio value={ShapeType.Rect} >矩形</Radio>
              <Radio value={ShapeType.Polygon} >多边形</Radio>
            </Group>
          </Item>
          <Tabs type="card">
            {Object.keys(ShapeStatus).map((status) => (
              <TabPane tab={`${displayStyleStatus(status as ShapeStatus)}样式`} key={status} >
                <Item label="标注点颜色" name={`${status}-dotColor`}>
                  <ColorPicker />
                </Item>
                <Item label="标注点大小" name={`${status}-dotRadius`}>
                  <Slider min={1} max={5} />
                </Item>
                <Item label="线框颜色" name={`${status}-lineColor`}>
                  <ColorPicker />
                </Item>
                <Item label="线框大小" name={`${status}-lineWidth`}>
                  <Slider min={1} max={5} />
                </Item>
                <Item label="填充颜色" name={`${status}-fillColor`}>
                  <ColorPicker />
                </Item>
                <Item label="透明度" name={`${status}-opacity`}>
                  <Slider min={0} max={1} step={0.1} />
                </Item>
              </TabPane>
            ))}
          </Tabs>
          <Row justify="center" align="middle">
            <Button type="primary" htmlType="submit" style={{
              width: 200
            }}>
              确认
            </Button>
          </Row>
        </Form>
      </Modal>
  )
}

export default EntityModal
