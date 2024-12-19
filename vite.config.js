import { defineConfig } from "vite";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import AutoImportComponents from "unplugin-vue-components/vite";
import zipPack from "vite-plugin-zip-pack";

const projectRootDir = path.resolve(__dirname);

function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  Number.prototype.ps = function (width, z) {
    z = z || "0";
    return this.toString().padStart(width, z);
  };
  const month = (date.getMonth() + 1).ps(2, "0");
  const day = date.getDate().ps(2, "0");
  const hours = date.getHours().ps(2, "0");
  const minutes = date.getMinutes().ps(2, "0");
  return `${year}${month}${day}_${hours}${minutes}`;
}
const zipName = path.basename(__dirname) + "-" + formatDate();

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
    zipPack({
      inDir: "dist",
      outDir: "dist-zip",
      outFileName: `${zipName}.zip`,
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(projectRootDir, "src"),
      },
      {
        find: "@apis",
        replacement: path.resolve(projectRootDir, "src/request/apis"),
      },
      {
        find: "@utils",
        replacement: path.resolve(projectRootDir, "src/utils"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(projectRootDir, "src/hooks"),
      },
      {
        find: "@lib-comps",
        replacement: path.resolve(projectRootDir, "src/components/lib-comps"),
      },
      {
        find: "@assets",
        replacement: path.resolve(projectRootDir, "src/assets"),
      },
      {
        find: "@ref-data",
        replacement: path.resolve(projectRootDir, "src/request/ref-data"),
      },
      {
        find:"@request",
        replacement: path.resolve(projectRootDir, "src/request"),
      }
    ],
  },
  server: {
    port: 9983,
    host: "0.0.0.0",
    proxy: {
      // 选项写法
      "/kt-api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kt-api/, ""),
      },
    },
  },
  assetsInclude: ["./src/assets/**"],
});
