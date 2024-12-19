import { STATE } from "./STATE.js";
import { CACHE } from "./CACHE.js";
import { GUI } from "./GUI.js";
import TU from "./threeUtils";

// 相机动画（传指定state）
const targetPos = new Bol3D.Vector3();
const pos = new Bol3D.Vector3();
function cameraAnimation({
  cameraState,
  callback,
  delayTime = 0,
  duration = 800,
}) {
  targetPos.set(
    cameraState.target.x,
    cameraState.target.y,
    cameraState.target.z
  );
  pos.set(
    cameraState.position.x,
    cameraState.position.y,
    cameraState.position.z
  );

  if (
    targetPos.distanceTo(CACHE.container.orbitControls.target) < 0.1 &&
    pos.distanceTo(CACHE.container.orbitControls.object.position) < 0.1
  ) {
    callback && callback();
    return;
  }

  if (STATE.isAnimating) return;
  STATE.isAnimating = true;

  CACHE.container.orbitControls.enabled = false;

  let count = 0;

  const t1 = new Bol3D.TWEEN.Tween(
    CACHE.container.orbitControls.object.position
  )
    .to(
      {
        x: cameraState.position.x,
        y: cameraState.position.y,
        z: cameraState.position.z,
      },
      duration
    )
    .onUpdate(() => {})
    .onComplete(() => {
      count++;

      if (count == 2) {
        CACHE.container.orbitControls.enabled = true;
        STATE.isAnimating = false;
        callback && callback();
      }
    });

  t1.delay(delayTime).start();

  const t2 = new Bol3D.TWEEN.Tween(CACHE.container.orbitControls.target)
    .to(
      {
        x: cameraState.target.x,
        y: cameraState.target.y,
        z: cameraState.target.z,
      },
      duration
    )
    .onUpdate(() => {})
    .onComplete(() => {
      count++;
      if (count == 2) {
        CACHE.container.orbitControls.enabled = true;
        STATE.isAnimating = false;
        callback && callback();
      }
    });

  t1.delay(delayTime).start();
  t2.delay(delayTime).start();

  return t1;
}

