<template>
  <div class="kt-full kt-cus-table" :class="[sl]">
    <kt-table v-bind="$attrs">
      <template
        v-for="(slotKey, slotIndex) in Object.keys($slots)"
        :key="slotIndex"
        #[slotKey]="params"
      >
        <slot :name="slotKey" v-bind="params"></slot>
      </template>
    </kt-table>
  </div>
</template>

<script setup>
// 该组件用来定制table样式
const props = defineProps({
  sl: {
    type: String,
    default: "s1",
  },
});
</script>

<style lang="less" scoped>
.s1 {
  :deep(.kt-table) {
    font-size: 12px;

    .kt-table-header {
      height: 28px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("@/assets/img/p20.webp");
      span {
        margin-bottom: 2px;
      }
    }
    .kt-table-content > .kt-table-row {
      padding-top: 6px;
      padding-bottom: 2px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        left: 0;
        height: 2px;
        bottom: 0;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url("@/assets/img/p20-1.webp");
      }
    }
  }
}
.s2 {
  :deep(.kt-table) {
    font-size: 12px;
    letter-spacing: 1px;
    .kt-table-header {
      height: 28px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("@/assets/img/p20.webp");
      span {
        margin-bottom: 2px;
      }
    }
    .kt-table-content > .kt-table-row {
      position: relative;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("@/assets/img/p22.webp");
      height: 28px;
      line-height: 26px;
    }
  }
}
.s3 {
  :deep(.kt-table) {
    font-size: 12px;
    letter-spacing: 1px;
    .kt-table-header {
      height: 28px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("@/assets/img/p25-2.webp");
      span {
        margin-bottom: 2px;
      }
    }
    .kt-table-content > .kt-table-row {
      position: relative;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("@/assets/img/p25-3.webp");
      height: 28px;
      line-height: 26px;
    }
  }
}
</style>
