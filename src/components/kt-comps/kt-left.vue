<template>
  <div
    class="kt-left "

  >
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.kt-left {
  position: absolute;
  z-index: 20;
  left: 20px;
  top: 100px;
  width: 400px;
  border: solid 1px #ccc;
  pointer-events: auto;
  overflow: hidden;

  // 自动高度时，注释
  bottom:100px;
}
</style>
