import { VueWrapper, shallowMount } from '@vue/test-utils';
import AppModalTitle from '@/components/Base/AppModal/AppModalTitle.vue';

const MOCK_MODAL_TITLE: string = 'Modal Title';

describe('AppModalClose', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppModalTitle, {
      props: {
        title: MOCK_MODAL_TITLE,
      },
    });
  });

  it('should render content depending on title prop', () => {
    wrapper = shallowMount(AppModalTitle, {
      props: {
        title: MOCK_MODAL_TITLE,
      },
    });

    expect(wrapper.text()).toBe(MOCK_MODAL_TITLE);
  });
});
