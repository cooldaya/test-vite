<script setup>
import "@/utils/reload-imgs";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const isLoading = ref(true);

setTimeout(() => {
  isLoading.value = false;
}, 600);

onMounted(() => {
  const router = useRouter();
  router.push("/big-screen/page1");
});
</script>

<template>
  <div id="app" class="pointer-events-none bg-[#b2bec3]" v-loading="isLoading">
    <router-view></router-view>
  </div>
</template>
