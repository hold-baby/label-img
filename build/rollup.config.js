import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import pkg from '../package.json';
import typescript from '@rollup/plugin-typescript'
import browsersync from 'rollup-plugin-browsersync'
import { name, input } from "./config"

export default {
	input: input.main,
	output: {
		name,
		format: 'umd',
		file: pkg.eg,
	},
	plugins: [
		json(),
		resolve(),
		commonjs({ 
			extensions: ['.js', '.ts'],
		}),
		typescript(),
		browsersync({
			server: "example",
			port: 9001,
			open: true
		})
	]
}
