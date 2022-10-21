<script lang="ts" setup>
import type { Router } from 'vue-router';
import { useRouter } from 'vue-router';

const router: Router = useRouter();

router.push({ name: 'home' });
</script>
