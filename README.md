# Vue 3 + Vite
当前为 `web-ue` 分支，在meta.js中配置 `isPixel` 为 `true` 即可切换到像素流通信方式：
- 接入 `web-ue` 数据交互， 默认
- 接入 `web-ue像素流` 数据交互，像素流接入

1. 克隆当前分支 
   - `git clone -b web-ue https://github.com/cooldaya/test-vite.git new-project`
2. 重命名分支名称
   - `git branch -m web-ue main`
3. 设置新项目远程仓库地址
   - `git remote set-url origin https://github.com/kt-project/new-project.git`


# 播放UE5.2 像素流demo

文章查看：[Vue3 嵌入UE5.2像素流-数据通信-CSDN博客](https://blog.csdn.net/qq_39593914/article/details/143430069)


## we-ue 方式 
- web端使用ue文件夹下的index提供的函数
- ue客户端使用 ue.interface.UEemit 发送 {type,data}数据


## web-ue像素流
- web端使用 `pixel-streaming-player` 组件 并调用 `connectPixelStreaming(playerInstanceRef.value);` 切换到与像素流通信，通信依旧使用ue文件夹下的index提供的函数
- ue客户端使用 stream 发送事件 `handle_responses`,web端使用 `stream.emitUIInteraction` 向 `像素流` 发送数据


## lib 功能包含

### 页面
1. 基本页面 `bing-screen`（项目业务页面）与 `single-page1`（单页面）
2. 自动注册页面，添加 meta 数据

### 组件
1. DOCX 预览组件 `kt-docx-viewer.vue`
2. Lottie 动画组件 `kt-lottie-player.vue`
3. 滚动组件 `kt-anime-scroll.vue`
4. 表格滚动组件 `kt-table.vue`

### 工具函数
1. 事件监听触发器 `emitter.js`
2. 数字处理 `num-tools.js`
3. XLSX 文件处理 `xlsx-tools.js`
4. DOM 工具函数 `dom-tools.js`（给元素添加单机、双击区分同时可用）

### Hooks

### Axios 封装
1. 封装 Axios 请求，常用的 GET、POST、PUT、DELETE 方法
2. Axios 请求搭配 Swrv 封装的 `httpSwrvRequest` 方法，实现缓存、定时请求、返回响应数据等功能

### Directive 指令
1. `v-loading`：加载动画指令，使用 Lottie 动画组件
2. `v-long-press`：支持鼠标长按事件回调，配置回调执行间隔时间 `window.LONG_PRESS_DURATION || 1000`

### UE 交互
1. 封装 UE 数据交互工具函数（结合 mitt）`sendToUE` 和 `watchUEEvents`

### Bug 处理
1. 修复 `animate.css` 与 `autofit.js` 一起使用时，可能产生的模糊问题

## 项目功能
1. 自动命令打包
2. 添加项目打开时间限制工具 `a-verify.js`

## 推荐插件

### Tailwind CSS 插件
文章 - [Tailwind CSS 插件推荐](https://juejin.cn/post/7387611028988002314?searchId=20240725231752E6F38C3E63EC911596A6#heading-19)
- VSCode 插件
  - Tailwind CSS IntelliSense：自动补全、Lint、悬浮预览
- 类名排序插件
  - prettier-plugin-tailwindcss
