import { DefineComponent, defineComponent } from 'vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { useFluctuationType } from '@/composables/use-fluctuation-type';

const MOCK_USE_FLUCTUATION_TYPE_FLUCTUATION_TYPE: number = 1;

describe('useFluctuationType', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useFluctuationType(MOCK_USE_FLUCTUATION_TYPE_FLUCTUATION_TYPE);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  describe('should return proper class from getBackgroundClass', () => {
    it('when fluctuationType = 1', () => {
      component = defineComponent({
        setup() {
          return useFluctuationType(1);
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const backgroundClass: string = componentVM.getBackgroundClass();

      expect(backgroundClass).toContain('1');
    });

    it('when fluctuationType = 2', () => {
      component = defineComponent({
        setup() {
          return useFluctuationType(2);
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const backgroundClass: string = componentVM.getBackgroundClass();

      expect(backgroundClass).toContain('2');
    });
  });

  describe('should return proper operator from getOperator', () => {
    it('when fluctuationType = 1', () => {
      component = defineComponent({
        setup() {
          return useFluctuationType(1);
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const operator: string = componentVM.getOperator();

      expect(operator).toBe('-');
    });

    it('when fluctuationType = 2', () => {
      component = defineComponent({
        setup() {
          return useFluctuationType(2);
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const operator: string = componentVM.getOperator();

      expect(operator).toBe('+');
    });
  });
});
