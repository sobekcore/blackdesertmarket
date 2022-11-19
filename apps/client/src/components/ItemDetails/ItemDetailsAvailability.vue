<template>
  <div class="flex h-full flex-col">
    <ItemDetailsAvailabilityHeader />
    <div class="mb-2.5 h-full overflow-y-scroll px-2">
      <ul class="flex flex-col-reverse justify-end gap-1.5">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ItemDetailsAvailabilityHeader from '@/components/ItemDetails/ItemDetailsAvailabilityHeader.vue';
</script>
