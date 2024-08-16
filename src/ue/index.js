import ue, { ue5 } from "./linkUE";
import mitt from "mitt";
import { onBeforeUnmount } from "vue";

const emitter = mitt();

// 向UE发送消息
/**
 * 
 * @param {*} type we-event-name
 * @param {*} data {text:1}
 */
export const sendToUE = (type, data = {}) => {
  const params = {
    type,
    data,
  };

  console.log("WebToUE --web发送到UE数据-->", params);
  ue5("WebToUE", params);
};

// 提供给UE调用的接口
/**
 * 
 * @param {*} _params {type: string, data: object}
 */
ue.interface.UEemit = function (_params) {
  console.log('UEemit --UE发送到web数据-->', _params);

  let params = _params;
  if (typeof _params === "string") params = JSON.parse(_params);

  const { type, data } = params;
  emitter.emit(type, data);
};

// 监听UE消息
/**
 * 
 * @param {*} events {'ue-event-name':(data)=>{}}
 */
export const watchUEEvents = (events) => {
  for (const event in events) {
    emitter.on(event, events[event]);
  }

  onBeforeUnmount(() => {
    for (const event in events) {
      emitter.off(event, events[event]);
    }
  });
};
