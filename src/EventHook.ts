import { Shape } from "./Shape"
enum EventHooks {
  "select" = "select",
  "create" = "create",
  "update" = "update",
  "labelType" = "labelType",
  "initData" = "initData"
}
type TEventHooks = keyof typeof EventHooks
type Fn = (shape?: Shape) => void
type TEventMap = {
  [key in EventHooks]?: Fn[]
}
export class EventHook {
  private eventMap: TEventMap
  constructor(){
    this.eventMap = {}
  }
  trigger(name: TEventHooks, shape?: Shape){
    const fns = this.eventMap[name]
    if(!fns) return
    fns.forEach((fn) => {
      fn(shape)
    })
  }
  on(name: TEventHooks, cb: Fn){
    if(!this.eventMap[name]){
      this.eventMap[name] = []
    };
    (this.eventMap[name] as Fn[]).push(cb)
    return () => {
      const idx = this.eventMap[name]?.findIndex((fn) => fn === cb)
      idx && this.eventMap[name] && (this.eventMap[name] as Fn[]).splice(idx, 1)
    }
  }
  config(options: TEventMap){
    this.eventMap = Object.assign(this.eventMap, options)
  }
}