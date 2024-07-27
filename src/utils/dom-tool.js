export const remoteAnimate = (event) => {
  const el = event.target;
  const className = el.className + "";
  const _className = className.replace(/\s?animate__\w+/g, "").replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
  el.className = _className;
};
