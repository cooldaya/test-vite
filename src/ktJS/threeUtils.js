let container$1 = null;
let Bol3D$1 = null;
/**
 * 初始化 TU
 * @date 2023-05-06
 * @param {any} scene container 
 * @param {any} bol3d Bol3D
 * @returns {any}
 */
function init(scene, bol3d) {
  container$1 = scene;
  Bol3D$1 = bol3d;
}

class MapAnimation {
    /**
     * 描述
     * @date 2023-02-15
     * @param {any} mesh  目标 mesh 对象
     * @param {number} offset  偏移量
     * @param {'x'|'y'|'all'} [axis] axis='x'  偏移方向
     */
    constructor(mesh, offset, axis = 'x') {
        this.mesh = mesh;
        this.offset = offset;
        this.axis = axis;
        this.rAFid = null;
    }
    /**
     * 动画开始
     * @date 2023-02-15
     * @param {any} callback 回调, 返回一个 mesh 参数
     */
    start(callback) {
        const offset = this.mesh.material.map.offset;
        const targetOffsetAxis = offset[this.axis];
        const offsetArry = [];
        if (this.axis == 'x') {
            offsetArry[0] = targetOffsetAxis + this.offset;
            offsetArry[1] = offset.y;
        } else if (this.axis == 'y') {
            offsetArry[0] = offset.x;
            offsetArry[1] = targetOffsetAxis + this.offset;
        } else {
            offsetArry[0] = offset.x + this.offset;
            offsetArry[1] = offset.y + this.offset;
        }
        this.mesh.material.map.offset.set(...offsetArry);
        this.rAFid = requestAnimationFrame(this.start.bind(this, callback));
        callback?.(this.mesh);
    }
    /**
     * 动画停止
     * @date 2023-02-15
     */
    stop() {
        cancelAnimationFrame(this.rAFid);
    }

}

class Roam {
  /**
   * 漫游
   * @date 2023-05-10
   * @param {any[object]} positionArr 位置数组 [{time：补间时间，position：相机 position 位置，target：相机 target 位置,onComplete：补间动画完成后的回调}]
   */
  constructor(positionArr, parameter = {}) {
    const { loop = false } = parameter;
    this.loop = loop;
    this.t1arr = [];
    this.t2arr = [];
    this.positionArr = positionArr;
    this.init();
  }
  init() {
    this.positionArr.forEach(position => {
      const item = Object.assign({}, position);
      var _t1 = new Bol3D$1.TWEEN.Tween(container$1.orbitCamera).to(
        {
          position: new Bol3D$1.Vector3(...item.position)
        },
        item.time
      );
      var _t2 = new Bol3D$1.TWEEN.Tween(container$1.orbitControls).to(
        {
          target: new Bol3D$1.Vector3(...item.target)
        },
        item.time
      );
      if (item.onComplete) {
        _t1.onComplete(() => {
          item.onComplete();
        });
      }
      this.t1arr.push(_t1);
      this.t2arr.push(_t2);
    });

    const finallyLength = this.t1arr.length - 1;
    for (let index = 0; index < this.t1arr.length; index++) {
      const num = index + 1;
      if (num <= finallyLength) {
        this.t1arr[index].chain(this.t1arr[index + 1]);
        this.t2arr[index].chain(this.t2arr[index + 1]);
      }
      if (this.loop) {
        this.t1arr[finallyLength].chain(this.t1arr[0]);
        this.t2arr[finallyLength].chain(this.t2arr[0]);
      }
    }
  }
  /**
   * 终止漫游
   * @date 2023-05-12
   */
  stop() {
    this.t1arr.forEach(t => t.stop());
    this.t2arr.forEach(t => t.stop());
  }
  /**
   * 开始漫游
   * @date 2023-05-10
   */
  start() {
    this.stop();
    this.t1arr[0].start();
    this.t2arr[0].start();
  }
  /**
   * 暂停漫游
   * @date 2023-05-10
   */
  pause() {
    this.t1arr.forEach(item => item.pause());
    this.t2arr.forEach(item => item.pause());
  }
  /**
   * 继续漫游
   * @date 2023-05-10
   */
  resume() {
    this.t1arr.forEach(item => item.resume());
    this.t2arr.forEach(item => item.resume());
  }
}

