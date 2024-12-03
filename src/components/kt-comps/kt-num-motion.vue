<template>
  <div>
    {{ changeNum }}
  </div>
</template>

<script setup>
import { animate } from "motion";
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  num: {
    default: 0,
    type: Number,
  },
});

let animationInstance = null;

const changeNum = ref(0);

function startNumMotion() {
  const startValue = changeNum.value;
  const endValue = props.num;

  const duration = Math.abs(endValue - startValue) * 0.02;

  if (animationInstance) {
    animationInstance.stop();
  }

  animationInstance = animate(startValue, endValue, {
    duration,
    ease: "linear",
    onUpdate: (value) => {
      changeNum.value = parseInt(value);
    },
  });
}

watch(
  () => props.num,
  () => {
    startNumMotion();
  },
);

onMounted(() => {
  startNumMotion();
});
</script>

<style lang="css" scoped></style>
