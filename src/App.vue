<script setup>
import "@/utils/reload-imgs";
import store from "@/store";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

setTimeout(() => {
  store.globalLoading = false;
}, 600);

onMounted(() => {
  const router = useRouter();
  router.push("/big-screen/page1");
});
</script>

<template>
  <div
    id="app"
    class="pointer-events-none bg-[#b2bec3]"
    v-loading="store.globalLoading"
  >
    <router-view></router-view>
  </div>
</template>
