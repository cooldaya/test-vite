import TU from "../threeUtils";
import { CACHE } from "../CACHE.js";
import { API } from "../API.js";
import { STATE } from "../STATE.js";
import { GUI } from "../GUI.js";
import store from "@/store";

export default function onLoad(container) {
  store.globalLoading = false; // 全局loading
  window.container = container;
  CACHE.container = container;
  window.CACHE = CACHE;
  window.API = API;
  window.TU = TU;
  window.STATE = STATE;
  window.GUI = GUI;
  TU.init(container, Bol3D);
  init();
}

function init() {
  // 粒子初始化
  initParticle();
  API.createTip1();
}

function initParticle() {
  const particlesOpts = {
    uuid: "520FE4E4-71A0-4049-98C1-4001C6E99CAB",
    name: "Particle",
    type: "smoke",
    options: {
      position: [0, 0, 0],
      direction: [0, 1, 0],
      scale: [500, 500, 500],
      renderOrder: 1,
      visible: true,
      color: "#cccccc",
      size: 100,
      width: 0,
      height: 0,
      depth: 0,
      numbers: 100,
      type: "smoke",
    },
  };

  const particles = new Bol3D.Primitives.BaseParticles(particlesOpts.options);
  const smokeMap = new Bol3D.TextureLoader().load(
    `/assets/3d/editor/smoke.png`,
  );
  particles.material.uniforms.map.value = smokeMap;
  particles.material.uniforms.useMap.value = 1;
  particles.scale.set(500, 500, 500);
  particles.startSmokeSimulation();
  CACHE.container.particlesGroup.add(particles);
}
