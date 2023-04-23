<template>
  <div class="flex justify-center">
    <div class="flex flex-col gap-1">
      <img
        :src="require('@/assets/images/icon.png')"
        alt="Black Desert Market"
        class="m-auto h-16 cursor-pointer object-contain"
        @click="handleLogoClick"
      />
      <img
        :src="require('@/assets/images/logo.png')"
        alt="Black Desert Market"
        class="h-16 cursor-pointer object-contain"
        @click="handleLogoClick"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Router, useRouter } from 'vue-router';

const router: Router = useRouter();

const handleLogoClick = (): void => {
  router.push({ name: 'home' });
};
</script>
