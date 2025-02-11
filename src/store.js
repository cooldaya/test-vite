import { reactive } from "vue";

// 全局共享的响应式数据
const meta = reactive({
  isPixel: window.kt_config.use_pixel,
  globalLoading:true
});

export default meta;
