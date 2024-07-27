<template>
  <div class="kt-bottom">
    <slot></slot>
  </div>
</template>

<script setup></script>

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
