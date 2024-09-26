export const remoteAnimate = (event) => {
  const el = event.target;
  const className = el.className + "";
  const _className = className.replace(/\s?animate__\w+/g, "").replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
  el.className = _className;
};


// 给元素添加单机、双击事件，可以区分开, 使用这个单机会有延迟
export function bindClickAndDoubleClick(config = {}) {
  const { el, onclick, ondblclick, delay = 100 } = config;
  if (!(el instanceof HTMLElement)) return;
  let timer = null;
  const handleFn = (e) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      return ondblclick?.(e);
    }
    timer = setTimeout(() => {
      onclick?.(e);
      timer = null;
    }, delay);
  };
  // el.onclick = handleFn;
  el.addEventListener("click", handleFn);
}


// 拖动实现滚动条滑动
export const enableDragScroll = (container) => {
  let isDragging = false;
  let startX, startY, initialScrollLeft, initialScrollTop;

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    startY = e.pageY;
    initialScrollLeft = container.scrollLeft;
    initialScrollTop = container.scrollTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    const dy = e.pageY - startY;
    container.scrollLeft = initialScrollLeft - dx;
    container.scrollTop = initialScrollTop - dy;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  document.addEventListener("mouseleave", () => {
    isDragging = false;
  });
};
