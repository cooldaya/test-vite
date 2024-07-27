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
              class="w-[100px] kt-flex-center rounded-[5px] border border-[lightblue]"
              :class="[
                isActive
                  ? 'bg-[lightblue] text-white'
                  : 'bg-white text-[lightblue]',
              ]"
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

const router = useRouter();

const pageRoutes = router.getRoutes().filter((route) => route?.meta?.nav);

</script>
