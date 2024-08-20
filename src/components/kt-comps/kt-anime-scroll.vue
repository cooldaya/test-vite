<template>
  <div class="text-scroll pointer-events-auto h-full w-full overflow-hidden">
    <div
      class="scroll-up"
      ref="TextScrollElRef"
      @mouseenter="opts.controlScroll('paused')"
      @mouseleave="opts.controlScroll('running')"
      @mousewheel="opts.controlScrollbar"
    >
      <div>
        <slot></slot>
      </div>
      <div v-if="config.isOverflow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  onMounted,
  ref,
  reactive,
  useSlots,
  watch,
  nextTick,
  watchEffect,
} from "vue";
import anime from "animejs/lib/anime.es.js";

const slots = useSlots();

const TextScrollElRef = ref(null);
const props = defineProps({
  aSpeed: {
    // 动画滚动速度，
    default: 30,
    type: Number,
  },
  sSpeed: { // 滚动条滚动速度
    default: 0.48,
    type: Number,
  },
});
//两个速度，和滚动条滚动速度

// 控制动画滚动
let animation = null; // 动画实例
const position = {
  y: 0,
};

const config = reactive({
  animationDuration: 100000,
  isOverflow: false,
});

const opts = {
  initAnimate: () => {
    if (!config.isOverflow) return;
    const elStyle = TextScrollElRef.value.style;
    animation = anime({
      targets: position,
      y: -50,
      duration: config.animationDuration,
      easing: "linear",
      loop: true,
      update: function () {
        elStyle.transform = "translateY(" + position.y + "%)";
      },
    });
  },
  controlScroll: (type) => {
    if (!config.isOverflow) return;
    if (!animation) return;
    if (type === "paused") {
      animation.pause();
    } else {
      animation.play();
    }
  },
  // 控制滚动条
  controlScrollbar: (evt) => {
    if (!config.isOverflow) return;
    const TextScrollEl = TextScrollElRef.value;
    if (evt.deltaY < 0) {
      //当滑轮向上滚动时
      position.y += props.sSpeed;
    } else {
      //当滑轮向下滚动时
      position.y -= props.sSpeed;
    }
    if (position.y > 0) position.y = -50;
    if (position.y < -50) position.y = 0;
    TextScrollEl.style.transform = "translateY(" + position.y + "%)";

    if (animation) {
      animation.seek(animation.duration * (position.y / -50));
    }
  },
  // 计算是否溢出，计算动画时长，滚动条滚动速度，是否溢出
  calculateConfig: () => {
    const TextScrollEl = TextScrollElRef.value;
    const parentEL = TextScrollEl.parentNode;
    const parentHeight = parentEL.clientHeight;
    const childHeight = TextScrollEl.clientHeight;
    config.isOverflow = childHeight > parentHeight;
    config.animationDuration = (childHeight * 1000) / props.aSpeed;
    return config.isOverflow;
  },
  init: () => {
    opts.calculateConfig();
    opts.initAnimate();
  },
  reset: () => {
    config.isOverflow = false;
    config.animationDuration = 100000;
    if (animation) {
      animation.pause(); // 暂停动画
      animation.seek(0); // 将动画重置到起始位置
    }
    position.y = 0;
    nextTick(() => {
      opts.init(); // 重新初始化
    });
  },
};

// 监听slots.default内容变化
watch(
  () => slots.default(),
  () => {
    opts.reset();
  },
);
// 监听多个 props 重置动画
watch([() => props.aSpeed, () => props.sSpeed], () => {
  opts.reset();
});
onMounted(() => {
  opts.init();
});

defineExpose({
  pause: opts.controlScroll("paused"),
  play: opts.controlScroll("running"),
  reset: opts.reset,
});
</script>

<style lang="less" scoped>
.text-scroll {
}
</style>
