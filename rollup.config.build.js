import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import banner from "rollup-plugin-banner2"
import json from '@rollup/plugin-json';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript'
import { terser } from "rollup-plugin-terser";
import dayjs from "dayjs"
import dts from "rollup-plugin-dts";

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
const input = "src/LabelImg.ts"

export default [
  // type
  {
    input,
    output: {
      file: "dist/index.d.ts"
    },
    plugins: [
      dts({
        respectExternal: true,
      })
    ]
  },
  // browser-friendly UMD build
  {
    input,
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
    input,
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

