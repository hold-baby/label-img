import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { name } from "./config";

export default {
  input: "example/app.tsx",
  output: {
    name,
    format: "umd",
    file: "public/app.js",
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
      antd: "antd",
    },
  },
  external: ["react", "react-dom", "antd"],
  plugins: [
    json(),
    typescript(),
    resolve(),
    postcss({
      extract: true,
      extensions: [".less"],
    }),
    commonjs(),
  ],
};
