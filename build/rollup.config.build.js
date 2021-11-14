import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import banner from "rollup-plugin-banner2"
import json from '@rollup/plugin-json';
import pkg from '../package.json';
import typescript from '@rollup/plugin-typescript'
import { terser } from "rollup-plugin-terser";
import dayjs from "dayjs"
import dts from "rollup-plugin-dts";
import { name, input } from "./config"

export default [
  // type
  {
    input: input.type,
    output: {
      file: pkg.types,
      format: "es",
    },
    plugins: [
      dts({
        respectExternal: true,
      })
    ]
  },
  // browser-friendly UMD build
  {
    input: input.main,
    output: {
      name,
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
    input: input.main,
    output: [
      {
        name,
        file: pkg.build,
        format: 'umd',
      },
    ],
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

function getBanner (){
  return (
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
}