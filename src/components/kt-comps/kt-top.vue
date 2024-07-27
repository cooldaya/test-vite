<template>
  <div class="kt-top">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.kt-top {
  position: absolute;
  z-index: 21;
  left: 0;
  top: 0;
  right: 0;
  height: 80px;
  border: solid 1px #ccc;
}
</style>
