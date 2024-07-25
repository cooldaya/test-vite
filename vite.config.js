import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImportComponents from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImportComponents({
      dirs: ["src/components"],
      extensions: ["vue"],
      // 配置文件生成位置
      dts: "src/auto-import-components.d.ts",
    }),
  ],
  server: {
    port: 9983,
    host: "0.0.0.0",
  },
  assetsInclude: ["./src/assets/**"],
});
