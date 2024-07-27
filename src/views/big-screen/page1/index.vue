<template>
  <div>
    <kt-top> top </kt-top>
    <kt-left>
      <div class="h-[240px] w-full">
        <kt-chart :option="option" />
      </div>
    </kt-left>
    <kt-right> right </kt-right>
    <kt-bottom> bottom </kt-bottom>
  </div>
</template>

<script setup>
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
