import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemHot } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemHot } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { UseFluctuationTypeReturn, useFluctuationType } from '@/composables/item-hot/use-fluctuation-type';
import { useItemHot } from '@/composables/item-hot/use-item-hot';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';

const MOCK_ITEM_HOT: BlackDesertItemHot = mockBlackDesertItemHot();

describe('useItemHot', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemHot(MOCK_ITEM_HOT);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  it('should return proper data from getFluctuationPrice', () => {
    const fluctuationType: UseFluctuationTypeReturn = useFluctuationType(MOCK_ITEM_HOT.fluctuationType);
    const numberFormat: UseNumberFormatReturn = useNumberFormat();

    const operator: string = fluctuationType.getOperator();
    const price: string = numberFormat.format(MOCK_ITEM_HOT.fluctuationPrice);

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const fluctuationPrice: string = componentVM.getFluctuationPrice();

    expect(fluctuationPrice).toBe(`${operator}${price}`);
  });
});
