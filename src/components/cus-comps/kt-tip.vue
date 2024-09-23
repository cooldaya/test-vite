<template>
  <Teleport to="#app-main">
    <div
      class="absolute left-0 top-[0px] w-full h-full z-50 kt-flex"
      v-if="show"
    >
      <div
        class="absolute lef-[0px] top-[0px] kt-full bg-[rgba(0,0,0,0.2)] backdrop-2px animate__animated animate__fadeIn pointer-events-auto animate__faster"
        @click="$emit('close')"
      ></div>
      <div
        class="absolute kt-bg-full p-[15px] pointer-events-auto"
        :class="$attrs.class"
        @click.stop
      >
        <div class="flex justify-between items-center">
          <div class="text-[#ecf0f1]">
            <span>{{ title }}</span>
          </div>
          <div
            class="w-[18px] h-[18px] bg-[url('@/assets/img/p24-1.webp')] kt-bg-full kt-pointer"
            @click="$emit('close')"
          ></div>
        </div>
        <div class="mt-[10px]">
          <slot name="default"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";

defineEmits(["close"]);

const props = defineProps({
  title: {
    type: String,
    default: "视频提示",
  },
  show: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="less">
.backdrop-2px {
  backdrop-filter: blur(1px);
}
</style>
