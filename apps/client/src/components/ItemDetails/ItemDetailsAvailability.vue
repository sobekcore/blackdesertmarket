<template>
  <div class="flex h-full flex-col">
    <ItemDetailsAvailabilityHeader />
    <div class="mb-2.5 h-full overflow-y-scroll px-2">
      <ul class="flex flex-col-reverse justify-end gap-1.5">
        <template v-for="item in props.availability" :key="item.onePrice">
          <ItemDetailsAvailabilityItem :item="item" />
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, defineProps } from 'vue';
import { BlackDesertItemDetailsAvailability } from '@blackdesertmarket/interfaces';
import ItemDetailsAvailabilityItem from '@/components/ItemDetails/ItemDetailsAvailabilityItem.vue';
import ItemDetailsAvailabilityHeader from '@/components/ItemDetails/ItemDetailsAvailabilityHeader.vue';

const props = defineProps({
  availability: {
    type: Array as PropType<BlackDesertItemDetailsAvailability[]>,
    required: true,
  },
});
</script>
