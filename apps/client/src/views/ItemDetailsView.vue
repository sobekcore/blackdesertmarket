<template>
  <ItemDetailsModal :id="id" :enhancement="enhancement" @close="redirectToItemView" />
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { Router, RouteLocationNormalizedLoaded, useRouter, useRoute } from 'vue-router';
import { ComponentException } from '@/exceptions/component-exception';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';

const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

if (!route.params.id || !route.params.enhancement) {
  throw new ComponentException('Required route parameters id or enhancement are empty');
}

const id: Ref<number> = ref(Number(route.params.id));
const enhancement: Ref<number> = ref(Number(route.params.enhancement));

const redirectToItemView = () => {
  /**
   * TODO: Figure out what is the desired routing history logic when closing modal
   */
  router.push({
    name: 'item',
    params: {
      id: route.params.id,
    },
  });
};
</script>
