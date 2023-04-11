import { VueWrapper, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { mockProvide } from '@test/mocks/provide.mock';
import AppLogo from '@/components/Base/AppLogo.vue';
import CategorySidemenuHeader from '@/components/CategorySidemenu/CategorySidemenuHeader/CategorySidemenuHeader.vue';
import CategorySidemenuHeaderSection from '@/components/CategorySidemenu/CategorySidemenuHeader/CategorySidemenuHeaderSection.vue';

describe('CategorySidemenuHeader', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(CategorySidemenuHeader, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
      },
    });
  });

  it('should render AppLogo component', () => {
    const logoWrapper: VueWrapper = wrapper.findComponent(AppLogo);

    expect(logoWrapper.exists()).toBeTruthy();
  });

  it('should render CategorySidemenuHeaderSection component', () => {
    wrapper
      .findAllComponents(CategorySidemenuHeaderSection)
      .forEach((categorySidemenuHeaderSectionWrapper: VueWrapper): void => {
        expect(categorySidemenuHeaderSectionWrapper.exists()).toBeTruthy();
      });
  });
});
