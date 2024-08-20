<template>
  <div class="kt-page">
    <kt-left>
      <div class="h-[300px]">
        <kt-chart :option="option" />
      </div>
      <div class="kt-border h-[300px] w-[200px]" >
        <kt-anime-scroll :a-speed="30">
          <div>
            o convert this code into an ECMAScript module (ESM) format, you'll
            need to make a few adjustments. Here's how you can do it: Replace
            the IIFE (Immediately Invoked Function Expression) with proper
            import/export syntax. Remove any global variable definitions and
            replace them with local variables or exports. Ensure the code is
            encapsulated within a module. Here's the converted code: javascript
            复制代码 // ue.js - ESM version of the code // Define the `ue`
            object and `ue.interface.broadcast` method let ue = {}; if (typeof
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
            }; })(ue.interface); } // Export `ue` as the default export export
            default ue; // Export `ue.interface.broadcast` as a named export
            export const ue5 = ue.interface.broadcast; Explanation: The global
            variable ue is now treated as a local variable and exported. The
            function ue.interface.broadcast is now available as a named export
            ue5. The code is encapsulated within the module and ready to be used
            in an ESM environment. You can import it in another file like this:
          </div>
        </kt-anime-scroll>
      </div>
    </kt-left>
    <kt-right
      ><div class="absolute -translate-x-[9px] text-[50px]">right</div>
    </kt-right>
  </div>
</template>

<script setup>
import { getCompImg } from "@/utils/get-assets";

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
</script>

<style lang="css" scoped></style>
