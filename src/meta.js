import { reactive } from "vue";

// 全局共享的响应式数据
const meta = reactive({
  isPixel: true,
  globalLoading:true
});

export default meta;
