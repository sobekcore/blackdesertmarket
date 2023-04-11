import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { FieldSelectOption } from '@/interfaces/field-select-option';
import FieldSelect from '@/components/Fields/Base/FieldSelect.vue';

const MOCK_OPTION: FieldSelectOption = {
  label: 'Mock Option Label',
  value: 'mock-option-value',
};

describe('FieldSelect', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(FieldSelect, {
      props: {
        options: [MOCK_OPTION],
      },
    });
  });

  it('should emit update:modelValue event on change', () => {
    wrapper = shallowMount(FieldSelect, {
      props: {
        options: [MOCK_OPTION],
      },
    });

    const select: DOMWrapper<HTMLElement> = wrapper.find('[data-test="select"]');
    select.trigger('change');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted['update:modelValue'];

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should render content depending on options prop', () => {
    wrapper = shallowMount(FieldSelect, {
      props: {
        options: [MOCK_OPTION],
      },
    });

    const option: DOMWrapper<HTMLElement> = wrapper.find('[data-test="option"]');

    expect(option.text()).toBe(MOCK_OPTION.label);
  });

  it('should pass value attribute to option depending on options prop', () => {
    wrapper = shallowMount(FieldSelect, {
      props: {
        options: [MOCK_OPTION],
      },
    });

    const option: DOMWrapper<HTMLElement> = wrapper.find('[data-test="option"]');
    const optionAttributes: Record<string, string> = option.attributes();

    expect(optionAttributes).toHaveProperty('value');
    expect(optionAttributes.value).toBe(MOCK_OPTION.value);
  });
});
