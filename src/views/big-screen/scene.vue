<template>
  <div class="kt-page kt-flex-center">
    <canvas
      ref="sceneContainerRef"
      class="kt-full pointer-events-auto"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { sceneOnLoad } from "@/ktJS";
import { clearThreeData } from "@/utils/3d-funcs";
const sceneContainerRef = ref(null);

onMounted(() => {
  console.error("sceneContainerRef");
  sceneOnLoad({
    domElement: sceneContainerRef.value,
    callback: () => {
      //
    },
  });
});

// 清除threejs数据,不然vite热重载时候会变卡
onBeforeUnmount(() => {
  clearThreeData(window.container.scene, window.container.renderer);
});
</script>

<style lang="css" scoped>
.box-shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
