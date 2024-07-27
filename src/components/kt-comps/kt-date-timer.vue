<template>
  <div class="kt-date-timer">
    <p>当前日期：{{ date }}</p>
    <p>当前时间：{{ time }}</p>
  </div>
</template>

<script setup>
import { useDateFormat, useNow } from "@vueuse/core";

const now = useNow();

const date = useDateFormat(now, "YYYY-MM-DD (ddd)", {
  locales: "zh-CN",
});

const time = useDateFormat(now, "HH:mm:ss", {
  locales: "zh-CN",
});
</script>

