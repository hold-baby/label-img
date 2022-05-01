// all-scroll
enum Cursor {
  "draggable" = "grab", // 拖动
  "default" = "", // 默认
  "label" = "copy", // 标注
  "drag" = "grabbing", // 拖动中
  "pointer" = "pointer", // 点位
  "disabled" = "disabled", // 禁用
}
export type ICursor = keyof typeof Cursor;
export const displayCursor = (cursor: ICursor) => {
  return Cursor[cursor];
};
