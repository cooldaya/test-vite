const modules = import.meta.glob("../assets/imgs/comp/*.*", { eager: true });

for (const path in modules) {
  const src = modules[path].default;
  requestIdleCallback(() => {
    const img = new Image();
    img.src = src;
  });
}
