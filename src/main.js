import "@/utils/a-verify";
import { createApp } from "vue";
import "./global-style"; // global style
import router from "./router";
import App from "./App.vue";
import directives from "@/directives";
import "@/cus-els";

const app = createApp(App);
app.use(directives);
app.use(router);
app.mount("#main");
