import { shallowMount } from '@vue/test-utils';
import MainLogo from '@/components/MainLogo.vue';

describe('MainLogo', () => {
  it('should contain word "Black Desert Market"', () => {
    const component = shallowMount(MainLogo);
    expect(component.text()).toContain('Black Desert Market');
  });
});
