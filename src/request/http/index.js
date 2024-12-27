import axios from "axios";
import { requestInterceptor, responseInterceptor } from "./interceptors";
const http = axios.create({});
http.defaults.headers.common["Content-Type"] = "application/json";

const { DEV } = import.meta.env;

if (DEV) {
  http.defaults.baseURL = "/kt-api";
} else {
  http.defaults.baseURL = window.kt_config.base_url;
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


export const httpInstance = http;

export default http;
