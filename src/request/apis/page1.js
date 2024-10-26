import { httpGet, httpPost } from "../http";

async function getPosts() {
  return await httpGet("/posts", { name: "John" });
}

async function getPosts2() {
  return await httpPost("/posts");
}

export default { getPosts, getPosts2 };
