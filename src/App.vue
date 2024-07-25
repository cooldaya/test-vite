<script setup>
import docxUrl from "./assets/test.docx?url";
import { setIntervalEmit, compOnEvents } from "@/utils/emitter";

const events = {
  "kt-refresh": () => {
    console.log("refresh");
  },
};
compOnEvents(events);

setIntervalEmit(3 * 1000);
// sendToUE5("typ1", { msg: "hello ue5" });

</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
