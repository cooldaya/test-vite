<template>
  <kt-bottom>
    <div class="kt-full kt-flex-center">
      <div class="flex gap-x-[20px]">
        <router-link
          v-for="route in pageRoutes"
          :key="route.path"
          :to="route.path"
        >
          <template v-slot="{ isActive }">
            <div
              class="kt-flex-center kt-bg-full h-[35px] w-[114px] rounded-[5px] border border-[lightblue]"
              :style="{
                'background-image': `url('${isActive? route.s_bg : route.b_bg}')`,
              }"
            >
              <span>{{ route.meta.name }}</span>
            </div>
          </template>
        </router-link>
      </div>
    </div>
  </kt-bottom>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getCompImg } from "@/utils/get-assets";

const router = useRouter();

const bgPageMap = new Map([
  [
    "页面1",
    {
      b_bg: getCompImg("p (1).webp"),
      s_bg: getCompImg("p (2).webp"),
    },
  ],
  [
    "页面2",
    {
      b_bg: getCompImg("p (3).webp"),
      s_bg: getCompImg("p (4).webp"),
    },
  ],
  [
    "页面3",
    {
      b_bg: getCompImg("p (5).webp"),
      s_bg: getCompImg("p (6).webp"),
    },
  ],
]);
const pageRoutes = router
  .getRoutes()
  .filter((route) => route?.meta?.nav)
  .map((item) => {
    const bgInfo = bgPageMap.get(item.meta.name);
    return { ...item, ...bgInfo };
  });
</script>

<style></style>
