import { API } from './API.js'
import { CACHE } from './CACHE.js'
import { STATE } from './STATE.js'
import TU from '@/ktJS/threeUtils.js'
import {
  onclick,
  ondblclick,
  onhover,
  onProgress,
  onLoad,
  Template,
} from './module'
import { GUI } from './GUI.js'

let container

// 原始加载方式
export const sceneOnLoad = ({ domElement, callback }) => {
  container = new Bol3D.Container({
    container: domElement,
    ...Template,
    onProgress,
    onLoad: (evt) => {
      onLoad(evt)
      callback?.()
    },
  })

  /**
   * 出于性能考虑，container中的clickObjects不再自动添加，需要在加载模型时手动添加，注意！！！
   */
  const events = new Bol3D.Events(container)
  events.onclick = onclick
  events.ondblclick = ondblclick
  events.onhover = onhover
}

// 通过配置文件加载
export const loadSceneByJSON = ({ domElement, callback }) => {
  fetch(`${STATE.PUBLIC_PATH}/editor/bol3d.json`) // 配置文件路径
    .then((res) => {
      return res.json()
    })
    .then((result) => {
      const nodeData = result.data
      const fileList = result.fileList
      container = new Bol3D.Container({
        publicPath: STATE.PUBLIC_PATH,
        assetsPath: `${STATE.PUBLIC_PATH}/editor/`, // 节点解析，资源文件路径（包含模型, hdr，天空盒，材质贴图， 图片等）
        container: domElement,
        renderer: {
          alpha: false, // 开启/关闭背景透明（默认为false）
          logarithmicDepthBuffer: true, // 解决z精度造成的重叠闪面（默认true）
          antialias: true, // 抗锯齿，默认开启
          precision: 'highp', // shader浮点精度，默认highp
        },
        loadingBar: {
          show: true,
          type: 10,
        },
      })

      const jsonParser = new Bol3D.JSONParser({
        container,
        modelUrls: fileList,
      })

      // const modelUrls2 = getModelUrl(jsonParser)
      const modelUrls = jsonParser.modelUrls
      container.loadModelsByUrl({
        // prefix: '',  // 路径前缀， 模型地址最终为 `${STATE.PUBLIC_PATH}/editor/${prefix}/fileName`
        modelUrls: modelUrls,
        onProgress: (model, evt) => {
          // console.log('progress', model)
        },
        onLoad: (evt) => {
          // console.log('onload', evt)
          /**
           *  根据jsonParser.nodes中的节点更新3D场景，注意，调用该方法会覆盖onProgress中的模型编辑操作
           *  因此，想要在代码中二次编辑模型，需在该方法调用之后再调用
           */

          // 处理编辑器中的克隆模型
          jsonParser.sceneTreeNodes = API.cloneDeep(nodeData)
          jsonParser.generateModelAndCloneList()
          jsonParser.updateSceneTreeNodesByOld(nodeData)

          jsonParser.parseNodes(jsonParser.sceneTreeNodes, jsonParser.nodes)
          // 加载场景页
          evt.updateSceneByNodes(jsonParser.nodes[0], 0, (item) => {
            evt.scene.children.forEach((sModel) => {
              if (sModel.userData.fileName && sModel.userData.fileName !== '' && sModel.visible) {
                onProgress(sModel)
              }
            })
            onLoad(evt)
          })
        },
      })
      // register events
      const events = new Bol3D.Events(container)
      // events.register(jsonParser.nodes)

      const handleChange = ($event) => { }

      // 新增一个事件回调，用于处理编辑器内添加的事件，事件对象会返回对象uuid和事件类型等
      events.handler.on('handleChange', handleChange)

      // 以前的事件使用方法不变
      events.ondblclick = ondblclick
      events.onhover = onhover
      events.onclick = onclick
    })
}
// 输出坐标
window.outCooroutCoordinate = () => {
  let camera = CACHE.container.orbitCamera.position
  console.log(
    'camera: ',
    Object.values(camera).map((item) => Number(item.toFixed(2)))
  )
  let points = CACHE.container.orbitControls.target
  console.log(
    'points: ',
    Object.values(points).map((item) => Number(item.toFixed(2)))
  )
}