function loadGUI() {
  // gui
  const gui = new dat.GUI();
  // default opts
  const deafultsScene = { distance: 8000 };
  // scenes
  const scenesFolder = gui.addFolder("场景");
  // toneMapping
  scenesFolder
    .add(CACHE.container.renderer, "toneMappingExposure", 0, 10)
    .step(0.001)
    .name("exposure");
  scenesFolder
    .add(CACHE.container.ambientLight, "intensity")
    .step(0.1)
    .min(0)
    .max(10)
    .name("环境光强度");
  scenesFolder.add(CACHE.container.gammaPass, "enabled").name("gamma校正");
  scenesFolder
    .addColor(CACHE.container.attrs.lights.directionLights[0], "color")
    .onChange((val) => {
      CACHE.container.directionLights[0].color.set(val);
    })
    .name("平行光颜色");
  scenesFolder.add(CACHE.container.directionLights[0].position, "x");
  scenesFolder.add(CACHE.container.directionLights[0].position, "y");
  scenesFolder.add(CACHE.container.directionLights[0].position, "z");
  scenesFolder.add(deafultsScene, "distance").onChange((val) => {
    CACHE.container.directionLights[0].shadow.camera.left = -val;
    CACHE.container.directionLights[0].shadow.camera.right = val;
    CACHE.container.directionLights[0].shadow.camera.top = val;
    CACHE.container.directionLights[0].shadow.camera.bottom = -val;
    CACHE.container.directionLights[0].shadow.camera.updateProjectionMatrix();
    CACHE.container.directionLights[0].shadow.needsUpdate = true;
  });
  scenesFolder
    .add(CACHE.container.directionLights[0].shadow.camera, "far")
    .onChange(() => {
      CACHE.container.directionLights[0].shadow.camera.updateProjectionMatrix();
      CACHE.container.directionLights[0].shadow.needsUpdate = true;
    });
  scenesFolder
    .add(CACHE.container.directionLights[0].shadow.camera, "near")
    .onChange(() => {
      CACHE.container.directionLights[0].shadow.camera.updateProjectionMatrix();
      CACHE.container.directionLights[0].shadow.needsUpdate = true;
    });
  scenesFolder
    .add(CACHE.container.directionLights[0].shadow, "bias")
    .step(0.0001)
    .onChange(() => {
      CACHE.container.directionLights[0].shadow.needsUpdate = true;
    });
  scenesFolder
    .add(CACHE.container.directionLights[0], "intensity")
    .step(0.1)
    .min(0)
    .max(10);

  // filter pass
  const filterFolder = gui.addFolder("滤镜");
  const defaultsFilter = {
    hue: 0,
    saturation: 1,
    vibrance: 0,
    brightness: 0,
    contrast: 1,
  };
  filterFolder.add(CACHE.container.filterPass, "enabled");
  filterFolder
    .add(defaultsFilter, "hue")
    .min(0)
    .max(1)
    .step(0.01)
    .onChange((val) => {
      CACHE.container.filterPass.filterMaterial.uniforms.hue.value = val;
    });
  filterFolder
    .add(defaultsFilter, "saturation")
    .min(0)
    .max(1)
    .step(0.01)
    .onChange((val) => {
      CACHE.container.filterPass.filterMaterial.uniforms.saturation.value = val;
    });
  filterFolder
    .add(defaultsFilter, "vibrance")
    .min(0)
    .max(10)
    .step(0.01)
    .onChange((val) => {
      CACHE.container.filterPass.filterMaterial.uniforms.vibrance.value = val;
    });

  filterFolder
    .add(defaultsFilter, "brightness")
    .min(0)
    .max(1)
    .step(0.01)
    .onChange((val) => {
      CACHE.container.filterPass.filterMaterial.uniforms.brightness.value = val;
    });
  filterFolder
    .add(defaultsFilter, "contrast")
    .min(0)
    .max(1)
    .step(0.01)
    .onChange((val) => {
      CACHE.container.filterPass.filterMaterial.uniforms.contrast.value = val;
    });
}

/**
 * 递归将模型添加到clickObjects（visible为false的不添加）
 * @param {Object3D} model 需要添加到clickObjects的模型
 * @param {Bol3D.container} evt 三维场景container
 * @returns
 */
function setPickable(model, evt) {
  const container = evt !== undefined ? evt : CACHE.container;
  if (!model.visible) return;
  if (model.isMesh) container.clickObjects.push(model);
  if (model.children && model.children.length > 0) {
    model.children.forEach((child) => {
      setPickable(child, container);
    });
  }
}

// 深度克隆
function cloneDeep(object, deep = true, cacheMap) {
  if (!cacheMap) cacheMap = new WeakMap();
  if (typeof object === "object" && object !== null) {
    const newObj = new object.constructor();

    cacheMap.set(object, newObj);
    for (const key of Object.keys(object)) {
      // 防止重复引用导致的死循环
      if (cacheMap.has(object[key])) {
        newObj[key] = cacheMap.get(object[key]);
        continue;
      }

      newObj[key] = deep ? cloneDeep(object[key], deep, cacheMap) : object[key];
    }

    return newObj;
  } else return object; // 基本数据类型
}

// ************************************************************* 在此添加你的 API *************************************************************

const createTip1 = () => {
  const tipObj = new Bol3D.POI.Popup2DObject({
    value: `<kt-cus-tip1 id="1"></kt-cus-tip1>`,
    position: [10, 10, 10],
    className: "device-icon",
    size: 1,
    closeVisible: false,
  });
  CACHE.container.scene.add(tipObj);
};

export const API = {
  cameraAnimation,
  loadGUI,
  setPickable,
  cloneDeep,
  createTip1
};