class ModelTWEEN {
  /**
   * 动画
   * @date 2023-05-10
   * @param {any[object]} optionsArr 动画参数
   * @param {any[object]} parameter  动画配置项
   */
  constructor(model, optionsArr, parameter = {}) {
    const { loop = false } = parameter;
    this.loop = loop;
    this.t1arr = [];
    this.optionsArr = optionsArr;
    this.model = model;
    this.init();
  }
  init() {
    this.optionsArr.forEach(option => {
      const item = Object.assign({}, option);
      const noTimeItem = omit(item, 'time');
      const _t1 = new Bol3D.TWEEN.Tween(this.model).to(
        noTimeItem,
        item.time
      );
      this.t1arr.push(_t1);

    });

    const finallyLength = this.t1arr.length - 1;
    for (let index = 0; index < this.t1arr.length; index++) {
      const num = index + 1;
      if (num <= finallyLength) {
        this.t1arr[index].chain(this.t1arr[index + 1]);
      }
      if (this.loop) {
        this.t1arr[finallyLength].chain(this.t1arr[0]);
      }
    }
  }
  /**
   * 终止动画
   * @date 2023-05-12
   */
  stop() {
    this.t1arr.forEach(t => t.stop());
  }
  /**
   * 开始动画
   * @date 2023-05-10
   */
  start() {
    this.stop();
    this.t1arr[0].start();
  }
  /**
   * 暂停动画
   * @date 2023-05-10
   */
  pause() {
    this.t1arr.forEach(item => item.pause());
  }
  /**
   * 继续动画
   * @date 2023-05-10
   */
  resume() {
    this.t1arr.forEach(item => item.resume());
  }
}

const omit = (obj, arr) => {
  return Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {})
};

//缓冲条样式
var KT_cl, KT_loadText, KT_loading, KT_cbox;
var lightLoader = function (c, cw, ch) { var _this = this; this.c = c; this.ctx = c.getContext("2d"); this.cw = cw; this.ch = ch; this.loaded = 0; this.loaderSpeed = 0.6; this.loaderHeight = 10; this.loaderWidth = 310; this.loader = { x: (this.cw / 2) - (this.loaderWidth / 2), y: (this.ch / 2) - (this.loaderHeight / 2) }; this.particles = []; this.particleLift = 180; this.hueStart = 0; this.hueEnd = 120; this.hue = 0; this.gravity = 0.15; this.particleRate = 4; this.init = function () { this.loop(); }; this.rand = function (rMi, rMa) { return ~~((Math.random() * (rMa - rMi + 1)) + rMi) }; this.hitTest = function (x1, y1, w1, h1, x2, y2, w2, h2) { return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1) }; this.updateLoader = function () { if (this.loaded < 100) { this.loaded = this.loaderSpeed; } }; this.renderLoader = function () { this.ctx.fillStyle = "#000"; this.ctx.fillRect(this.loader.x, this.loader.y, this.loaderWidth, this.loaderHeight); this.hue = this.hueStart + (this.loaded / 100) * (this.hueEnd - this.hueStart); var newWidth = (this.loaded / 100) * this.loaderWidth; this.ctx.fillStyle = "hsla(" + this.hue + ", 100%, 40%, 1)"; this.ctx.fillRect(this.loader.x, this.loader.y, newWidth, this.loaderHeight); this.ctx.fillStyle = "#222"; this.ctx.fillRect(this.loader.x, this.loader.y, newWidth, this.loaderHeight / 2); }; this.Particle = function () { this.x = _this.loader.x + ((_this.loaded / 100) * _this.loaderWidth) - _this.rand(0, 1); this.y = _this.ch / 2 + _this.rand(0, _this.loaderHeight) - _this.loaderHeight / 2; this.vx = (_this.rand(0, 4) - 2) / 100; this.vy = (_this.rand(0, _this.particleLift) - _this.particleLift * 2) / 100; this.width = _this.rand(1, 4) / 2; this.height = _this.rand(1, 4) / 2; this.hue = _this.hue; }; this.Particle.prototype.update = function (i) { this.vx += (_this.rand(0, 6) - 3) / 100; this.vy += _this.gravity; this.x += this.vx; this.y += this.vy; if (this.y > _this.ch) { _this.particles.splice(i, 1); } }; this.Particle.prototype.render = function () { _this.ctx.fillStyle = "hsla(" + this.hue + ", 100%, " + _this.rand(50, 70) + "%, " + _this.rand(20, 100) / 100 + ")"; _this.ctx.fillRect(this.x, this.y, this.width, this.height); }; this.createParticles = function () { var i = this.particleRate; while (i--) { this.particles.push(new this.Particle()); } }; this.updateParticles = function () { var i = this.particles.length; while (i--) { var p = this.particles[i]; p.update(i); } }; this.renderParticles = function () { var i = this.particles.length; while (i--) { var p = this.particles[i]; p.render(); } }; this.clearCanvas = function () { this.ctx.globalCompositeOperation = "source-over"; this.ctx.clearRect(0, 0, this.cw, this.ch); this.ctx.globalCompositeOperation = "lighter"; }; this.loop = function () { var loopIt = function () { requestAnimationFrame(loopIt, _this.c); _this.clearCanvas(); _this.createParticles(); _this.updateLoader(); _this.updateParticles(); _this.renderLoader(); _this.renderParticles(); }; loopIt(); }; };var setupRAF = function () { var lastTime = 0; var vendors = ["ms", "moz", "webkit", "o"]; for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) { window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"]; window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"]; } if (!window.requestAnimationFrame) { window.requestAnimationFrame = function (callback, element) { var currTime = new Date().getTime(); var timeToCall = Math.max(0, 16 - (currTime - lastTime)); var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall); lastTime = currTime + timeToCall; return id }; } if (!window.cancelAnimationFrame) { window.cancelAnimationFrame = function (id) { clearTimeout(id); }; } };


