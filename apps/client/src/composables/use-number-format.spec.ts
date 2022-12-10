import { DefineComponent, defineComponent } from 'vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { useNumberFormat } from '@/composables/use-number-format';

describe('useNumberFormat', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useNumberFormat();
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  it('should transform number to proper format with format', () => {
    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

    expect(componentVM.format(1000000)).toBe('1,000,000');
  });
});
