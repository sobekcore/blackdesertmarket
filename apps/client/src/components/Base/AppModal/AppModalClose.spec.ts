import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import AppModalClose from '@/components/Base/AppModal/AppModalClose.vue';

describe('AppModalClose', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppModalClose);
  });

  it('should emit close event on click', () => {
    const button: DOMWrapper<HTMLButtonElement> = wrapper.find('button');
    button.trigger('click');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.close;

    expect(Array.isArray(events)).toBeTruthy();
  });
});