function create() {
    //背景底纹
    KT_loading = document.createElement('div');
    KT_loading.style.background = '#222 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEUqKiopKSkoKCgjIyMuLi4kJCQtLS0dJckpAAAAO0lEQVR42iXLAQoAUQhCQSvr/kfe910jHIikElsl5qVFa1iE5f0Pom/CNZdbNM6756lQ41NInMfuFPgAHVEAlGk4lvIAAAAASUVORK5CYII=")';
    KT_loading.style.position = "absolute";
    KT_loading.style.width = "100%";
    KT_loading.style.height = "100%";
    KT_loading.style.zIndex = "2";
    KT_loading.style.display = "block";
    KT_loading.style.top = "0px";
    KT_loading.style.left = "0px";
    document.body.appendChild(KT_loading);

    //进度文字
    KT_loadText = document.createElement('div');
    KT_loadText.style.position = "absolute";
    KT_loadText.style.width = "40px";
    KT_loadText.style.height = "20px";
    KT_loadText.style.top = "50%";
    KT_loadText.style.marginTop = "-30px";
    KT_loadText.style.left = "50%";
    KT_loadText.style.marginLeft = "-20px";
    KT_loadText.style.color = "#ff0000";
    KT_loadText.style.fontSize = "14px";
    KT_loadText.style.textAlign = "center";
    KT_loadText.innerHTML = "0%";
    KT_loading.appendChild(KT_loadText);

    //进度条
    KT_cbox = document.createElement('canvas');
    KT_cbox.style.position = "absolute";
    KT_cbox.style.width = "400px";
    KT_cbox.style.height = "150px";
    KT_cbox.style.zIndex = "99";
    KT_cbox.style.top = "50%";
    KT_cbox.style.marginTop = "-75px";
    KT_cbox.style.left = "50%";
    KT_cbox.style.marginLeft = "-230px";
    KT_loading.appendChild(KT_cbox);
    KT_cl = new lightLoader(KT_cbox, 400, 150);
}


function update(percentComplete) {
    KT_cl.loaderSpeed = Math.round(percentComplete) * 0.85;                              //进度条
    KT_loadText.innerHTML = Math.round(percentComplete) + '%';                           //进度文字
    KT_loadText.style.color = 'hsla(' + Math.round(percentComplete) + ', 100%, 40%, 1)';   //进度文字颜色
    // if (percentComplete >= 100) document.body.removeChild(KT_loading)
}


function remove() {
    KT_loading && document.body.removeChild(KT_loading);
}

const progress = {
    init: () => {
        create();
        setupRAF();
        KT_cl.init();
    },
    update,
    remove,
};

/** 模型聚焦
 * @date 2023-01-31
 * @param {array}    position      // 点坐标
 * @param {array}    target        // 视角坐标
 * @param {number}   [times=1000]  // 聚焦动画时间 默认 1000 毫秒
 * @param {Function} [doit]        // 回调函数
 */
function focus(position, target, times = 1000, doit) {
  new Bol3D$1.TWEEN.Tween(container$1.orbitCamera)
    .to({
      position: new Bol3D$1.Vector3(...position)
    }, times)
    .start();
  new Bol3D$1.TWEEN.Tween(container$1.orbitControls)
    .to({
      target: new Bol3D$1.Vector3(...target)
    }, times)
    .start()
    .onComplete(function () {
      doit?.();
    });
}

/** 切换模型
 * @date 2023-01-31
 * @param {array | string} names  // 要显示的模型名字（除此模型以外都隐藏或显示）
 */
function toggleModel(names, isShow = true) {
  names = Array.isArray(names) ? names : [names];
  container$1.sceneModels.forEach(model => model.visible = names.includes(model.name));
}

/** 显示隐藏模型
 * @date 2023-01-31
 * @param {string | array} names  // 要显示的模型名字
 * @param {boolean} [isShow=true]      // true 显示模型，false 隐藏模型，（默认隐藏）
 */
function showModel(names, isShow = true) {
  names = Array.isArray(names) ? names : [names];
  names.forEach(name => container$1.sceneModels[name].visible = isShow);
}

/** 获取 visible 为 true 的模型
 * @date 2023-01-31
 * @returns {any}   // 返回 visible 为 true 的模型
 */
function getShowModel() {
  return container$1.sceneModels.filter(item => item.visible)
}

