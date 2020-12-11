import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import banner from "rollup-plugin-banner2"
import json from '@rollup/plugin-json';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript'
import { terser } from "rollup-plugin-terser";
import dayjs from "dayjs"

const getBanner = () => (
  [
    `/**!`,
    ` * ${pkg.name} - v${pkg.version}`,
    ` * ${pkg.description}`,
    ` *`,
    ` * ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`,
    ` * ${pkg.license} (c) ${pkg.author}`,
    `*/`,
    ``
  ].join('\n')
)
export default [
  {
    input: 'src/LabelImg.ts',
    output: {
      dir: "dist"
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist/types',
      }),
    ]
  },
  // browser-friendly UMD build
  {
    input: 'src/LabelImg.ts',
    output: {
      name: 'LabelImg',
      file: pkg.main,
      format: 'umd',
    },
    plugins: [
      json(),
      resolve(),
      commonjs({ 
        extensions: ['.js', '.ts'],
      }),
      typescript(),
      banner(getBanner)
    ]
  },
  {
    input: 'src/LabelImg.ts',
    output: {
      name: 'LabelImg',
      file: pkg.build,
      format: 'umd',
    },
    plugins: [
      json(),
      resolve(),
      commonjs({ 
        extensions: ['.js', '.ts'],
      }),
      typescript(),
      terser(),
      banner(getBanner)
    ]
  },
]

