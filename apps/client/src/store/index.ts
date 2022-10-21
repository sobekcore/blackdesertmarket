import { createStore } from 'vuex';
import preferences from '@/store/preferences';

export default createStore({
  modules: {
    preferences: preferences,
  },
});
