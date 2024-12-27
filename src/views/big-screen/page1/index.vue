<template>
  <div class="kt-page">
    <kt-left>
      <div>
        ss
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
import { ref } from "vue";


const tt = ref(89);

setInterval(() => {
  tt.value = Math.floor(Math.random() * 100);
}, 4000);
</script>

<style lang="css" scoped></style>
