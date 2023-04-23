import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import FieldText from '@/components/Fields/Base/FieldText.vue';

describe('FieldText', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(FieldText);
  });

  it('should emit update:modelValue event on change', () => {
    wrapper = shallowMount(FieldText);

    const input: DOMWrapper<HTMLElement> = wrapper.find('[data-test="input"]');
    input.trigger('input');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted['update:modelValue'];

    expect(Array.isArray(events)).toBeTruthy();
  });
});
