// all-scroll
enum Cursor {
	"draggable" = "grab",
	"default" = "",
	"point" = "crosshair",
	"drag" = "grabbing",
	"pointer" = "pointer",
	"disabled" = "disabled"
}
export  type ICursor = keyof typeof Cursor
export const displayCursor = (cursor: ICursor) => {
	return Cursor[cursor]
}