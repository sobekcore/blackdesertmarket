import { DefineComponent, defineComponent } from 'vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { useStringWrap } from '@/composables/use-string-wrap';

const MOCK_USE_STRING_WRAP_STRING: string = 'Use String Wrap String';

describe('useStringWrap', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useStringWrap();
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  it('should return proper data from wrap', () => {
    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const size: number = componentVM.wrap(MOCK_USE_STRING_WRAP_STRING, '@', 3);

    expect(size).toBe(`@@@${MOCK_USE_STRING_WRAP_STRING}@@@`);
  });
});
