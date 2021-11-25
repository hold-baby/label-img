import React, { useState } from 'react'
import { Modal, Button, Input } from "antd"
import { HexColorPicker } from "react-colorful"

const ColorPicker = ({ value, onChange }: {
  value?: string;
  onChange?: (v: string) => void
}) => {
  const [visible, setVisible] = useState(false)
  const [color, setColor] = useState(value || '')

  return (
    <div>
      <Button onClick={() => {
        setVisible(true)
      }}>
        <span style={{
          color
        }}>
          {color || '选择颜色'}
        </span>
      </Button>
      <Modal visible={visible} onCancel={() => {
        setVisible(false)
      }} onOk={() => {
        onChange && onChange(color)
        setVisible(false)
      }}>
        <HexColorPicker color={color} onChange={(color) => {
          setColor(color)
        }} />
        <Input value={color} onChange={(e) => {
          const value = e.target.value
          setColor(value)
        }} />
      </Modal>
    </div>
  )
}

export default ColorPicker
