<template>
  <section class="flex h-full w-full items-center justify-center">
    <AppLogo />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppLogo from '@/components/base/AppLogo.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    AppLogo,
  },
});
</script>
