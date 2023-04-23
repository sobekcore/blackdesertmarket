import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ItemDetailsTab from '@/components/ItemDetails/ItemDetailsTab.vue';

const MOCK_ID: number = 1;
const MOCK_LABEL: string = 'Mock Label';

describe('ItemDetailsTab', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsTab, {
      props: {
        id: MOCK_ID,
        label: MOCK_LABEL,
      },
    });
  });

  it('should render content depending on label prop', () => {
    wrapper = shallowMount(ItemDetailsTab, {
      props: {
        id: MOCK_ID,
        label: MOCK_LABEL,
      },
    });

    expect(wrapper.text()).toBe(MOCK_LABEL);
  });

  it('should emit update:modelValue event on click', () => {
    const tab: DOMWrapper<HTMLElement> = wrapper.find('[data-test="tab"]');
    tab.trigger('click');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted['update:modelValue'];

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should contain class depending on id prop', () => {
    wrapper = shallowMount(ItemDetailsTab, {
      props: {
        modelValue: MOCK_ID,
        id: MOCK_ID,
        label: MOCK_LABEL,
      },
    });

    const tab: DOMWrapper<HTMLElement> = wrapper.find('[data-test="tab"]');

    expect(tab.classes()).toContain('tab-active-state');
  });
});
