import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemTooltip } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemTooltip } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockProvide } from '@test/mocks/provide.mock';
import { useItemTooltip } from '@/composables/item-tooltip/use-item-tooltip';

const MOCK_ITEM_TOOLTIP: BlackDesertItemTooltip = mockBlackDesertItemTooltip();

describe('useItemTooltip', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemTooltip(MOCK_ITEM_TOOLTIP);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component, {
      global: {
        provide: mockProvide(),
      },
    });
  });

  it('should return proper data from getItemWeight', () => {
    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const weight: number = componentVM.getItemWeight(MOCK_ITEM_TOOLTIP);

    expect(weight).toBe(`${MOCK_ITEM_TOOLTIP.weight} LT`);
  });
});
