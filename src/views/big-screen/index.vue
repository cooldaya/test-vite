<template>
  <div class="kt-page big-screen">
    <kt-header> top </kt-header>

    <router-view></router-view>

    <kt-footer> bottom </kt-footer>
  </div>
</template>

<script setup>
import autofit from "autofit.js";
import { onMounted } from "vue";

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
