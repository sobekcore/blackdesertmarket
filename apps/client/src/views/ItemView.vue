<template>
  <section>
    <ItemList :id="id" />
  </section>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, RouteParams, useRoute } from 'vue-router';
import { ComponentException } from '@/exceptions/component-exception';
import ItemList from '@/components/ItemList.vue';

const route: RouteLocationNormalizedLoaded = useRoute();

const id: Ref<number> = ref(Number(route.params.id));

if (!id.value) {
  throw new ComponentException('Required route parameter id is empty');
}

watch(
  (): RouteParams => {
    return route.params;
  },
  (): void => {
    id.value = Number(route.params.id);
  },
);
</script>
