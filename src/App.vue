<script setup>
import "@/utils/reload-imgs";
import store from "@/store";
import { onPixelLoaded } from "@/ue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";


if (store.isPixel) {
  onPixelLoaded(() => {
    store.globalLoading = false;
  });
} else {
  store.globalLoading = false;
}

onMounted(() => {
  const router = useRouter();
  router.push("/big-screen/page1");
});
</script>

<template>
  <div
    id="app"
    class="pointer-events-none bg-[#b2bec3] text-[#fffdfe]"
    v-loading="store.globalLoading"
  >
    <router-view></router-view>
  </div>
</template>
