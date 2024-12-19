<template>
  <div class="h-[100px] w-[100px] bg-[red] pointer-events-auto">测试 {{ store.test_data }}</div>
</template>
<script setup>
import store from "@/store.js";  

defineProps({
  id: String,
});
</script>