/** 获取 visible 为 false 的模型
 * @date 2023-01-31
 * @returns {any}   // 返回 visible 为 false 的模型
 */
function getHideModel() {
  return container$1.sceneModels.filter(item => !item.visible)
}

/** 设置透明度
 * @date 2023-01-31 
 * @param {any} meshs               // mesh 的类型数组
 * @param {number} num              // 透明度 0~1
 * @param {boolean} [isTran=true]   // 可选：true 透明，false 不透明，（默认透明）
 */
function setOpacity(meshs, num, isTran = true) {
  getMesh(meshs).forEach(mesh => {
    mesh.material.transparent = isTran;
    mesh.material.opacity = num;
  });
}

/** 设置颜色
 * @date 2023-01-31
 * @param {any} meshs   // 要查找的元素
 * @param {color} color // 颜色 16 进制
 */
function setColor(meshs, color) {
  getMesh(meshs).forEach(item => item.material.color.set(color));
}

/** 查找 mesh 元素
 * @date 2023-01-31
 * @param {array | object} data   // 要查找的元素
 * @returns {array}    // 返回结果
 */
function getMesh(data) {
  const meshList = [];
  function _getMesh(list) {
    list.forEach(a => {
      if (a.isMesh) meshList.push(a);
      else {
        a.children?.forEach(a => _getMesh([a]));
      }
    });
  }
  data = Array.isArray(data) ? data : [data];
  _getMesh(data);
  return meshList
}

/** 创建镜面物体
 * @date 2023-01-31
 * @param {object} option
 * @param {array} [option.size=[10000, 10000]] // 镜面大小默认 [10000,10000]
 * @param {color} [option.color=0xffffff]  // 镜面颜色
 * @returns {any}               //创建的镜面物体对象
 */
function createMirror(option = {}) {
  const { size = [10000, 10000], color = 0xffffff } = option;
  const geometry = new Bol3D$1.PlaneGeometry(...size);
  const verticalMirror = new Bol3D$1.Reflector(geometry, {
    clipBias: 0.0003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color
  });
  verticalMirror.material.transparent = false;
  return verticalMirror
}



/**
 * 虚化场景
 * @date 2023-04-19
 * @param {any} target
 * @param {object} options
 * @param {any} [options.color]  虚化颜色
 * @param {any} [options.lineColor]  线颜色
 */
function onFadeModel(target, options = {}) {
  const { lineColor = "#36BCFF", color = "#009EFF" } = options;
  let buildMaterial = new Bol3D$1.MeshBasicMaterial({
    color,     // 颜色
    transparent: true,    // 是否开启使用透明度
    opacity: 0.25,        // 透明度
    depthWrite: false,    // 关闭深度写入 透视效果
    side: Bol3D$1.DoubleSide, // 双面显示
  });
  // 建筑线材质
  let lineMaterial = new Bol3D$1.LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    side: Bol3D$1.DoubleSide,
  });
  target.traverse(child => {
    if (child.isMesh) {
      if (!child.userData.initMaterial) child.userData.initMaterial = child.material.clone();
      child.userData.fadeMaterial = buildMaterial;
      child.material = buildMaterial;
      if (child.geometry) {
        const edges = new Bol3D$1.EdgesGeometry(
          child.geometry
        );
        const line = new Bol3D$1.LineSegments(
          edges,
          lineMaterial                      // 赋线条材质
        );
        const oldLine = child.children.find(item => item.isLineSegments);
        oldLine && child.remove(oldLine);
        child.add(line);                     // 把每一个mesh生成的线条添加到场景中
      }
    }
  });
}


/**
 * 还原虚化场景
 * @date 2023-04-19
 * @param {any} target
 */
function offFadeModel(target) {
  target.traverse(child => {
    if (child.isMesh) {
      child.userData.initMaterial && (child.material = child.userData.initMaterial);
      child.traverse(item => {
        if (item.isLineSegments) {
          item.visible = false;
        }
      });
    }
  });
}

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  focus: focus,
  toggleModel: toggleModel,
  showModel: showModel,
  getShowModel: getShowModel,
  getHideModel: getHideModel,
  setOpacity: setOpacity,
  setColor: setColor,
  getMesh: getMesh,
  createMirror: createMirror,
  onFadeModel: onFadeModel,
  offFadeModel: offFadeModel
});

const toZhangHang = {
  MapAnimation,
  Roam,
  ModelTWEEN,
  progress,
  ...api,
};

/**
 * 输出一个shader基本框架
 * 材质赋值 看源码中的注释
 * @returns shaderConfig
 */
