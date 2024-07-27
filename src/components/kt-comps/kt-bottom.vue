<template>
  <div
    class="kt-bottom animate__animated animate__bounceInUp"
    @animationend="remoteAnimate"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { remoteAnimate } from "@/utils/dom-tool";
</script>

<style lang="less" scoped>
.kt-bottom {
  position: absolute;
  z-index: 21;
  left: 0;
  bottom: 0;
  right: 0;
  height: 80px;
  border: solid 1px #ccc;
}
</style>
