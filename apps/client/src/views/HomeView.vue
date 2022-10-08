<template>
  <div class="home-view">
    <main class="content">
      <MainLogo />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainLogo from '@/components/MainLogo.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MainLogo,
  },
});
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .content {
    padding: 1rem;
  }
}
</style>
