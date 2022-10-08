<template>
  <div class="main-logo">
    <h1 class="title">Black Desert Market</h1>
    <p class="desc">Currently the application is in development process</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLogo',
});
</script>

<style lang="scss" scoped>
.main-logo {
  text-align: center;

  .title {
    font-weight: bold;
    font-size: 2.5rem;
    margin: 0;
  }

  .desc {
    font-size: 1rem;
    margin: 0.5rem 0 0;
  }
}
</style>
