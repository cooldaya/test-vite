import { onBeforeUnmount } from "vue";

export default function useIntervalCall(callback, interval) {
  let intervalId = null;

  function start() {
    intervalId = setInterval(callback, interval);
  }
  start();

  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });

  const cancelInterval = ()=>{
    clearInterval(intervalId);
  }

  return cancelInterval;
}
