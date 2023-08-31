import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import inject from "@rollup/plugin-inject";
import { resolve } from "path";
// import prebuildMultiplePlugin from "./plugins/prebuild-plugin";

export default defineConfig({
  plugins: [
    babel(),
    inject({
      $: "jquery", // 这里会自动载入 node_modules 中的 jquery
      jQuery: "jquery",
      "windows.jQuery": "jquery",
    }),
    // prebuildMultiplePlugin(),
  ],
  build: {
    target: "es2015",
    // 多页面打包配置
    rollupOptions: {
      input: {
        // 配置所有页面路径，使得所有页面都会被打包
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
      },
    },
  },
  //   css: {
  //     // 预处理器配置项
  //     preprocessorOptions: {
  //       less: {
  //         math: "always",
  //       },
  //     },
  //   },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
