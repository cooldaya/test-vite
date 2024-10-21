import { createApp } from "vue";
import "./global-style"; // global style
import router from "./router";
import App from "./App.vue";
import directives from "@/directives";
import { getXlsData } from "@utils/xlsx-tools";
import pintWarnXlsxUrl from "@assets/point-warn.xlsx?url";

const app = createApp(App);
app.use(directives);
app.use(router);
app.mount("#main");
getXlsData(
  pintWarnXlsxUrl,
  new Map([
    ["低低限", "ll"],
    ["低限", "l"],
    ["高高限", "hh"],
    ["高限", "h"],
    ["点位", "point"],
  ]),
).then((res) => {
  console.log(res);
});
