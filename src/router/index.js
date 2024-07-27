import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/big-screen/page1/index.vue";
import AboutView from "@/views/big-screen/page2/index.vue";

function createRoutes() {
  const viewComponent = import.meta.glob(["../views/**/index.vue"]);
  const viewRouteInfo = import.meta.glob(["../views/**/meta.js"], {
    eager: true,
  });

  const routeMap = {};
  const infoMap = {};

  Object.entries(viewRouteInfo).forEach(([infopath, infoModule], order) => {
    const _infopath = infopath.replace("../views/", "").replace("/meta.js", "");
    const info = infoModule.default;
    infoMap[_infopath] = info;
  });

  Object.entries(viewComponent).forEach(([path, component], order) => {
    const _path = path.replace("../views/", "").replace("/index.vue", "");
    const pathArr = _path.split("/");

    pathArr.forEach((path_step, index) => {
      if (index === 0) {
        const routeItem = routeMap[path_step];
        if (!routeItem) {
          routeMap[path_step] = {
            children: [],
            component: component,
            name: path_step,
            path: `/${path_step}`,
          };
        }
        routeMap[path_step].meta = infoMap[_path] || {};
      } else {
        const parentRoute = routeMap[pathArr[index - 1]];
        if (!parentRoute) alert("最多只能两级路由");
        parentRoute.children.push({
          // children: [],
          component: component,
          name: pathArr.join("-"),
          path: path_step,
          meta: infoMap[_path] || {},
        });
      }
    });
  });

  return Object.values(routeMap);
}
const routes = createRoutes();

console.log("auto generate routes: ", routes);

routes.push({
  path: "/",
  redirect: "/big-screen/page1",
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
