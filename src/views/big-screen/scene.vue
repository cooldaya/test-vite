<template>
  <div class="kt-page kt-flex-center">
    <kt-pixel-streaming-player
      :ss="ss"
      :connectPixelStreamingCallback="connectPixelStreaming"
    >
    </kt-pixel-streaming-player>
  </div>
</template>

<script setup>
import { connectPixelStreaming } from "@/ue";

const ss = window.kt_config.ss;
</script>

<style lang="css" scoped>
.box-shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
