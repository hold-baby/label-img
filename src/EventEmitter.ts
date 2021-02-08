import { Shape } from "./Shape"

type ShapeEvent = (shape: Shape) => void; // 特定shape事件
type NotifyEvent = (props: any) => void; // 通知事件
type EmitEventFn = ShapeEvent | NotifyEvent

// 内置事件
interface EmitEventMap {
  "select": ShapeEvent; // shape被选中
  "create": ShapeEvent; // shape创建
  "update": NotifyEvent; // 更新
  "labelType": NotifyEvent; // 标注类型修改
  "init": NotifyEvent; // 初始化
  "imageReady": NotifyEvent; // 图片加载成功
}
type EmitEventKey = keyof EmitEventMap

enum MethodTypes {
  "on" = "on",
  "once" = "once"
}
type IMethodTypes = keyof typeof MethodTypes
type IEvent<K extends keyof EmitEventMap> = {
  type: IMethodTypes;
  fn: EmitEventMap[K];
}
type IEventMap = {
  [K in keyof EmitEventMap]: IEvent<K>[]
}
/**
 * 事件监听器
 */
export class EventEmitter {
  private getEvents: (type: EmitEventKey) => IEvent<EmitEventKey>[]
  private createEvent: (type: EmitEventKey, event: IEvent<EmitEventKey>) => void;
  constructor(){
    const eventMap = {} as IEventMap
    this.getEvents = (type) => {
      return eventMap[type] || []
    }
    this.createEvent = (type, event) => {
      if(!eventMap[type]){
        eventMap[type] = []
      };
      (eventMap[type] as IEvent<EmitEventKey>[]).push(event)
    }
  }
  emit(type: EmitEventKey, data?: any){
    const fns = this.getEvents(type)
    if(!fns.length) return
    fns.forEach(({ fn, type }, idx) => {
      fn(data)
      if(type === "once"){
        fns.splice(idx, 1)
      }
    })
  }
  on<K extends keyof EmitEventMap>(type: K, cb: EmitEventMap[K]){
    this.createEvent(type, {
      fn: cb,
      type: "on"
    })
    return () => {
      const events = this.getEvents(type)
      const idx = events.findIndex(({ fn }) => fn === cb)
      idx && events && events.splice(idx, 1)
    }
  }
  once<K extends keyof EmitEventMap>(type: K, cb: EmitEventMap[K]){
    this.createEvent(type, {
      fn: cb,
      type: "once"
    })
  }
}