function shaderTemplate() {
  const shaderConfig = {
    uniform: {
      iTime: { value: 0 }
    },
    vertexShader: `
      // 解决深度问题
      #include <logdepthbuf_pars_vertex>
      #include <common>

      // 获取时间 颜色 位置 uv信息等基本属性
      uniform float iTime;
      varying vec3 vColor;
      varying vec3 vPosition;
      varying vec2 vUv;

      
      void main() { 
        // 输出位置 uv信息
        vPosition = vec3(position.x, position.y, position.z);
        vUv = vec2(uv.x, uv.y);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);

        // 解决深度问题
        #include <logdepthbuf_vertex>
      } 
    `,
    // 片元着色器
    fragmentShader: ` 
      // 解决深度问题
      #include <logdepthbuf_pars_fragment>
      #include <common>

      // 接收位置
      uniform float iTime;
      varying vec3 vPosition;
      varying vec2 vUv;
      float x;
      float y;
      float z;

      void main() {
        x = vPosition.x / 1.0 + 0.5;  // 除以模型长宽高的 x  +0.5是让坐标系变为0-1(居中)
        y = vPosition.y / 1.0 + 0.5;  // 除以模型长宽高的 y  +0.5是让坐标系变为0-1(居中)
        z = vPosition.z / 1.0 + 0.5;  // 除以模型长宽高的 z  +0.5是让坐标系变为0-1(居中)

        // 用 position 位置信息
        // gl_FragColor = vec4(x, y, z, 1.0);

        // 用 uv 信息
        gl_FragColor = vec4(vUv.x, 0.8, vUv.y, 1.0);

        // 解决深度问题
        #include <logdepthbuf_fragment>
      }
    `
  };

  // const mat = new Bol3D.ShaderMaterial()
  // mat.uniforms = shaderConfig.uniform
  // mat.vertexShader = shaderConfig.vertexShader
  // mat.fragmentShader = shaderConfig.fragmentShader
  // mat.transparent = true
  // mat.side = 2

  return shaderConfig
}

/**
 * 飞线动画
 * 
 * const flyLine1 = new FlyLine()
 * 
 * render 中
 * const dt = clock.getElapsedTime()
 * flyline1.animation(dt)
 */
class FlyLine {
  // 输出实例
  flyLine = null

  // 基本属性
  source = { x: 0, y: 0, z: 0 }
  target = { x: 100, y: 100, z: 100 }
  range = 100
  height = 100
  color = '#ff0000'
  size = 30
  density = 2.0
  speed = 1.0
  gap = 1.1

  /** 
   * option 参数:
   * @param {Objcet} source 开始位置
   * @param {Objcet} target 目标位置
   * @param {Float | Number} range 流线拖尾长度
   * @param {Float | Number} height 流线能跳多高，与 target.y 相同的话效果就是( 终点.y - 起点.y )的 1.5 倍高
   * @param {String} color 颜色
   * @param {Float | Number} size 粒子大小
   * @param {Float} density 粒子密度
   * @param {Float} speed 速度 需要与 gap 配合调整
   * @param {Float} gap 流线出现间隔 (大于等于1) 需要与 speed 配合调整
   */
  constructor(option = {}) {
    const { source, target, range, height, color, speed, size, density, gap } = option;
    this.source = source ?? this.source;
    this.target = target ?? this.target;
    this.range = range ?? this.range;
    this.height = height ?? this.height;
    this.color = color ?? this.color;
    this.speed = speed ?? this.speed;
    this.size = size ?? this.size;
    this.density = density ?? this.density;
    this.gap = gap ?? this.gap;

    this.flyLine = this.init();
    container$1.attach(this.flyLine);
  }

