import { createApp } from "vue";
import "./global-style"; // global style
import router from "./router";
import App from "./App.vue";


const app = createApp(App);
app.use(router);
app.mount("#main");



