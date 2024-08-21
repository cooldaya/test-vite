<template>
  <div class="kt-page">
    <kt-left>
      <div class="h-[300px]">
        <kt-chart :option="option" />
      </div>
      <div class="kt-border h-[300px] w-[200px]">
        <kt-anime-scroll>
          <div>
            {{ testText }}
          </div>
        </kt-anime-scroll>
      </div>
      <div class="h-[260px] w-full">
        <kt-table
          :columns="tableConfig.columns"
          :data="tableConfig.data"
          :s-speed="3"
        ></kt-table>
      </div>
    </kt-left>
    <kt-right
      ><div class="absolute text-[50px]">
        <div>{{ META.name }}</div>
        <div>{{ META.count }}</div>
        <div class="kt-border h-[80px] w-[80px]">
          <kt-lottie-player
            path="https://lottie.host/149984a5-de21-49e6-97f5-0d9094a4295a/r26yfFci8q.json"
          />
        </div>
      </div>
    </kt-right>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getCompImg } from "@utils/get-assets";
import META from "@/meta";
import KtLottiePlayer from "@/components/lib-comps/kt-lottie-player.vue";
import { getWeatherInfo } from "@apis/common";
import useIntervalCall from '@hooks/useIntervalCall'

const imgUrl = getCompImg("RE4wqI5.jfif");

const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

const tableConfig = reactive({
  columns: [
    {
      label: "序号",
      prop: "k1",
      dir: "center",
    },
    {
      label: "告警设备",
      prop: "k2",
    },
    {
      label: "告警区域",
      prop: "k3",
    },
    {
      label: "告警详情",
      prop: "k4",
    },
    {
      label: "告警时间",
      prop: "k5",
    },
    {
      label: "告警等级",
      prop: "k6",
      width: 6,
      dir: "center",
    },
  ],
  data: [],
});

const testText = ref("");

let m = 0;
useIntervalCall(() => {
  testText.value =
    m++ +
    `o convert this code into an ECMAScript module (ESM) format, you'll
            need to make a few adjustments. Here's how you can do it: Replace
            the IIFE (Immediately Invoked Function Expression) with proper
            import/export syntax. Remove any global variable definitions and
            replace them with local variables or exports. Ensure the code is
            encapsulated within a module. Here's the converted code: javascript
            复制代码 // ue.js - ESM version of the code // Define the 
            object and method let ue = {}; if (typeof
            ue !== "object" || typeof ue.interface !== "object") { if (typeof ue
            !== "object") ue = {}; ue.interface = {}; ue.interface.broadcast =
            function (e, t) { if (typeof e === "string") { let o = [e, ""]; if
            (t !== undefined) o[1] = t; const n =
            encodeURIComponent(JSON.stringify(o)); if (typeof history ===
            "object" && typeof history.pushState === "function") {
            history.pushState({}, "", "#" + n); history.pushState({}, "", "#" +
            encodeURIComponent("[]")); } else { document.location.hash = n;
            document.location.hash = encodeURIComponent("[]"); } } }; } else {
            (function (e) { ue.interface = {}; ue.interface.broadcast = function
            (t, o) { if (typeof t === "string") { if (o !== undefined) {
            e.broadcast(t, JSON.stringify(o)); } else { e.broadcast(t, ""); } }
            }; })(ue.interface); } // Export  as the default export export
            default ue; // Export  as a named export
            export const ue5 = ue.interface.broadcast; Explanation: The global
            variable ue is now treated as a local variable and exported. The
            function ue.interface.broadcast is now available as a named export
            ue5. The code is encapsulated within the module and ready to be used
            in an ESM environment. You can import it in another file like this:`;

  tableConfig.data = [
    {
      k1: 1,
      k2: "1Z15EOX01",
      k3: "设备类型3",
      k4: "wB2EIm#S",
      k5: "热力排风机5",
      k6: "1994-07-17 10:34:03",
      k7: "定位",
    },
    {
      k1: 2,
      k2: "1Z15ETH01",
      k3: "设备类型5",
      k4: "kfIz$*jf",
      k5: "热力排风机3",
      k6: "1983-12-02 08:27:35",
      k7: "定位",
    },
    {
      k1: 3,
      k2: "1Z15ETH02",
      k3: "设备类型3",
      k4: ")i*!Ezfs",
      k5: "热力排风机2",
      k6: "1990-09-12 08:29:46",
      k7: "定位",
    },
    {
      k1: 4,
      k2: "1Z15ECH401",
      k3: "设备类型3",
      k4: "rfGz@P2f",
      k5: "热力排风机8",
      k6: "1991-05-13 11:14:16",
      k7: "定位",
    },
    {
      k1: 5,
      k2: "1D01SCAM01",
      k3: "设备类型4",
      k4: "q4S7[HzX",
      k5: "热力排风机5",
      k6: "2020-11-19 04:38:04",
      k7: "定位",
    },
    {
      k1: 6,
      k2: "1D01SCAM03",
      k3: "设备类型4",
      k4: "e%(25^Xt",
      k5: "热力排风机1",
      k6: "2001-02-27 10:24:31",
      k7: "定位",
    },
    {
      k1: 7,
      k2: "1D02SCAM01",
      k3: "设备类型6",
      k4: "IR937[v0",
      k5: "热力排风机3",
      k6: "1971-12-15 13:58:16",
      k7: "定位",
    },
    {
      k1: 8,
      k2: "1Z15EOX01",
      k3: "设备类型5",
      k4: "0JyMzKoD",
      k5: "热力排风机6",
      k6: "2003-01-21 05:09:03",
      k7: "定位",
    },
    {
      k1: 9,
      k2: "1Z15ETH01",
      k3: "设备类型1",
      k4: "WylwxqH9",
      k5: "热力排风机8",
      k6: "2004-01-29 18:09:49",
      k7: "定位",
    },
    {
      k1: 10,
      k2: "1Z15ETH02",
      k3: "设备类型2",
      k4: "QG0Ozh0[",
      k5: "热力排风机8",
      k6: "2020-04-22 15:27:55",
      k7: "定位",
    },
  ];
}, 2000);

setInterval(() => {
  META.count++;
}, 1000);
</script>

<style lang="css" scoped></style>
