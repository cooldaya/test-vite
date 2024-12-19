import { httpSwrvRequest } from "@/request/http";

// 直接获取posts ref数据
const getPostsRefData = () =>
  httpSwrvRequest({
    url: "/posts",
    method: "GET",
    params: {
      page: 1,
    },
  });
export default {
  getPostsRefData,
};
