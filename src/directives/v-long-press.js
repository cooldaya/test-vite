const LONG_PRESS_DURATION = window.LONG_PRESS_DURATION || 1000; // 长按持续时间，单位毫秒

export default {
  mounted(el, binding) {
    let timer;

    function startPress(event) {
      event.preventDefault();
      binding.value();
      timer = setInterval(() => {
        binding.value();
      }, LONG_PRESS_DURATION);
    }

    function endPress() {
      clearInterval(timer);
    }

    el.addEventListener("mousedown", startPress);
    el.addEventListener("touchstart", startPress);
    el.addEventListener("mouseup", endPress);
    el.addEventListener("touchend", endPress);
    el.addEventListener("mouseleave", endPress);
    el.addEventListener("touchcancel", endPress);
    el.ehandles = {
      startPress,
      endPress,
    };
  },

  unmounted(el) {
    const { startPress, endPress } = el.ehandles;
    el.removeEventListener("mousedown", startPress);
    el.removeEventListener("touchstart", startPress);
    el.removeEventListener("mouseup", endPress);
    el.removeEventListener("touchend", endPress);
    el.removeEventListener("mouseleave", endPress);
    el.removeEventListener("touchcancel", endPress);
  },
};
