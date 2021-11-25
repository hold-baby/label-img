import React from "react"
import { render } from "react-dom"
import { LabelImgProvider } from "./label-img-provider"
import Control from "./control"
import { StoreProvider } from "./store-provider"
import Listener from "./listener"
import { CreateInstance } from "./instance"
import { Row } from "antd"
import "./app.less"

const Main = () => {

  return (
    <StoreProvider>
      <LabelImgProvider>
        <div className="pw">
          <Row justify="center">
            <CreateInstance />
            <Control />
            <Listener />
          </Row>
        </div>
      </LabelImgProvider>
    </StoreProvider>
  )
}

render(<Main />, document.getElementById("app"))
