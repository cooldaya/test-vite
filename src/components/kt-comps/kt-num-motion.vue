<template>
  <div class="inline-block w-fit overflow-visible">
    <slot :value="changeNum">
      {{ changeNum }}
    </slot>
  </div>
</template>

<script setup>
import { animate } from "motion";
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  num: {
    default: 0,
    type: [Number, String],
  },
});

let animationInstance = null;

const changeNum = ref(0);

const regexps = {
  isNum: (arg) => /^\d+(\.\d+)?$/.test(arg + ""),
  isFloat: (arg) => /^\d+\.\d+$/.test(arg + ""),
  isInt: (arg) => /^\d+$/.test(arg + ""),
};

function startNumMotion() {
  if (!regexps.isNum(props.num) || !regexps.isNum(changeNum.value)) {
    // 当传入的数字不符合要求时，直接返回
    return (changeNum.value = props.num);
  }

  const isInt = regexps.isInt(props.num);

  const startValue = changeNum.value * 1;
  const endValue = props.num * 1;

  let duration = Math.abs(endValue - startValue) * 0.02;

  duration = duration > 1 ? 1 : duration;

  if (animationInstance) {
    animationInstance.stop();
  }

  animationInstance = animate(startValue, endValue, {
    duration,
    ease: "linear",
    onUpdate: (value) => {
      if (isInt) {
        return (changeNum.value = Math.ceil(value));
      }
      changeNum.value = value;
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
