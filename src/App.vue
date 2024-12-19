<script setup>
import "@/utils/reload-imgs";
import { ref } from "vue";
import store from "@/meta";
import { onPixelLoaded } from "@/ue";

const isLoading = ref(true);

if (store.isPixel) {
  onPixelLoaded(() => {
    isLoading.value = false;
  });
}else{
  isLoading.value = false;
}
</script>

<template>
  <div id="app" class="pointer-events-none bg-[#b2bec3] text-[#fffdfe]" v-loading="isLoading">
    <router-view></router-view>
  </div>
</template>
