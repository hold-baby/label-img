import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript'

export default {
	input: 'src/LabelImg.ts',
	output: {
		name: 'LabelImg',
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
	]
}
