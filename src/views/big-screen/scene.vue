<template>
  <div class="kt-page kt-flex-center">
    <canvas ref="sceneContainerRef" class="kt-full pointer-events-auto"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { sceneOnLoad } from "@/ktJS";
const sceneContainerRef = ref(null);

onMounted(() => {
  sceneOnLoad({
    domElement: sceneContainerRef.value,
    callback: () => {
      //
    },
  });
});
</script>

<style lang="css" scoped>
.box-shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
