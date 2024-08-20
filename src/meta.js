import { reactive } from "vue";

// 全局共享的响应式数据
const meta = reactive({
  name: "nihao1",
  count: 0,
});

export default meta;
