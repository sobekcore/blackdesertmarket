import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemDetails, BlackDesertItemDetailsExtended } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemDetails, mockBlackDesertItemDetailsExtended } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { UseDateFormatReturn, useDateFormat } from '@vueuse/core';
import { useItemDetails } from '@/composables/item-details/use-item-details';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';

const MOCK_ITEM_DETAILS: BlackDesertItemDetails = mockBlackDesertItemDetails();
const MOCK_ITEM_DETAILS_EXTENDED: BlackDesertItemDetailsExtended = mockBlackDesertItemDetailsExtended();

describe('useItemDetails', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemDetails(MOCK_ITEM_DETAILS);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  it('should return proper data from getBasePrice', () => {
    const numberFormat: UseNumberFormatReturn = useNumberFormat();

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const basePrice: string = componentVM.getBasePrice();

    expect(basePrice).toBe(numberFormat.format(MOCK_ITEM_DETAILS.basePrice));
  });

  it('should return proper data from getSellCount', () => {
    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const basePrice: string = componentVM.getSellCount();

    expect(basePrice).toBe(`${MOCK_ITEM_DETAILS.sellCount}`);
  });

  describe('should return proper data from getRecentPrice', () => {
    it('when recentPrice is undefined', () => {
      component = defineComponent({
        setup() {
          return useItemDetails(MOCK_ITEM_DETAILS);
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const recentPrice: string = componentVM.getRecentPrice();

      expect(recentPrice).toBe('');
    });

    it('when recentPrice is defined', () => {
      component = defineComponent({
        setup() {
          return useItemDetails(MOCK_ITEM_DETAILS_EXTENDED);
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const numberFormat: UseNumberFormatReturn = useNumberFormat();

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const recentPrice: string = componentVM.getRecentPrice();

      expect(recentPrice).toBe(numberFormat.format(MOCK_ITEM_DETAILS_EXTENDED.recentPrice));
    });
  });

  describe('should return proper data from getRecentTransaction', () => {
    it('when recentTransaction is undefined', () => {
      component = defineComponent({
        setup() {
          return useItemDetails(MOCK_ITEM_DETAILS);
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const recentTransaction: string = componentVM.getRecentTransaction();

      expect(recentTransaction).toBe('');
    });

    it('when recentTransaction is defined', () => {
      component = defineComponent({
        setup() {
          return useItemDetails(MOCK_ITEM_DETAILS_EXTENDED);
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const timeInMilliseconds: number = MOCK_ITEM_DETAILS_EXTENDED.recentTransaction * 1000;
      const dateFormat: UseDateFormatReturn = useDateFormat(timeInMilliseconds, 'MM-DD HH:mm');

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const recentTransaction: string = componentVM.getRecentTransaction();

      expect(recentTransaction).toBe(dateFormat.value);
    });
  });
});
