import React, { useEffect, useRef } from "react"
import { render } from "react-dom"
import LabelImg from "src/main"
import { LabelImgProvider, useLabelImg } from "./label-img-provider"
import Control from "./control"
import { StoreProvider } from "./store-provider"
import Listener from "./listener"
import "./app.less"

const CreateInstance = () => {
  const [lb, setLb] = useLabelImg()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lb = new LabelImg(ref.current as HTMLDivElement, {})
    setLb(lb)
  }, [])

  return (
    <div ref={ref}></div>
  )
}

const Main = () => {

  return (
    <StoreProvider>
      <LabelImgProvider>
        <div className="pw">
          <div className="container">
            <CreateInstance />
            <Control />
            <Listener />
          </div>
        </div>
      </LabelImgProvider>
    </StoreProvider>
  )
}

render(<Main />, document.getElementById("app"))
