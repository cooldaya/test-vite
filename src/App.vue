<script setup>
import docxUrl from "./assets/test.docx?url";
import { setIntervalEmit, compOnEvents } from "@/utils/emitter";
import { getXlsData } from "@/utils/xlsx-tools";
import xlsUrl from '@/assets/device-points.xls?url'

</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
