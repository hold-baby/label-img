import React, { useEffect, useRef } from "react"
import LabelImg from "../src/main"
import { useLabelImg } from "./label-img-provider"

export const CreateInstance = () => {
  const [_, setLb] = useLabelImg()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lb = new LabelImg(ref.current as HTMLDivElement, {})
    setLb(lb)
  }, [])

  return (
    <div ref={ref}></div>
  )
}
