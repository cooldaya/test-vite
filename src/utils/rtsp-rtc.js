class StreamController {
  host = location.hostname;
  token = "";
  reqTools = {};

  streamIdMap = new Map();

  streamLiveCountsMap = new Map(); // 某个地址当前正在播放的流的次数记录

  constructor(config) {
    const { host, username = "kt", password = "123" } = config;

    this.host = host;
    this.token = this.getToken(username, password);
    this.initReqTools();
  }

  getUUID(str) {
    // 根据url生成 streamId
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  getToken(username, password) {
    if (username && password) {
      return "Basic " + btoa(username + ":" + password);
    }
    return "";
  }

  initReqTools() {
    const urls = {
      api_server: `http://${this.host}:9997`,
    };

    const reqTools = (this.reqTools = {
      getPath: async (url) => {
        const streamId = this.getStreamId(url);
        const res = await fetch(`${urls.api_server}/v3/paths/get/${streamId}`, {
          headers: {
            Authorization: this.token,
          },
        });
        return res;
      },
      publishSource: async (url, toh264 = false) => {
        const streamId = this.getStreamId(url);
        const source_rul = (url + "").replace("#", "%23");
        const payload = toh264
          ? {
              runOnInit: `
              ffmpeg -rtsp_transport tcp -i ${source_rul} \
              -c:v libx264 -b:v 1024k -preset ultrafast \
              -bf 0 \
              -f rtsp rtsp://127.0.0.1:8554/${streamId}`,
              // runOnReadRestart: true,
              runOnReadRestart: true,
            }
          : {
              source: source_rul,
            };

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },

          body: JSON.stringify(payload),
        };

        const res = await fetch(
          `${urls.api_server}/v3/config/paths/add/${streamId}`,
          requestOptions
        );
        return res;
      },
      stopPath: async (url) => {
        const streamId = this.getStreamId(url);
        const res = await fetch(
          `${urls.api_server}/v3/config/paths/delete/${streamId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: this.token,
            },
          }
        );
        return res;
      },
      getRTCIframeUrl: async (url, toh264 = false) => {
        const streamId = this.getStreamId(url);
        const res1 = await reqTools.getPath(streamId);
        if (!res1.ok) {
          await reqTools.publishSource(url, toh264);
        }
        return `http://${this.host}:8889/${streamId}`;
      },
    });
    this.reqTools = reqTools;
  }

  getStreamId(url) {
    let streamId = this.streamIdMap.get(url);
    if (!streamId) {
      streamId = this.getUUID(url);
      this.streamIdMap.set(url, streamId);
    }
    return streamId;
  }

  async mountPlayer(config = {}) {
    const { url, el, toh264 } = config;
    if(!url) return;

    // 记录当前地址正在播放的流的次数
    const count = this.streamLiveCountsMap.get(url) || 0;
    this.streamLiveCountsMap.set(url, count + 1);

    const rtcIframeUrl = await this.reqTools.getRTCIframeUrl(url, toh264);
    const iframe = document.createElement("iframe");
    iframe.src = rtcIframeUrl;
    Object.assign(iframe.style, {
      width: "100%",
      height: "100%",
      border: "none",
    });
    el.innerHTML = "";
    el.appendChild(iframe);
  }

  stopStream(url){
    debugger
    const count = this.streamLiveCountsMap.get(url) || 0;
    if (count > 1) {
      // 当有其他地方在播放该流时，不停止
      this.streamLiveCountsMap.set(url, count - 1);
    } else {
      this.streamLiveCountsMap.delete(url);
      streamController.reqTools.stopPath(url);
    }
  }
}

const streamController = new StreamController({
  host: location.hostname,
});

window.streamController = streamController;
export const mountPlayer = (config) => {
  streamController.mountPlayer(config);
};

export const stopStream = (url) => {
  streamController.stopStream(url);
};
