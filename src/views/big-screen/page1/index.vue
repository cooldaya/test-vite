<template>
  <div class="kt-page">
    <kt-left>
      <div class="h-[300px]">
        <kt-chart :option="option" />
      </div>
      <div>
        {{ imgUrl }}
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
