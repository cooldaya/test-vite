<script setup>
import "@/utils/reload-imgs";
</script>

<template>
  <div id="app" class="pointer-events-none bg-[#b2bec3]" v-loading="true">
    <router-view></router-view>
  </div>
</template>