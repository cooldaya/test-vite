<template>
  <div class="kt-page kt-flex-center">
    <pixel-streaming-player ss="ws://10.1.10.40:1235" ref="playerInstanceRef"> </pixel-streaming-player>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { connectPixelStreaming, watchUEEvents } from "@/ue";
const playerInstanceRef = ref(null);

onMounted(() => {
  // 是否链接使用像素流模式、否则使用UE内嵌网页模式
  console.log('链接像素流模式')
  connectPixelStreaming(playerInstanceRef.value);
});

watchUEEvents({
  jumpurl: (data) => {
    console.log(data);
  },
});
</script>

<style lang="css" scoped>
.box-shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
