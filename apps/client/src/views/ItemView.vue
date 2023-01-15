<template>
  <section>
    <ItemTypeList :id="id" />
  </section>
  <Teleport to="#modal">
    <RouterView />
  </Teleport>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, RouteParams, useRoute } from 'vue-router';
import { ComponentException } from '@/exceptions/component-exception';
import ItemTypeList from '@/components/ItemTypeList.vue';

const route: RouteLocationNormalizedLoaded = useRoute();

if (!route.params.id) {
  throw new ComponentException('Required route parameter id is empty');
}

const id: Ref<number> = ref(Number(route.params.id));

watch(
  (): RouteParams => {
    return route.params;
  },
  (): void => {
    id.value = Number(route.params.id);
  },
);
</script>
