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
export default async function patchReq(apis = []) {
  const apisArr = apis instanceof Map ? Array.from(apis.values()) : apis;

  for (const api of apisArr) {
    const params = api.params || {};
    try {
      const res = await limit(() => api.api_pro(params));
      const callback = api.callback || console.log;
      callback(res);
    } catch (err) {
      console.error('Error with API:', api.api_pro, err);
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
