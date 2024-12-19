<template>
  <div class="kt-page">
    <kt-left>
      <div>
        <div v-for="(item, index) in postsRefData" class="mt-[20px]">
          <div class="bg-[#f5f5f5]">{{ item.title }}</div>
          <div class="kt-border">{{ item.body }}</div>
        </div>
      </div>
    </kt-left>
    <kt-right>
      <div>
        <div class="font-PER">
          hello
        </div>
        <kt-num-motion :num="tt" />
      
      </div>
    </kt-right>
    <div class="kt-full">
      <!-- <kt-video src="/videos/t1.mp4" /> -->
    </div>
  </div>
</template>

<script setup>
import page1Refs from "@ref-data/page1-ref";
import { ref } from "vue";
const postsRefData = page1Refs.getPostsRefData();

const tt = ref(89);

setInterval(() => {
  tt.value = Math.floor(Math.random() * 100);
}, 4000);
</script>

<style lang="css" scoped></style>
