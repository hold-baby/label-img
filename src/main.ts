import { Platform, AntOptions } from "./Platform"
import { Shape } from "./Shape"
import { IDGenerator } from "./IDGenerator"
import * as utils from "./utils"

export default class LabelImg extends Platform {
	constructor(container: HTMLDivElement, options?: AntOptions){
		super(container, options)
	}
	static Shape = Shape
	static IDGenerator = IDGenerator
	static utils = utils
}