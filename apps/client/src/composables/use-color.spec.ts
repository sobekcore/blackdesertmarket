import { DefineComponent, defineComponent } from 'vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { useColor } from '@/composables/use-color';

const MOCK_USE_COLOR_COLOR: string = '#ffffff';
const MOCK_USE_COLOR_OPACITY: string = '50%';

describe('useColor', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useColor();
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  describe('should return proper data from hexToRGB', () => {
    it('when opacity is not passed', () => {
      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const color: string = componentVM.hexToRGB(MOCK_USE_COLOR_COLOR);

      expect(color).toBe('rgb(255, 255, 255)');
    });

    it('when opacity is passed', () => {
      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const color: string = componentVM.hexToRGB(MOCK_USE_COLOR_COLOR, MOCK_USE_COLOR_OPACITY);

      expect(color).toBe(`rgba(255, 255, 255, ${MOCK_USE_COLOR_OPACITY})`);
    });
  });
});
