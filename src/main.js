import { createApp } from "vue";
import "./global-style"; // global style
import router from "./router";
import App from "./App.vue";
import directives from "@/directives"; 


const app = createApp(App);
app.use(directives);
app.use(router);
app.mount("#main");
