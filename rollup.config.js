import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import buble from '@rollup/plugin-buble';

import packageJson from "./package.json";

export default {
  input: "src/main.ts",
  output: [
    {
      format: "cjs",
      file: packageJson.main,
      name: 'VCupertino',
      exports: 'named',
      sourcemap: true
    },
    {
      format: "esm",
      file: packageJson.module,
      name: 'VCupertino',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
        peerDepsExternal(),
        resolve(), 
        vue({
            css: true,
            compileTemplate: true,
        }),
        typescript(),
        buble(),
        commonjs(),
    ]
};