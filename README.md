# Vue 3 + Vite


预期创建多个分支，每个分支对应不同的使用场景
    web-2d  vue纯前端  
    ue-2d   ue-vue前端
    web-three  vue+three.js 3D渲染
    web-cesium  vue+cesium 3D渲染

lib功能包含:
    页面
        1. 基本页面bing-screen(项目业务页面)与 single-page1(单页面)
        2. 自动注册页面 添加meta数据
    组件 
        1. docx预览组件 kt-docx-viewer.vue
        2. lottie动画组件 kt-lottie-player.vue
        3. 滚动组件 kt-anime-scroll.vue
        4. 表格滚动组件 kt-table.vue
    工具函数
        1. 事件监听触发器 emitter.js
        2. 数字处理      num-tools.js
        3. xlsx文件处理   xlsx-tools.js
        4. dom工具函数     dom-tools.js 给元素添加单机、双击区分同时可用
    hooks

    axios封装
        1. 封装axios请求，常用的get、post、put、delete方法
        2. axios请求搭配Swrv封装的httpSwrvRequest方法，实现缓存，定时请求，返回响应数据等功能
        
    directive指令
        1. v-loading 加载动画指令，使用lottie动画组件
        2. v-long-press 支持鼠标长按事件回调，配置回调执行间隔时间 window.LONG_PRESS_DURATION || 1000

    ue交互
        1.封装UE数据交互工具函数(结合mitt) sendToUE watchUEEvents
      
    bug处理
        1. 修复animate.css 与 autofit.js 一起使用时，可能产生的模糊问题
    项目功能
        1.自动命令打包
        2.添加项目打开时间限制工具 a-verify.js

        

tailwindcss 插件推荐  文章 - https://juejin.cn/post/7387611028988002314?searchId=20240725231752E6F38C3E63EC911596A6#heading-19
    vscode 插件
        Tailwind CSS IntelliSense 自动补全、Lint、悬浮预览
    类名排序插件 prettier-plugin-tailwindcss