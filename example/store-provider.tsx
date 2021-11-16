import { createContext, useContext, FC, useState } from "react"
import { Shape } from "src/Shape"

interface IStore {
  list: Shape[]
  labelTypes: any[]
}

const initStore: IStore = {
  list: [],
  labelTypes: []
}

const StoreCtx = createContext([initStore, (store: Partial<IStore>) => {}] as const)

export const useStore = () => useContext(StoreCtx)

export const StoreProvider: FC = ({ children }) => {
  const [store, setStore] = useState(initStore)

  const update = (newStore: Partial<IStore>) => {
    setStore(data => Object.assign({}, data, newStore))
  }

  return (
    <StoreCtx.Provider value={[store, update]}>
      {children}
    </StoreCtx.Provider>
  )
}
