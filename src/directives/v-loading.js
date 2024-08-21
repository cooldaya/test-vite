import KtLottiePlayer from "@lib-comps/kt-lottie-player.vue"; // 动画组件
import { createApp } from "vue";

const iconAnimaUrl =
  "https://lottie.host/254c85c9-503e-4fd7-88e9-0bdb69137181/cuvyJJMQbF.json";

const directive = {
  mounted(el, binding) {
    const loadingMask = document.createElement("div");

    loadingMask.className = "loading-mask"; // 加载遮罩层样式
    const spinner = document.createElement("div"); // 加载动画组件container
    spinner.className = "spinner";
    Object.assign(spinner.style, {
      width: "60%",
      height:'60%',
      margin: "auto",
    });
    loadingMask.appendChild(spinner);

    const loadingMaskInstance = createApp(KtLottiePlayer, {
      path: iconAnimaUrl,
    });
    loadingMaskInstance.mount(spinner);

    Object.assign(loadingMask.style, {
      position: "absolute",
      inset: "0",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      display: "flex",
      zIndex: "1000",
      pointerEvents: "none",
    });
    el.loadingMask = loadingMask;

    if (binding.value) {
      el.style.position = "relative";
      el.appendChild(el.loadingMask);
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        el.style.position = "relative";
        el.appendChild(el.loadingMask);
      } else {
        el.removeChild(el.loadingMask);
      }
    }
  },
};

export default directive;
