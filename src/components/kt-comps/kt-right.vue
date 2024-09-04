<template>
  <div
    class="animate__animated kt-right  animate__bounceInRight"
    @animationend="remoteAnimate"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { remoteAnimate } from "@/utils/dom-tool"; // 防止与autofit 一起使用是，会导致页面变模糊
</script>

<style lang="less" scoped>
.kt-right {
  position: absolute;
  z-index: 20;
  right: 20px;
  top: 100px;
  width: 400px;
  border: solid 1px #ccc;
  pointer-events: auto;
  // 自动高度时，注释
  bottom: 100px;
}
</style>
