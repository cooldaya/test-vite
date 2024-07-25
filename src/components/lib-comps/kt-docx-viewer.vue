<script setup>
import { ref, onMounted, watch } from "vue";
import { renderAsync } from "docx-preview";

const props = defineProps({
  docxUrl: {
    type: String,
    required: true,
  },
});

const previewContainerRef = ref(null);

const renderDocxView = (url) => {
  const el = previewContainerRef.value;
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((blob) => {
      renderAsync(blob, el, null, {
        className: "cus-docx",
      });
    });
};

watch(
  () => props.docxUrl,
  (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      renderDocxView(newVal);
    }
  }
);

onMounted(() => {
  renderDocxView(props.docxUrl);
});
</script>

<template>
  <div ref="previewContainerRef" class="kt-docx-viewer"></div>
</template>

<style lang="less" scoped>
.kt-docx-viewer {
  color: #888;
}
</style>
<style lang="less">
.kt-docx-viewer {
  .cus-docx-wrapper{
    padding-left: 6%;
    padding-right: 6%;

  }
  .cus-docx {
    background-color: red;
    width: 100%;
  }
}
</style>
