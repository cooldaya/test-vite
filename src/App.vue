<script setup>
import "@/utils/reload-imgs";
import { ref } from "vue";

const isLoading = ref(true);

setTimeout(() => {
  isLoading.value = false;
},600);
</script>

<template>
  <div id="app" class="pointer-events-none bg-[#b2bec3]" v-loading="isLoading">
    <router-view></router-view>
  </div>
</template>
