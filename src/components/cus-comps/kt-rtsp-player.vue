<template>
  <div class="kt-rtsp-player">
    <video
      class="video-inner"
      ref="vElRef"
      controls
      muted
      autoplay
      v-bind="$attrs"
    ></video>
  </div>
</template>

<script setup>
import HlsJS from "hls.js";
import { ref, onMounted, onBeforeMount, watch } from "vue";
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  toh264: {
    type: Boolean,
    default: false,
  },
});

const trans_host = window.trans_host || "localhost";
const server_url = `http://${trans_host}`;
const api_server = `${server_url}:9997`; // rtsp转流服务地址
const stream_server = `${server_url}:8888`; // 转流服务结果地址
const trans_token = (() => {
  const username = "kt"; // 在配置文件中
  const password = "123";
  return "Basic " + btoa(username + ":" + password);
})();

const tools = {
  hashCode(str) {
    // 使用URL的哈希值生成唯一ID
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  },

  getUUID(str) {
    // 根据url生成 streamId
    return Math.abs(tools.hashCode(str)).toString(36);
  },

  getStreamUrl: async (rtsp_url) => {
    let streamId = tools.getUUID(props.url);
    if (window?.timers?.[streamId]) {
      clearTimeout(window.timers[streamId]);
      delete window.timers[streamId];
    }
    const reqs = tools.reqs;
    // 查询是否添加过streamId
    const res = await reqs.getOnePath(streamId);
    if (!res.ok) {
      // 没有添加过streamId，添加streamId
      const res = reqs.setOnePath(streamId, props.url);
    }
    return `${stream_server}/${streamId}/index.m3u8`;
  },

  reqs: {
    getOnePath: async (streamId) => {
      return await fetch(`${api_server}/v3/paths/get/${streamId}`, {
        headers: {
          Authorization: trans_token,
        },
      });
    },
    setOnePath: async (streamId, source) => {
      // 当需要转h264时，需要服务端支持ffmpeg转码环境，并通过8554端口发送到 mediamtx管理
      const payload = props.toh264
        ? {
            runOnInit: `
            ffmpeg -rtsp_transport tcp -i ${source} \
            -c:v libx264 -b:v 1024k -preset ultrafast \
            -bf 0 \
            -f rtsp rtsp://${trans_host}:8554/${streamId}`,
            runOnReadRestart: true,
          }
        : { source };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: trans_token,
        },
        body: JSON.stringify(payload),
      };
      const res = await fetch(
        `${api_server}/v3/config/paths/add/${streamId}`,
        requestOptions
      );
      return res;
    },
    delOnePath: async (streamId) => {
      fetch(`${api_server}/v3/config/paths/delete/${streamId}`, {
        headers: {
          Authorization: trans_token,
        },
      });
    },
  },

  delayDeleteStream: async (rtsp_url) => {
    const streamId = tools.getUUID(rtsp_url);
    if (!window.timers) {
      window.timers = {};
    }
    const timers = window.timers;
    timers[streamId] = setTimeout(() => {
      tools.reqs.delOnePath(streamId);
      delete timers[streamId];
    }, 1000 * 60 * 60 * 6); // 6小时后自动删除streamId
  },
};

const vElRef = ref(null);

const initVideo = async () => {
  if (!props.url) return;
  if (HlsJS.isSupported()) {
    const vEl = vElRef.value;
    const m3u8Url = await tools.getStreamUrl(props.url);
    const hls = new HlsJS();
    hls.loadSource(m3u8Url);
    hls.attachMedia(vEl);
  }
};

watch(
  () => props.url,
  () => {
    initVideo();
  }
);
onMounted(() => {
  initVideo();
});
onBeforeMount(() => {
  tools.delayDeleteStream(props.url);
});
</script>

<style lang="css" scoped>
.kt-rtsp-player,
.video-inner {
  width: 100%;
  height: 100%;
  object-fit: fill;
  background-color: black;
}
</style>
