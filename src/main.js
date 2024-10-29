import { createApp } from "vue";
import "./global-style"; // global style
import router from "./router";
import App from "./App.vue";
import directives from "@/directives";
import "./default-funcs"; // 系统初始化功能

const app = createApp(App);
app.use(directives);
app.use(router);
app.mount("#main");
