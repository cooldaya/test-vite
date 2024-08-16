<template>
  <kt-bottom>
    <div class="text-[30px]">{{ count }}</div>
    <div class="kt-full kt-flex-center">
      <div class="flex gap-x-[20px]">
        <router-link
          v-for="route in pageRoutes"
          :key="route.path"
          :to="route.path"
          @click.stop="opts.changeRoute(route)"
        >
          <template v-slot="{ isActive }">
            <div class="h-[35px] w-[114px]">
              <kt-toggle-img
                :imgs="[route.s_bg, route.b_bg]"
                :active="isActive ? 0 : 1"
              >
                <div class="kt-flex-center h-full w-full">
                  <span>{{ route.meta.name }}</span>
                </div>
              </kt-toggle-img>
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
import { sendToUE, watchUEEvents } from "@/ue";
import { ref } from "vue";

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

const count = ref(0);
const opts = {
  changeRoute(route) {
    sendToUE("changeRoute", { text: route.path });
  },
};

const ueEvents = {
  "ue-change-count": (data = {}) => {
    const { text } = data;
    if (text === "plus") {
      count.value++;
    } else {
      count.value--;
    }
  },
};
watchUEEvents(ueEvents);
</script>

<style></style>
