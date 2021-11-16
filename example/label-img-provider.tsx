import { createContext, useContext, FC, useState, useEffect } from "react"
import LabelImg from "../src/main";

const LabelImgCtx = createContext([null, (lb: LabelImg) => {}] as [null | LabelImg, (lb: LabelImg) => void])

export const useLabelImg = () => useContext(LabelImgCtx)

export const LabelImgProvider: FC = ({ children }) => {
  const [lb, setLb] = useState<LabelImg | null>(null)

  return (
    <LabelImgCtx.Provider value={[lb, setLb]}>
      {children}
    </LabelImgCtx.Provider>
  )
}
