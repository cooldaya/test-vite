<template>
  <div class="kt-page big-screen">
    <cus-header> top </cus-header>

    <router-view></router-view>

    <cus-footer> bottom </cus-footer>
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
