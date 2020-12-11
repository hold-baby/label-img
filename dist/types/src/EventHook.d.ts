import Shape from "./Shape";
declare enum EventHooks {
    "select" = "select",
    "create" = "create",
    "update" = "update"
}
declare type TEventHooks = keyof typeof EventHooks;
declare type Fn = (shape?: Shape) => void;
declare type TEventMap = {
    [key in EventHooks]?: Fn[];
};
export default class EventHook {
    private eventMap;
    constructor();
    trigger(name: TEventHooks, shape?: Shape): void;
    on(name: TEventHooks, cb: Fn): () => void;
    config(options: TEventMap): void;
}
export {};
