import { Shape } from "./Shape"
import { Dictionary } from "lodash"
enum EventHooks {
  "select" = "select",
  "create" = "create",
  "update" = "update",
  "labelType" = "labelType"
}
enum EventHookTypes {
  "on" = "on",
  "once" = "once"
}
type TEventHooks = keyof typeof EventHooks
type IEventHookTypes = keyof typeof EventHookTypes
type Fn = (shape?: Shape) => void
type IEvent = {
  type: IEventHookTypes;
  fn: Fn;
}
type TEventMap = {
  [key in TEventHooks]?: IEvent[]
}
const eventMap: Dictionary<IEvent[]> = {}
export class EventHook {
  constructor(){
  }
  trigger(name: TEventHooks | string, shape?: Shape){
    const fns = eventMap[name]
    if(!fns) return
    fns.forEach(({ fn, type }, idx) => {
      fn(shape)
      if(type === "once"){
        fns.splice(idx, 1)
      }
    })
  }
  on(name: TEventHooks | string, cb: Fn){
    if(!eventMap[name]){
      eventMap[name] = []
    };
    (eventMap[name] as IEvent[]).push({
      fn: cb,
      type: "on"
    })
    return () => {
      const idx = eventMap[name]?.findIndex(({ fn }) => fn === cb)
      idx && eventMap[name] && (eventMap[name] as IEvent[]).splice(idx, 1)
    }
  }
  once(name: TEventHooks | string, cb: Fn){
    if(!eventMap[name]){
      eventMap[name] = []
    };
    (eventMap[name] as IEvent[]).push({
      fn: cb,
      type: "once"
    })
  }
  config(options: TEventMap){
    Object.assign(eventMap, options)
  }
}