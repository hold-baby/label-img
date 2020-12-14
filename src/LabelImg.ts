import pkg from "../package.json"
import Platform, { AntOptions } from "./Platform"
import Shape from "./Shape"
import IDGenerator from "./IDGenerator"

export class LabelImg extends Platform {
	public version: string;
	public author: string;
	constructor(container: HTMLDivElement, options?: AntOptions){
		super(container, options)
		this.version = pkg.version
		this.author = pkg.author
	}
	static Shape = Shape
	static IDGenerator = IDGenerator
}