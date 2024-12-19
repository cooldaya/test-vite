<script setup>
import "@/utils/reload-imgs";
import store from '@/store'

</script>

<template>
  <div id="app" class="pointer-events-none bg-[#b2bec3]" v-loading="store.globalLoading">
    <router-view></router-view>
  </div>
</template>
