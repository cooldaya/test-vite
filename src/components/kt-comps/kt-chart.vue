<template>
  <div class="kt-chart" ref="chartElRef"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from "vue";
import * as echarts from "echarts";

const chartElRef = ref(null);
let chartInstance = null;

const emits = defineEmits(["chart-click"]);
const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
  renderer: {
    type: String,
    default: "svg", //svg/canvas
  },
});

const debounce = (fun, delay) => {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fun();
    }, delay);
  };
};

//重绘图表函数
const resizeHandler = () => {
  chartInstance.resize();
};

const debouncedResizeHandler = debounce(resizeHandler, 200);

//页面成功渲染，开始绘制图表
onMounted(() => {
  //配置为 svg 形式，预防页面缩放而出现模糊问题；图表过于复杂时建议使用 Canvas

  if(!['svg', 'canvas'].includes(props.renderer)) throw new Error('renderer must be svg or canvas')

  chartInstance = echarts.init(chartElRef.value, null, {
    renderer: props.renderer,
  });
  chartInstance.on("click", (item) => {
    emits("chart-click", item);
  });

  chartInstance.setOption(props.option, true);
  //自适应不同屏幕时改变图表尺寸
  window.addEventListener("resize", debouncedResizeHandler);
});

//监听图表数据时候变化，重新渲染图表
watch(
  () => props.option,
  () => {
    chartInstance.setOption(props.option, true);
  },
  { deep: true },
);

onBeforeUnmount(() => {
  window.removeEventListener("resize", debouncedResizeHandler);
  chartInstance.dispose();
});
</script>

<style scoped>
.kt-chart {
  width: 100%;
  height: 100%;
}
</style>
