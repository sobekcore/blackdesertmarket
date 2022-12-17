import { ComponentPublicInstance, nextTick } from 'vue';
import { BlackDesertItemDetailsExtended, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemDetailsExtended, mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { UseDateFormatReturn, useDateFormat } from '@vueuse/core';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import ItemDetailsOverview from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverview.vue';
import ItemDetailsOverviewButton from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverviewButton.vue';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';

const MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();
const MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS: BlackDesertItemDetailsExtended = mockBlackDesertItemDetailsExtended();
const MOCK_ITEM_DETAILS_OVERVIEW_GRADE: number = 1;

jest.mock('@/composables/use-config', () => ({
  useConfig: () => ({
    marketApiUrl: 'https://api.blackdesertmarket.com',
  }),
}));

describe('ItemDetailsOverview', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsOverview, {
      props: {
        itemType: MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE,
        itemDetails: MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS,
      },
    });
  });

  it('should render ListItemIcon component', () => {
    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);

    expect(listItemIconWrapper.exists()).toBeTruthy();
  });

  it('should render ListItemName component', () => {
    const listItemNameWrapper: VueWrapper = wrapper.findComponent(ListItemName);

    expect(listItemNameWrapper.exists()).toBeTruthy();
  });

  it('should handle click event from ItemDetailsOverviewButton', () => {
    wrapper
      .findAllComponents(ItemDetailsOverviewButton)
      .forEach((itemDetailsOverviewButtonWrapper: VueWrapper): void => {
        itemDetailsOverviewButtonWrapper.trigger('click');

        const emitted: Record<string, unknown[]> = itemDetailsOverviewButtonWrapper.emitted();
        const [events] = emitted.click;

        expect(Array.isArray(events)).toBeTruthy();

        nextTick((): void => {
          const componentAttributes: Record<string, string> = itemDetailsOverviewButtonWrapper.attributes();

          expect(componentAttributes.active).toBeTruthy();
        });
      });
  });

  it('should pass name prop to ListItemIcon depending on itemType prop', () => {
    wrapper = shallowMount(ItemDetailsOverview, {
      props: {
        itemType: MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE,
        itemDetails: MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS,
      },
    });

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('src');
    expect(listItemIconAttributes.src).toContain(String(MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE.id));
  });

  it('should pass class prop to ListItemIcon depending on itemType prop', () => {
    wrapper = shallowMount(ItemDetailsOverview, {
      props: {
        itemType: { ...MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE, grade: MOCK_ITEM_DETAILS_OVERVIEW_GRADE },
        itemDetails: MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS,
      },
    });

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('class');
    expect(listItemIconAttributes.class).toContain(String(MOCK_ITEM_DETAILS_OVERVIEW_GRADE));
  });

  it('should pass name prop to ListItemName depending on itemType prop', () => {
    wrapper = shallowMount(ItemDetailsOverview, {
      props: {
        itemType: MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE,
        itemDetails: MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS,
      },
    });

    const listItemNameWrapper: VueWrapper = wrapper.findComponent(ListItemName);
    const listItemNameAttributes: Record<string, string> = listItemNameWrapper.attributes();

    expect(listItemNameAttributes).toHaveProperty('name');
    expect(listItemNameAttributes.name).toBe(MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE.name);
  });

  it('should pass class prop to ListItemName depending on itemType prop', () => {
    wrapper = shallowMount(ItemDetailsOverview, {
      props: {
        itemType: { ...MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE, grade: MOCK_ITEM_DETAILS_OVERVIEW_GRADE },
        itemDetails: MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS,
      },
    });

    const listItemNameWrapper: VueWrapper = wrapper.findComponent(ListItemName);
    const listItemNameAttributes: Record<string, string> = listItemNameWrapper.attributes();

    expect(listItemNameAttributes).toHaveProperty('class');
    expect(listItemNameAttributes.class).toContain(String(MOCK_ITEM_DETAILS_OVERVIEW_GRADE));
  });

  describe('should pass value prop to ItemDetailsOverviewProperty depending on itemType and itemDetails props', () => {
    wrapper = shallowMount(ItemDetailsOverview, {
      props: {
        itemType: MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE,
        itemDetails: MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS,
      },
    });

    const numberFormat: UseNumberFormatReturn = useNumberFormat();

    it('when data-test = in-stock', () => {
      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>('[data-test="in-stock"]');
      const componentAttributes: Record<string, string> = componentWrapper.attributes();

      expect(componentAttributes).toHaveProperty('value');
      expect(componentAttributes.value).toBe(String(MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS.sellCount));
    });

    it('when data-test = base-price', () => {
      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>('[data-test="base-price"]');
      const componentAttributes: Record<string, string> = componentWrapper.attributes();

      expect(componentAttributes).toHaveProperty('value');
      expect(componentAttributes.value).toBe(numberFormat.format(MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS.basePrice));
    });

    it('when data-test = recent-price', () => {
      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>('[data-test="recent-price"]');
      const componentAttributes: Record<string, string> = componentWrapper.attributes();

      expect(componentAttributes).toHaveProperty('value');
      expect(componentAttributes.value).toBe(numberFormat.format(MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS.recentPrice));
    });

    it('when data-test = total-trades', () => {
      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>('[data-test="total-trades"]');
      const componentAttributes: Record<string, string> = componentWrapper.attributes();

      expect(componentAttributes).toHaveProperty('value');
      expect(componentAttributes.value).toBe(numberFormat.format(MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE.tradeCount));
    });

    it('when data-test = recent-transaction', () => {
      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
        '[data-test="recent-transaction"]',
      );
      const componentAttributes: Record<string, string> = componentWrapper.attributes();

      const timeInMilliseconds: number = MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS.recentTransaction * 1000;
      const dateFormat: UseDateFormatReturn = useDateFormat(timeInMilliseconds, 'MM-DD HH:mm');

      expect(componentAttributes).toHaveProperty('value');
      expect(componentAttributes.value).toBe(dateFormat.value);
    });
  });
});
