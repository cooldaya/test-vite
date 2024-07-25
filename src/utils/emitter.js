import mitt from "mitt";
import { onBeforeUnmount } from "vue";

export const emitter = mitt();

// 批量监听事件
export const onEvents = (events = {}) => {
  for (const event in events) {
    emitter.on(event, events[event]);
  }
};

// 批量移除监听事件
export const offEvents = (events = {}) => {
  for (const event in events) {
    emitter.off(event, events[event]);
  }
};

// 触发事件
export const emitEvent = (event, data) => {
  emitter.emit(event, data);
};

// 组件里监听事件 (组件销毁时自动移除监听)
export const compOnEvents = (events) => {
  onEvents(events);
  onBeforeUnmount(() => {
    offEvents(events);
  });
};

// 定时刷新触发事件
// App.vue里使用 setIntervalEmit('kt-refresh', 'data-refresh', 60 * 1000)
export const setIntervalEmit = (
  interval = 60 * 1000,
  event = "kt-refresh",
  data = "data-refresh",
) => {
  const timer = setInterval(() => {
    emitEvent(event, data);
  }, interval);
  onBeforeUnmount(() => {
    clearInterval(timer);
  });
};
