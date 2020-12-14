import { Platform, AntOptions } from "./Platform"
import { Shape } from "./Shape"
import { IDGenerator } from "./IDGenerator"

export default class LabelImg extends Platform {
	constructor(container: HTMLDivElement, options?: AntOptions){
		super(container, options)
	}
	static Shape = Shape
	static IDGenerator = IDGenerator
}