  init() {
    const positions = [];
    const attrPositions = [];
    const attrCindex = [];
    const attrCnumber = [];

    const _source = new Bol3D$1.Vector3(this.source.x, this.source.y, this.source.z);
    const _target = new Bol3D$1.Vector3(this.target.x, this.target.y, this.target.z);
    const _center = _target.clone().lerp(_source, 0.5);
    _center.y += this.height;

    const number = parseInt(_source.distanceTo(_center) + _target.distanceTo(_center)) * this.density;
    const curve = new Bol3D$1.QuadraticBezierCurve3(
      _source,
      _center,
      _target
    );

    const points = curve.getPoints(number);
    // 粒子位置计算 
    points.forEach((elem, i) => {
      const index = i / (number - 1);
      positions.push({
        x: elem.x,
        y: elem.y,
        z: elem.z
      });
      attrCindex.push(index);
      attrCnumber.push(i);
    });


    positions.forEach((p) => {
      attrPositions.push(p.x, p.y, p.z);
    });

    const geometry = new Bol3D$1.BufferGeometry();

    geometry.setAttribute('position', new Bol3D$1.Float32BufferAttribute(attrPositions, 3));
    // 传递当前所在位置
    geometry.setAttribute('index', new Bol3D$1.Float32BufferAttribute(attrCindex, 1));
    geometry.setAttribute('current', new Bol3D$1.Float32BufferAttribute(attrCnumber, 1));

    const shader = new Bol3D$1.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: Bol3D$1.AdditiveBlending,
      uniforms: {
        uColor: {
          value: new Bol3D$1.Color(this.color) // 颜色
        },
        uRange: {
          value: this.range
        },
        uSize: {
          value: this.size
        },
        uTotal: {
          value: number
        },
        uGap: {
          value: this.gap
        },
        uSpeed: {
          value: this.speed
        },
        time: {
          value: 0
        }
      },
      vertexShader: `
      #include <logdepthbuf_pars_vertex>
      #include <common>
      attribute float index;
      attribute float current;
      uniform float time;
      uniform float uSize; // 大小
      uniform float uRange; // 展示区间
      uniform float uTotal; // 粒子总数
      uniform float uSpeed; // 速度
      uniform float uGap; // 间隔
      uniform vec3 uColor; // 颜色
      
      varying vec3 vColor;
      varying float vOpacity;
      void main() {
          // 需要当前显示的索引
          float size = uSize;
          float showNumber = uTotal * mod(time, uGap) * uSpeed;
          if (showNumber > current && showNumber < current + uRange) {
              float uIndex = ((current + uRange) - showNumber) / uRange;
              size *= uIndex;
              vOpacity = 1.0;
          } else {
              vOpacity = 0.0;
          }

          // 顶点着色器计算后的Position
          vColor = uColor;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition; 
          // 大小
          gl_PointSize = size * 30.0 / (-mvPosition.z);
          #include <logdepthbuf_vertex>
      }`,
      fragmentShader: `
      #include <logdepthbuf_pars_fragment>
      #include <common>
      varying vec3 vColor; 
      varying float vOpacity;
      void main() {
          gl_FragColor = vec4(vColor, vOpacity);
          #include <logdepthbuf_fragment>
      }`
    });

    const point = new Bol3D$1.Points(geometry, shader);
    return point
  }

  animation(elapsedTime) {
    this.flyLine.material.uniforms.time.value = elapsedTime;
  }
}

const powerSpheredVertexShader = `
// 解决深度问题
#include <logdepthbuf_pars_vertex>
#include <common>

// 获取时间 颜色 位置 uv信息等基本属性
uniform float time;
uniform float targetRadius;
uniform float radius;
uniform float speed;
uniform float yScale;
varying vec3 vColor;
varying vec3 vPosition;
varying vec2 vUv;
varying float progress;

void main() { 
  // 输出位置 uv信息
  vPosition = vec3(position.x, position.y, position.z);

  vUv = vec2(uv.x, uv.y);
  vUv.x += time * 0.5 * speed; 
  vUv.y += time * 0.5 * speed; 
  float scale = mod((time / (1.0 / speed)), 1.0) * (targetRadius / radius);
  
  progress = radius * scale / targetRadius;
  
  vPosition.x *= scale;
  vPosition.y *= yScale * scale;
  vPosition.z *= scale;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);


  // 解决深度问题
  #include <logdepthbuf_vertex>
} 
`;

const powerSpheredFragmentShader = `

// 解决深度问题
#include <logdepthbuf_pars_fragment>
#include <common>

uniform float time;
uniform sampler2D u_tex;
uniform vec3 myColor;
uniform int halfSphere;
uniform float opacity;

varying vec3 vPosition;
varying vec2 vUv;
float x;
float y;
float z;

varying float progress;

void main() {
    x = vPosition.x / 1.0 + 0.5;  // 除以模型长宽高的 x  +0.5是让坐标系变为0-1(居中)
    y = vPosition.y / 1.0 + 0.5;  // 除以模型长宽高的 y  +0.5是让坐标系变为0-1(居中)
    z = vPosition.z / 1.0 + 0.5;  // 除以模型长宽高的 z  +0.5是让坐标系变为0-1(居中)

    // 用 position 位置信息
    // gl_FragColor = vec4(x, y, z, 1.0);

    // 用 uv 信息
    // gl_FragColor = vec4(vUv.x, 0.8, vUv.y, 1.0);

    vec4 baseColor = vec4(myColor,0.1);
    // 基础色

    vec4 color = baseColor;

    // 动态纹理
    vec4 maskA = texture(u_tex, vUv);
    maskA.a = maskA.r;
    color += maskA;
    
    if (halfSphere == 1 && y < 0.5) {
        discard;
    }

    // 透明度
    color.a =(-(progress-0.5) / sin((progress -0.5) * 6.0) + 1.3) * opacity;
    gl_FragColor = color;

    // 解决深度问题
    #include <logdepthbuf_fragment>
}
`;

/**
 * 一个丐版的能量球 没有边缘检测
 * 
 * render 中
 * const dt = clock.getElapsedTime()
 * powerSphere.animation(dt)
 */
