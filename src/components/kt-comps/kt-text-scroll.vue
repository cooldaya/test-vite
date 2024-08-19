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
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TWEEN from "@tweenjs/tween.js";
const TextScrollElRef = ref(null);
const props = defineProps({});

// 控制动画滚动

const opts = {
  controlScroll: (type) => {
    const TextScrollEl = TextScrollElRef.value;
    if (!TextScrollEl) return;
    TextScrollEl.style.animationPlayState = type;
  },
  // 控制滚动条
  controlScrollbar: (evt) => {
    console.log(evt);
    const TextScrollEl = TextScrollElRef.value;
    if (evt.deltaY < 0) {
      //当滑轮向上滚动时
      console.log("向上滚动");
    } else {
      //当滑轮向下滚动时
      console.log("向下滚动");
    }
  },
};

const position = {
  y: 0,
};

const statAnimate = () => {
  const elStyle = TextScrollElRef.value.style;

  var tween = new TWEEN.Tween(position).to({ y: -50 }, 100000);
  tween.repeat(Infinity);

  tween.onUpdate(function () {
    elStyle.transform = "translateY(" + position.y + "%)";
  });
  tween.start();

  function animate() {
    requestAnimationFrame(animate);
    tween.update();
  }
  animate();
};

onMounted(() => {
  console.log("mounted");
  statAnimate();
});
</script>

<style lang="less" scoped>
.text-scroll {
  .scroll-up {
    animation: scroll-up 20s linear infinite;
  }

  // @keyframes scroll-up {
  //   0% {
  //     transform: translateY(0) translateZ(0);
  //   }
  //   100% {
  //     transform: translateY(-50%) translateZ(0);
  //   }
  // }
}
</style>
