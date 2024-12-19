<template>
  <div class="kt-page relative">
    <div class="kt-page absolute left-0 top-0 z-[1]" v-if="META.isPixel">
      <scene />
    </div>
    <div class="kt-full big-screen absolute left-0 top-0 z-[2]">
      <cus-header> top </cus-header>
      <!-- <router-view></router-view> -->
      <router-view v-slot="{ Component }">
        <transition name="scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <cus-footer> bottom </cus-footer>
    </div>
  </div>
</template>

<script setup>
import autofit from "autofit.js";
import { onMounted } from "vue";
import scene from "./scene.vue";
import META from "@/meta.js";

onMounted(() => {
  autofit.init({
    dh: 1080,
    dw: 1920,
    el: ".big-screen",
    resize: true,
  });
});
</script>

<style lang="css" scoped></style>
