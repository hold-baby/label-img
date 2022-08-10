import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import banner from "rollup-plugin-banner2";
import json from "@rollup/plugin-json";
import pkg from "../package.json";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import dayjs from "dayjs";
import dts from "rollup-plugin-dts";
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
import { name, input } from "./config";
// import demoConfig from "./rollup.config.demo";

export default [
  {
    input: input.main,
    output: {
      file: pkg.types,
      format: "es",
    },
    plugins: [
      dts({
        respectExternal: true,
      }),
    ],
  },
  // {
  //   input: input.main,
  //   output: {
  //     name,
  //     file: pkg.main,
  //     format: "umd",
  //   },
  //   plugins: [
  //     json(),
  //     resolve(),
  //     commonjs({
  //       extensions: [".js", ".ts"],
  //     }),
  //     typescript(),
  //     banner(getBanner),
  //   ],
  // },
  {
    input: input.main,
    output: {
      name,
      file: pkg.main.replace(".js", ".es.js"),
      format: "es",
    },
    plugins: [
      json(),
      resolve(),
      optimizeLodashImports(),
      commonjs({
        extensions: [".js", ".ts"],
      }),
      typescript(),
      banner(getBanner),
    ],
  },
  // {
  //   input: input.main,
  //   output: [
  //     {
  //       name,
  //       file: pkg.main.replace(".js", ".min.js"),
  //       format: "umd",
  //     },
  //   ],
  //   plugins: [
  //     json(),
  //     resolve(),
  //     commonjs({
  //       extensions: [".js", ".ts"],
  //     }),
  //     typescript(),
  //     terser(),
  //     banner(getBanner),
  //   ],
  // },
  // demoConfig,
];

function getBanner() {
  return [
    `/**!`,
    ` * ${pkg.name} - v${pkg.version}`,
    ` * ${pkg.description}`,
    ` *`,
    ` * ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`,
    ` * ${pkg.license} (c) ${pkg.author}`,
    `*/`,
    ``,
  ].join("\n");
}
