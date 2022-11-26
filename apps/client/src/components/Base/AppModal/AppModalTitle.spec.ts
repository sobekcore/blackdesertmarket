import { VueWrapper, shallowMount } from '@vue/test-utils';
import AppModalTitle from '@/components/Base/AppModal/AppModalTitle.vue';

const MODAL_TITLE: string = 'Modal Title';

describe('AppModalClose', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppModalTitle, {
      props: {
        title: MODAL_TITLE,
      },
    });
  });

  it('should render content depending on title prop', () => {
    wrapper = shallowMount(AppModalTitle, {
      props: {
        title: MODAL_TITLE,
      },
    });

    expect(wrapper.text()).toBe(MODAL_TITLE);
  });
});
