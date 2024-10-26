<template>
  <div class="kt-page">
    <kt-left>
      <div >
        {{ postsRefData }}
      </div>
    </kt-left>
    <kt-right>
      <div>fdsfsd</div>
    </kt-right>
  </div>
</template>

<script setup>
import page1Refs from "@ref-data/page1-ref";

const postsRefData = page1Refs.getPostsRefData();
</script>

<style lang="css" scoped></style>
