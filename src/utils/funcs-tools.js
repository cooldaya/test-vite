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
 * @param {*} apis
 */
export default async function patchReq(apis = []) {
  const apisArr = apis instanceof Map ? Array.from(apis.values()) : apis;
  apisArr.forEach((api) => {
    const params = api.params || {};
    limit(() => api.api_pro(params))
      .then((res) => {
        const callback = api.callback || console.log;
        callback(res);
      })
      .catch((err) => {
        console.error(api.api_pro, err);
      });
  });
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
