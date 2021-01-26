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
export class EventHook {
  private getEvents: (name: string) => IEvent[]
  private createEvent: (name: string, event: IEvent) => void;
  constructor(){
    const eventMap: Dictionary<IEvent[]> = {}
    this.getEvents = (name) => {
      return eventMap[name]
    }
    this.createEvent = (name, { type, fn }: IEvent) => {
      if(!eventMap[name]){
        eventMap[name] = []
      };
      (eventMap[name] as IEvent[]).push({
        fn,
        type
      })
    }
  }
  emit(name: TEventHooks | string, data?: any){
    const fns = this.getEvents(name)
    if(!fns) return
    fns.forEach(({ fn, type }, idx) => {
      fn(data)
      if(type === "once"){
        fns.splice(idx, 1)
      }
    })
  }
  on(name: TEventHooks, cb: Fn){
    this.createEvent(name, {
      fn: cb,
      type: "on"
    })
    return () => {
      const events = this.getEvents(name)
      const idx = events.findIndex(({ fn }) => fn === cb)
      idx && events && events.splice(idx, 1)
    }
  }
  once(name: TEventHooks, cb: Fn){
    this.createEvent(name, {
      fn: cb,
      type: "once"
    })
  }
}