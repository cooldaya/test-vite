<script setup>
import pLimit from "p-limit";
import { getPosts, getPosts2 } from "@apis/page1";

// const limit = pLimit(1);

// const input = [
//   limit(() => fetchSomething("foo")),
//   limit(() => fetchSomething("bar")),
//   limit(() => fetchSomething("baz")),
// ];

// // Only one promise is run at once
// const result = await Promise.all(input);
// console.log(result);

// function fetchSomething(msg, delay = 1000) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(`Fetching ${msg}`);
//       resolve(msg);
//     }, delay);
//   });
// }
getPosts().then(console.log);
getPosts2().then(console.log);
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
