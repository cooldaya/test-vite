<template>
  <div class="w-full h-full" ref="containerElRef"></div>
</template>

<script setup>
import { ref, useAttrs, onMounted } from "vue";
import lottie from "lottie-web";
const containerElRef = ref(null);

const attrs = useAttrs();

const props = defineProps({});

onMounted(() => {
  const containerEl = containerElRef.value;
  const animationInstance = lottie.loadAnimation({
    container: containerEl,
    renderer: "svg",
    loop: true,
    ...attrs,
  });
  animationInstance.setSpeed(0.5);
});
</script>

<style lang="less" scoped></style>