class PowerSphere {
  // 客制化属性
  color = '#00ffff'
  radius = 30
  speed = 0.6
  half = true
  textureEnabled = false
  textureUrl = './noise1.png'
  textureSpeed = 5
  opacity = 0.7
  yScale = 0.8

  // 几何体
  sphere = null
  minRadius = 1

  /** 
   * option 参数:
   * @param {String} color 基础颜色
   * @param {Float} radius 半径
   * @param {Float} speed 速度
   * @param {Boolean} half 开启半球
   * @param {Boolean} textureEnabled 开启贴图
   * @param {String} textureUrl 贴图地址
   * @param {Float | Number} textureSpeed 贴图流动速度
   * @param {Float} opacity 透明度 0-1
   * @param {Float} yScale y轴缩放系数(y轴压扁)
   */
  constructor(option = {}) {
    // 覆盖原有属性
    const { color, radius, speed, half, textureEnabled, textureUrl, textureSpeed, opacity, yScale } = option;
    this.color = color ?? this.color;
    this.radius = radius ?? this.radius;
    this.speed = speed ?? this.speed;
    this.half = half ?? this.half;
    this.textureEnabled = textureEnabled ?? this.textureEnabled;
    this.textureUrl = textureUrl ?? this.textureUrl;
    this.textureSpeed = textureSpeed ?? this.textureSpeed;
    this.opacity = opacity ?? this.opacity;
    this.yScale = yScale ?? this.yScale;

    // sphere
    let texture = null;
    if (this.textureEnabled) {
      const textureLoader = new Bol3D$1.TextureLoader();
      texture = textureLoader.load('./noise1.png');
      texture.wrapS = texture.wrapT = Bol3D$1.RepeatWrapping;
    }
    const spheredGeometry = new Bol3D$1.SphereGeometry(this.minRadius, 128, 128);
    let myColor = new Bol3D$1.Color(this.color);
    const spheredMaterial = new Bol3D$1.ShaderMaterial({
      uniforms: {
        u_tex: { value: null },
        time: { value: 0 },
        radius: { value: this.minRadius },
        targetRadius: { value: this.radius },
        myColor: { value: myColor },
        halfSphere: { value: this.half ? 1 : 0 },
        opacity: { value: this.opacity },
        speed: { value: this.speed },
        yScale: { value: this.yScale }
      },
      vertexShader: powerSpheredVertexShader,
      fragmentShader: powerSpheredFragmentShader,
      transparent: true,
      side: Bol3D$1.DoubleSide
    });
    this.sphere = new Bol3D$1.Mesh(spheredGeometry, spheredMaterial);
    this.sphere.position.set(10, 0, 10);
    this.sphere.material.uniforms.u_tex.value = texture;
    this.sphere.material.alphaToCoverage = true;
    container$1.attach(this.sphere);
  }

  animation(dt) {
    this.sphere.material.uniforms.time.value = dt;
  }
}

/**
 * 切换场景的过渡(保存 3D 当前帧，然后 opacity 过渡)
 * 要改 main.js 
 * 1、全局搜索 initRender(attrs) {
 * 2、在 // 3d renderer 上面一行增加一行
 * const preserveDrawingBuffer = attrs && attrs.renderer !== undefined && attrs.renderer.preserveDrawingBuffer !== undefined ? attrs.renderer.preserveDrawingBuffer : false;
 * 3、在 // 3d renderer 下面的 if 语句里增加一行
 * this.renderer = new WebGLRenderer({ antialias, canvas: attrs.container, precision, logarithmicDepthBuffer, alpha, preserveDrawingBuffer });
 * 4、最后在 index.js container.renderer 中开启
 * renderer: {
 *    // something
 *    preserveDrawingBuffer: true
 *  },
 * 
 * @param {number} duration 动画时长
 */
function prtScreenTransition(duration = 500) {
  const canvas = container.renderer.domElement;
  const imageDataUrl = canvas.toDataURL();

  const img = document.createElement('img');
  img.style.position = 'fixed';
  img.style.height = '100vh';
  img.style.width = '100vw';
  img.style.left = '0';
  img.style.top = '0';
  img.style.pointerEvents = 'none';
  img.style.zIndex = 100;
  img.src = imageDataUrl;
  document.body.appendChild(img);

  const keyframes = [
    { opacity: 1 },
    { opacity: 0 }
  ];
  const options = {
    iterations: 1, // 动画执行次数
    duration: duration // 动画时长
  };
  const webAnimation = img.animate(keyframes, options);

  webAnimation.play();
  webAnimation.onfinish = (() => {
    img.remove();
  });
}

var toJiangNan = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shaderTemplate: shaderTemplate,
  FlyLine: FlyLine,
  PowerSphere: PowerSphere,
  prtScreenTransition: prtScreenTransition
});

/**
 * 设置模型位置(position)，旋转(rotation)，缩放(scale),有该属性的物体亦可
 * @param {object} mesh 待操作模型
 */
