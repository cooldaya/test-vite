<template>
  <div class="kt-left">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.kt-left {
  position: absolute;
  z-index: 20;
  left: 20px;
  top: 40px;
  width: 400px;
  border: solid 1px #ccc;

  // 自动高度时，注释
  bottom: 40px;
}
</style>
