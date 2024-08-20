<template>
  <div class="kt-table flex h-full w-full flex-col">
    <div class="kt-table-header flex shrink-0">
      <div
        v-for="columnItem in columns"
        :Key="columnItem.prop"
        class="h-full grow"
        :style="{
          ...opts.getStyleByColumn(columnItem),
        }"
      >
        <slot :name="`${columnItem.prop}-header`" :column="columnItem">
          <span>
            {{ columnItem.label }}
          </span>
        </slot>
      </div>
    </div>
    <div class="kt-table-body min-h-0 flex-1">
      <div v-if="data.length" class="h-full">
        <kt-anime-scroll :speed="sSpeed" :aSpeed="aSpeed">
          <div
            class="kt-table-content flex flex-col"
            :style="{
              rowGap: gap,
              paddingBottom: gap,
            }"
          >
            <div
              class="kt-table-row flex h-[30px]"
              v-for="(rowData, rowIndex) in data"
              :key="rowIndex"
            >
              <div
                class="kt-table-cell line-clamp-1 h-full grow overflow-hidden"
                v-for="(columnItem, columnIndex) in columns"
                :key="columnItem.prop + columnIndex"
                :style="{
                  ...opts.getStyleByColumn(columnItem),
                }"
              >
                <slot
                  :name="`${columnItem.prop}-cell`"
                  :row-data="rowData"
                  :column="columnItem"
                  :val="rowData[columnItem.prop]"
                >
                  <span>
                    {{ rowData[columnItem.prop] }}
                  </span>
                </slot>
              </div>
            </div>
          </div>
        </kt-anime-scroll>
      </div>
      <div class="kt-table-empty kt-flex-center h-full" v-else>
        <slot name="empty">
          <span>暂无数据</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => [
      // {
      //   label: "序号",
      //   prop: "k1",
      //   dir: "center",
      //   width: 2,
      // }
    ],
  },
  data: {
    type: Array,
    default: () => [],
  },
  gap: {
    type: String,
    default: "10px",
  },
  aSpeed: {
    type: Number,
    default: 30,
  },
  sSpeed: {
    type: Number,
    default: 0.48,
  },
});

const opts = {
  getStyleByColumn: (columnItem) => {
    const width = columnItem.width || (columnItem.label + "").length || 1;
    const direction = columnItem.dir || "left";
    return {
      flex: `${width} ${width} 0%`,
      textAlign: direction,
    };
  },
};
</script>

<style lang="less" scoped></style>
