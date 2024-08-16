<template>
  <!--  背景切换闪烁问题 -->
  <div class="w-full h-full relative">
    <template v-for="(img, index) in imgs">
      <transition name="fade">
        <img
          class="absolute w-full h-full pointer-events-none"
          :src="img"
          :key="img"
          v-show="index == active"
        />
      </transition>
    </template>

    <div class="absolute inset-0 z-[2]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  imgs: {
    type: Array,
    default: () => [],
  },
  active: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="less" scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
