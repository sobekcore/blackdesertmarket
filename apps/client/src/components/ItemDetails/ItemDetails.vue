<template>
  <template v-if="itemType">
    <div class="flex gap-3.5">
      <ListItemIcon :src="itemIcon.href" :class="itemGradeBorder" />
      <ListItemName :name="itemType.name" :class="itemGradeText" />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { Ref, PropType, defineProps, ref } from 'vue';
import { BlackDesertItemType, BlackDesertItemDetails } from '@blackdesertmarket/interfaces';
import { UseConfigReturn, useConfig } from '@/composables/use-config';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';

const props = defineProps({
  itemType: {
    type: Object as PropType<BlackDesertItemType>,
    required: true,
  },
  itemDetails: {
    type: Object as PropType<BlackDesertItemDetails>,
    required: true,
  },
});

const config: UseConfigReturn = useConfig();

const itemIcon: Ref<URL> = ref(new URL(`/item/${props.itemType.id}/icon`, config.marketApiUrl));
const itemGradeText: Ref<string> = ref('');
const itemGradeBorder: Ref<string> = ref('');

if (props.itemType.grade) {
  itemGradeText.value = `text:item-grade-${props.itemType.grade}`;
  itemGradeBorder.value = `border:item-grade-${props.itemType.grade}`;
}
</script>
