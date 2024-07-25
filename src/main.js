import { createApp } from "vue";
import "normalize.css";
import "./style.css"; // 全局样式
import "./tailwind.css"; // 自定义 tailwind 样式
import router from "./router";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.mount("#main");
