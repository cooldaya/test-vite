<template>
  <div class="kt-rtsp-player" ref="playerWrapRef"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount,watch } from "vue";
import { mountPlayer, stopStream } from "@/utils/rtsp-rtc";

const playerWrapRef = ref(null);

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  
});
onMounted(() => {
  startPlayer();
});

watch(() => props.url, () => {
  startPlayer();
})

function startPlayer() {
  if (props.url) {
    mountPlayer({
      el: playerWrapRef.value,
      url: props.url,
      toh264: true,
    });
  }
}

onBeforeUnmount(() => {
  stopStream(props.url);
});
</script>

<style lang="css" scoped>
.kt-rtsp-player {
  width: 100%;
  height: 100%;
  object-fit: fill;
  background-color: black;
}
</style>
