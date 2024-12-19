import { defineCustomElement } from "vue";
const modules = import.meta.glob("./*.ce.vue", {
  eager: true,
});

for (let path in modules) {
  const module = modules[path];
  const matchs = path.match(/\/(.*)\.ce\.vue$/);
  if (!matchs) continue;
  const name = "kt-cus-" + (matchs[1] + "").toLowerCase();

  const KtCusEl = defineCustomElement(module.default, {
    shadowRoot: false,
  });

  customElements.define(name, KtCusEl);
}
