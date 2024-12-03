<template>
  <div class="kt-full">
    <video class="video-js" ref="playerElRef"></video>
  </div>
</template>

<script setup>
import "video.js/dist/video-js.css";
import videojs from "video.js";
import { onMounted, ref, useAttrs } from "vue";

const attrs = useAttrs();

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

let playerInstance;

const playerElRef = ref(null);
const startPlay = () => {
  const playerEl = playerElRef.value;
  if (playerInstance) {
    playerInstance.src(props.src);
    return;
  }
  playerInstance = videojs(playerEl, {
    autoplay: true,
    muted: true,
    controls: true,
    loop: true,
    ...attrs,
  });
  playerInstance.src(props.src);
};

onMounted(() => {
  startPlay();
});
</script>

<style lang="css" scoped>
.video-js {
  width: 100%;
  height: 100%;
}
</style>
