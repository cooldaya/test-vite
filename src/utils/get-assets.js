export function getCompImg(name) {
  return new URL(`../assets/imgs/comp/${name}`, import.meta.url).href;
}
