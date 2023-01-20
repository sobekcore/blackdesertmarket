import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import AppLoader from '@/components/Base/AppLoader/AppLoader.vue';
import AppLoaderBackdrop from '@/components/Base/AppLoader/AppLoaderBackdrop.vue';
import AppLoaderCircle from '@/components/Base/AppLoader/AppLoaderCircle.vue';

const MOCK_OVERLAY: boolean = true;

describe('AppLoader', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppLoader);
  });

  it('should render AppLoaderCircle component', () => {
    wrapper.findAllComponents(AppLoaderCircle).forEach((loaderCircleWrapper: VueWrapper): void => {
      expect(loaderCircleWrapper.exists()).toBeTruthy();
    });
  });

  it('should render AppLoaderBackdrop component depending on overlay prop', () => {
    wrapper = shallowMount(AppLoader, {
      props: {
        overlay: MOCK_OVERLAY,
      },
    });

    const loaderBackdropWrapper: VueWrapper = wrapper.findComponent(AppLoaderBackdrop);

    expect(loaderBackdropWrapper.exists()).toBeTruthy();
  });

  describe('should contain class depending on overlay prop', () => {
    it('when data-test = outer', () => {
      wrapper = shallowMount(AppLoader, {
        props: {
          overlay: MOCK_OVERLAY,
        },
      });

      const outer: DOMWrapper<HTMLElement> = wrapper.find('[data-test="outer"]');

      expect(outer.classes()).toContain('loader-overlay-wrapper');
    });

    it('when data-test = icon', () => {
      wrapper = shallowMount(AppLoader, {
        props: {
          overlay: MOCK_OVERLAY,
        },
      });

      const icon: DOMWrapper<HTMLElement> = wrapper.find('[data-test="icon"]');

      expect(icon.classes()).toContain('loader-overlay-icon');
    });
  });
});
