import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import ItemDetailsOverviewButton from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverviewButton.vue';

const MOCK_LABEL: string = 'Mock Label';
const MOCK_ACTIVE: boolean = true;

describe('ItemDetailsOverviewButton', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsOverviewButton, {
      props: {
        label: MOCK_LABEL,
      },
    });
  });

  it('should render content depending on label prop', () => {
    wrapper = shallowMount(ItemDetailsOverviewButton, {
      props: {
        label: MOCK_LABEL,
      },
    });

    expect(wrapper.text()).toBe(MOCK_LABEL);
  });

  it('should contain class depending on active prop', () => {
    wrapper = shallowMount(ItemDetailsOverviewButton, {
      props: {
        label: MOCK_LABEL,
        active: MOCK_ACTIVE,
      },
    });

    const button: DOMWrapper<HTMLElement> = wrapper.find('[data-test="button"]');

    expect(button.classes()).toContain('button-active-state');
  });
});
