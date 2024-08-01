import { httpGet, httpPost } from "../http";

export async function getPosts() {
  return await httpGet("/posts");
}

export async function getPosts2() {
  return await httpPost("/posts");
}
