import { reactive } from "vue";

// 全局共享的响应式数据
const store = reactive({
  globalLoading: true,
  test_data: 1,
});

setInterval(() => {
  store.test_data += 1;
}, 1000);

export default store;
