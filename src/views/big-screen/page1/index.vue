<template>
  <div class="kt-page">
    <kt-left>
      <div >
        {{ postsRefData }}
      </div>
    </kt-left>
    <kt-right>
      <div>
        <kt-num-motion :num="tt" />
      </div>
    </kt-right>
  </div>
</template>

<script setup>
import page1Refs from "@ref-data/page1-ref";
import { ref } from "vue";
const postsRefData = page1Refs.getPostsRefData();


const tt = ref(89)


setInterval(() => {
  tt.value = Math.floor(Math.random() * 100)
}, 4000);

</script>

<style lang="css" scoped></style>
