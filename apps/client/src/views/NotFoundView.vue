<script lang="ts" setup>
/**
 * Renderless components seem to resolve imports in a more strict way
 * thus requirement to explicitly import Router as a type from vue-router
 */
import type { Router } from 'vue-router';
import { useRouter } from 'vue-router';

const router: Router = useRouter();

router.push({ name: 'home' });
</script>
