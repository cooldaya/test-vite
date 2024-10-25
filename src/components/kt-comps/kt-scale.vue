<!-- 缩放组件，不会影响布局 -->
<template>
  <div
    class="kt-scale"
    :style="{
      width: rectBounds.width + 'px',
      height: rectBounds.height + 'px',
    }"
  >
    <div class="child-wrapper" ref="childWrapperRef" :style="{
        scale: props.scale,
    }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from "vue";
import { useElementVisibility } from "@vueuse/core";

const props = defineProps({
  scale: {
    type: Number,
    default: 1,
  },
});
const childWrapperRef = ref(null);
const targetIsVisible = useElementVisibility(childWrapperRef);

const rectBounds = ref({
  width: 0,
  height: 0,
});

// const rectBounds = computed(()=>{
//     const w =
// })

watch(targetIsVisible, (isVisible) => isVisible && setupRectBounds());

watch(
  () => props.scale,
  () => {
    setupRectBounds();
  }
);

function setupRectBounds() {
  const childWrapperEl = childWrapperRef.value;

  if (childWrapperEl) {
    const rectBoundsValue = rectBounds.value;
    const { offsetWidth: width, offsetHeight: height } = childWrapperEl;
    rectBoundsValue.width = width * props.scale;
    rectBoundsValue.height = height * props.scale;
  }
}

onMounted(() => {
  setupRectBounds();
});
</script>

<style lang="css" scoped>
.child-wrapper {
  width: fit-content;
  height: fit-content;
}
.kt-scale {
  display: grid;
  place-content: center;
}
</style>
