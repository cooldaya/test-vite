import axios from "axios";
import { requestInterceptor, responseInterceptor } from "./interceptors";
import useSwrvTool from "@utils/swrv-tool";
const http = axios.create({});
http.defaults.headers.common["Content-Type"] = "application/json";

const { DEV } = import.meta.env;

if (DEV) {
  http.defaults.baseURL = "/kt-api";
} else {
  http.defaults.baseURL = window._config.base_url;
}

http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use(responseInterceptor);





export const httpGet = (url, params = {}, headers = {}) =>
  http.get(url, { params, headers });

export const httpPost = (url, data = {}, headers = {}) =>
  http.post(url, data, { headers });

export const httpPut = (url, data = {}, headers = {}) =>
  http.put(url, data, { headers });

export const httpDelete = (url, headers = {}) => http.delete(url, { headers });

// 使用swrv请求
export const httpSwrvRequest = (
  requestConfig = {},
  handleFn = (res) => res,
  swrvOptions = {},
) => {
  const { method = "GET", url, params, data } = requestConfig;

  const key = `${method}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}}`;
  const { data: swrvData, error } = useSwrvTool(
    key,
    () => http.request(requestConfig).then(handleFn),
    swrvOptions,
  );
  return swrvData;
};

export const httpInstance = http;

export default http;
