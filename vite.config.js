import { defineConfig } from "vite";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import AutoImportComponents from "unplugin-vue-components/vite";

const projectRootDir = path.resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImportComponents({
      dirs: ["src/components/cus-comps", "src/components/kt-comps"],
      extensions: ["vue"],
      // 配置文件生成位置
      dts: "src/auto-import-components.d.ts",
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(projectRootDir, "src"),
      },
    ],
  },
  server: {
    port: 9983,
    host: "0.0.0.0",
  },
  assetsInclude: ["./src/assets/**"],
});
