import { VueWrapper, shallowMount } from '@vue/test-utils';
import AppModalTitle from '@/components/Base/AppModal/AppModalTitle.vue';

const MOCK_TITLE: string = 'Mock Title';

describe('AppModalTitle', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppModalTitle, {
      props: {
        title: MOCK_TITLE,
      },
    });
  });

  it('should render content depending on title prop', () => {
    wrapper = shallowMount(AppModalTitle, {
      props: {
        title: MOCK_TITLE,
      },
    });

    expect(wrapper.text()).toBe(MOCK_TITLE);
  });
});
