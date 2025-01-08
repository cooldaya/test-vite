import pLimit from "p-limit";
// 防抖函数
export const debounce = (fun, delay) => {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fun();
    }, delay);
  };
};

import pLimit from "p-limit";

const limit = pLimit(5);

/**
 * 批量请求并处理结果
 * @param {Array|Map} apis - 要请求的 API 列表
 */
export async function patchReq(apis = []) {
  const apisArr = apis instanceof Map ? Array.from(apis.values()) : apis;

  for (const api of apisArr) {
    const params = api.params || {};
    try {
      const res = await limit(() => api.api_pro(params));
      const callback = api.callback || console.log;
      callback(res);
    } catch (err) {
      console.error("Error with API:", api.api_pro, err);
      // 可以添加更多的错误处理逻辑
    }
  }
}

/**
const apis = [
  {
    api_pro: page1Api.allStore,
    params:{},
    callback(res) {
      console.log(res);
    },
  },
];

patchReq(apis);
 */
import { onBeforeUnmount } from "vue";
const timerCallbacks = {};

// 组件中使用
export function intervalCallFunc(
  func,
  interval = window?.kt_config?.refresh_interval || 1000 * 60,
  isAutoDestroy = true,
) {
  let timerInfo = timerCallbacks[interval];
  if (!timerInfo) {
    timerInfo = {
      callbacks: new Set(),
      timer: null,
    };
    timerInfo.timer = setInterval(() => {
      if (window.requestIdleCallback) {
        requestIdleCallback(
          () => timerInfo.callbacks.forEach((funcItem) => funcItem()),
          { timeout: 1000 },
        );
      } else {
        timerInfo.callbacks.forEach((funcItem) => funcItem());
      }
    }, interval);

    timerCallbacks[interval] = timerInfo;
  }
  timerInfo.callbacks.add(func);

  const destroyFunc = () => {
    timerInfo.callbacks.delete(func);
    if (timerInfo.callbacks.size === 0) {
      clearInterval(timerInfo.timer);
      delete timerCallbacks[interval];
    }
  };
  if (isAutoDestroy) {
    onBeforeUnmount(() => {
      destroyFunc();
    });
  }

  return destroyFunc;
}
