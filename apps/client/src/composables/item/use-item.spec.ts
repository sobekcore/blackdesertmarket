import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItem } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { useItem } from '@/composables/item/use-item';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';

const MOCK_ITEM: BlackDesertItem = mockBlackDesertItem();

describe('useItem', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItem(MOCK_ITEM);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  it('should return proper data from getBasePrice', () => {
    const numberFormat: UseNumberFormatReturn = useNumberFormat();

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const basePrice: number = componentVM.getBasePrice(MOCK_ITEM);

    expect(basePrice).toBe(numberFormat.format(MOCK_ITEM.basePrice));
  });
});
