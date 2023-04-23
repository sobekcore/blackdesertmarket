import { VueWrapper, shallowMount } from '@vue/test-utils';
import LegalTitle from '@/components/Legal/LegalTitle.vue';

const MOCK_TITLE: string = 'Mock Title';

describe('LegalTitle', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(LegalTitle, {
      props: {
        title: MOCK_TITLE,
      },
    });
  });

  it('should render content depending on title prop', () => {
    wrapper = shallowMount(LegalTitle, {
      props: {
        title: MOCK_TITLE,
      },
    });

    expect(wrapper.text()).toBe(MOCK_TITLE);
  });
});
