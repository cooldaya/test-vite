<template>
  <div class="kt-page">
    <kt-left>
      <div>1</div>
    </kt-left>
    <kt-right>
      <div>
        <div class="font-PER">hello</div>
        <kt-num-motion :num="tt" />
      </div>
    </kt-right>
    <div class="kt-full">
      <!-- <kt-video src="/videos/t1.mp4" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { intervalCallFunc } from "@/utils/funcs-tools";
const tt = ref(89);

intervalCallFunc(() => {
  tt.value = Math.floor(Math.random() * 100);
  console.log('ssss')
}, 1000);
</script>

<style lang="css" scoped></style>
