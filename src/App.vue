<script setup>
import docxUrl from "./assets/test.docx?url";
</script>

<template>
  <div class="kt-flex-center h-[300px] w-[300px] bg-gray-200">
    <kt-docx-viewer :docx-url="docxUrl" />
  </div>
</template>
