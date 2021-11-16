import React, { useEffect } from "react"
import { useLabelImg } from "./label-img-provider"
import { useStore } from "./store-provider"


const Listener = () => {
  const [lb] = useLabelImg()
  const [_, setStore] = useStore()

  useEffect(() => {
    if(!lb) return
    lb.emitter.on("create", () => {
      const list = lb.getShapeList()
      setStore({
        list
      })
    })
  },[lb])

  return null
}

export default Listener
