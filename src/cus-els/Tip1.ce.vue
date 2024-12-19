<template>
  <div class="h-[100px] w-[100px] bg-[red] pointer-events-auto">测试 {{ store.test_data }}
    <kt-video src="https://www.w3school.com.cn/i/movie.mp4" />
  </div>
</template>
<script setup>
import store from "@/store.js";  

defineProps({
  id: String,
});
</script>