function setModelPosition(mesh) {
    const controls = container$1.transformControl;
    const gui = new dat.GUI();
    const options = {
        transformModel: "translate"
    };
    gui.add(options, 'transformModel', ["translate", 'rotate', 'scale']).onChange(val => controls.setMode(val));
    const positionX = gui.add(mesh.position, 'x').onChange(val => mesh.position.x = val).name('positionX');
    const positionY = gui.add(mesh.position, 'y').onChange(val => mesh.position.y = val).name('positionY');
    const positionZ = gui.add(mesh.position, 'z').onChange(val => mesh.position.z = val).name('positionZ');
    const rotationX = gui.add(mesh.rotation, 'x').step(0.01).onChange(val => mesh.rotation.x = val).name('rotationX');
    const rotationY = gui.add(mesh.rotation, 'y').step(0.01).onChange(val => mesh.rotation.y = val).name('rotationY');
    const rotationZ = gui.add(mesh.rotation, 'z').step(0.01).onChange(val => mesh.rotation.z = val).name('rotationZ');
    const scaleX = gui.add(mesh.scale, "x").step(0.001).onChange(val => mesh.scale.x = val).name('scaleX');
    const scaleY = gui.add(mesh.scale, "y").step(0.001).onChange(val => mesh.scale.y = val).name('scaleY');
    const scaleZ = gui.add(mesh.scale, "z").step(0.001).onChange(val => mesh.scale.z = val).name('scaleZ');
    controls.attach(mesh);
    controls.addEventListener("change", (e) => {
        positionX.setValue(mesh.position.x);
        positionY.setValue(mesh.position.y);
        positionZ.setValue(mesh.position.z);
        rotationX.setValue(mesh.rotation.x);
        rotationY.setValue(mesh.rotation.y);
        rotationZ.setValue(mesh.rotation.z);
        scaleX.setValue(mesh.scale.x);
        scaleY.setValue(mesh.scale.y);
        scaleZ.setValue(mesh.scale.z);
    });
}

/**
 * 查看模型长宽高
 * @param {object} mesh 待操作模型 
 */
function findModelXYZ(mesh) {
    // 计算模型的 bounding box
    const box = new Bol3D$1.Box3().setFromObject(mesh);
    // 获取 bounding box 的长宽高
    const width = box.max.x - box.min.x;
    const height = box.max.y - box.min.y;
    const depth = box.max.z - box.min.z;
    // 创建 Box3Helper 对象，并将其添加到场景中
    const helper = new Bol3D$1.Box3Helper(box, 0xffff00);
    container$1.attach(helper);
    console.log(`模型的x为：${width} , y为${height} , z为${depth}`);
}

/**
 * 显示orbitCamera的position和orbitControls的target
 */
function showTargetPositon() {
    let mypt = {
        position: "",
        target: ""
    };
    const gui = new dat.GUI();
    const guiPosition = gui.add(mypt, "position");
    const guiTarget = gui.add(mypt, "target");

    container$1.orbitControls.addEventListener("end", () => {
        const position = container$1.orbitCamera.position;
        const pString = '{x:' + position.x + ",y:" + position.y + ',z:' + position.z + "}";
        guiPosition.setValue(pString);
        const target = container$1.orbitControls.target;
        const tString = '{x:' + target.x + ",y:" + target.y + ',z:' + target.z + "}";
        guiTarget.setValue(tString);
    });
}

/** 
* 模型聚焦，获取模型中心位置，在此基础上调整相机位置\
* @param  {object}  target  待显示信息的模型
*/
function modelFocused(model, params = {}) {
    const { x = 200, y = 400, z = 200 } = params;
    if (model) {
        const box = new Bol3D$1.Box3().setFromObject(model);
        const res = box.getCenter(new Bol3D$1.Vector3);
        const cameraState = { position: { x: res.x + x, y: res.y + y, z: res.z + z }, target: { x: res.x, y: res.y, z: res.z } };
        API.cameraAnimation({ cameraState });
    }
}


/** 
    * 鼠标悬浮在模型上，模型闪烁，注意开启outlineEnabled和outline配置项中的pulsePeriod控制脉冲周期。
    * @param  {object}  target  待选中的模型
    */
function checkBlinking(target) {
    let blink = null;
    return (function () {
        if (target && blink != target) {
            blink = target;
            container$1.outlineObjects = [];
            container$1.outlineObjects.push(target);
        }
        if (!target) {
            container$1.outlineObjects = [];
            blink = null;
        }
    })()
}

var toTanCheng = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setModelPosition: setModelPosition,
  findModelXYZ: findModelXYZ,
  showTargetPositon: showTargetPositon,
  modelFocused: modelFocused,
  checkBlinking: checkBlinking
});

const TU = {
  init,
  ...toZhangHang,
  ...toJiangNan,
  ...toTanCheng,
};

export { TU as default };
