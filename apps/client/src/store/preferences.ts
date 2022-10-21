interface PreferencesStoreState {
  region: string;
  language: string;
}

export default {
  namespaced: true,
  state: {
    region: 'eu',
    language: 'en-US',
  },
  getters: {
    region(state: PreferencesStoreState): string {
      return state.region;
    },
    language(state: PreferencesStoreState): string {
      return state.language;
    },
  },
};
