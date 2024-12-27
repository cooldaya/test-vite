/**
 * 清除Three.js中的场景、渲染器和其他相关资源
 *
 * @param scene 要清除的场景对象
 * @param renderer 要清除的渲染器对象
 * @returns 返回一个Promise，表示清除操作是否成功
 */
export function clearThreeData(scene, renderer) {
  if (window.Bol3D && !window.THREE) window.THREE = window.Bol3D;
  return new Promise((resolve, reject) => {
    console.log(scene, renderer);

    // 清除循环
    cancelAnimationFrame(window.loopId);
    window.loopId = null;
    // 清除scene、renderer、TWEEN
    scene.traverse((child) => {
      if (child.material && child.material instanceof Array) {
        // 如果材质是数组，遍历销毁每个材质
        child.material.forEach((material) => {
          if (material.map) {
            material.map.dispose(); // 释放纹理
          }
          material.dispose(); // 释放材质
        });
      } else if (child.material) {
        child.material.dispose();
        if (child.material.map) {
          child.material.map.dispose();
        }
      }
      if (child.geometry) {
        child.geometry.dispose();
        child.geometry.attributes = null; // 这些属性包括position, normal, uv等等
      }

      // 销毁光照
      if (child.isLight) {
        if (child.shadow) {
          if (child.shadow.map) {
            child.shadow.map.dispose(); // 释放阴影贴图
          }
          child.shadow.camera = null; // 清除阴影摄像机引用
        }
        child.dispose(); // 如果存在 dispose 方法，调用它
      }
      child = null;
    });
    // 销毁背景纹理
    if (scene.background) {
      if (
        scene.background instanceof THREE.Texture ||
        scene.background instanceof THREE.CubeTexture
      ) {
        scene.background.dispose(); // 释放背景纹理
      }
      scene.background = null; // 清空 background 属性
    }

    // 销毁环境贴图
    if (scene.environment) {
      if (
        scene.environment instanceof THREE.Texture ||
        scene.environment instanceof THREE.DataTexture
      ) {
        scene.environment.dispose(); // 释放环境纹理
      }
      scene.environment = null; // 清空 environment 属性
    }
    let gl = renderer.domElement.getContext("webgl");
    gl && gl.getExtension("WEBGL_lose_context").loseContext();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement = null;
    renderer.content = null;
    scene.clear();
    scene = null;
    renderer = null;
    if (window.orbit) {
      window.orbit.dispose();
      window.orbit = null;
    }
    if (window.TWEEN) {
      const tweens = window.TWEEN.getAll();
      tweens.forEach((tween) => {
        tween.stop();
      });
      window.TWEEN.removeAll();
      window.TWEEN = null;
    }
    // 清除点击事件
    if (window.threeClickEvent) {
      document.removeEventListener("click", window.threeClickEvent);
      window.threeClickEvent = null;
    }
    // 清除移动事件
    if (window.threeMoveEvent) {
      document.removeEventListener("mousemove", window.threeMoveEvent);
      window.threeMoveEvent = null;
    }
    // 移除resize事件
    if (window.threeResizeEvent) {
      window.removeEventListener("resize", window.threeResizeEvent);
      window.threeResizeEvent = null;
    }
    // 关闭socket连接
    if (window.socket) {
      window.socket.close();
      window.socket = null;
    }

    resolve(true);
  });
}
