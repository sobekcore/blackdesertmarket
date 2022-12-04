import { BlackDesertItem, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItem } from '@blackdesertmarket/mocks';
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import {
  ItemEnhancementNameData,
  UseItemEnhancementReturn,
  useItemEnhancement,
} from '@/composables/use-item-enhancement';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

const MOCK_LIST_ITEM_ITEM: BlackDesertItem = mockBlackDesertItem();
const MOCK_LIST_ITEM_CLASS: string = 'list-item-class';
const MOCK_LIST_ITEM_GRADE: number = 1;

jest.mock('@/composables/use-config', () => ({
  useConfig: () => ({
    marketApiUrl: 'https://api.blackdesertmarket.com',
  }),
}));

describe('ListItem', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItem, {
      props: {
        item: MOCK_LIST_ITEM_ITEM,
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

  it('should render ListItemSeparator component', () => {
    wrapper.findAllComponents(ListItemSeparator).forEach((listItemSeparatorWrapper: VueWrapper): void => {
      expect(listItemSeparatorWrapper.exists()).toBeTruthy();
    });
  });

  it('should render ListItemProperty component', () => {
    wrapper.findAllComponents(ListItemProperty).forEach((listItemPropertyWrapper: VueWrapper): void => {
      expect(listItemPropertyWrapper.exists()).toBeTruthy();
    });
  });

  it('should emit effect event on click', () => {
    const button: DOMWrapper<HTMLElement> = wrapper.find('[data-test="button"]');
    button.trigger('click');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should pass class attribute to div depending on class prop', () => {
    wrapper = shallowMount(ListItem, {
      props: {
        item: MOCK_LIST_ITEM_ITEM,
        class: MOCK_LIST_ITEM_CLASS,
      },
    });

    const inner: DOMWrapper<HTMLElement> = wrapper.find('[data-test="inner"]');
    const innerAttributes: Record<string, string> = inner.attributes();

    expect(innerAttributes).toHaveProperty('class');
    expect(innerAttributes.class).toContain(MOCK_LIST_ITEM_CLASS);
  });

  it('should pass src prop to ListItemIcon depending on item prop', () => {
    wrapper = shallowMount(ListItem, {
      props: {
        item: MOCK_LIST_ITEM_ITEM,
        class: MOCK_LIST_ITEM_CLASS,
      },
    });

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('src');
    expect(listItemIconAttributes.src).toContain(String(MOCK_LIST_ITEM_ITEM.id));
  });

  it('should pass text prop to ListItemIcon depending on item prop', () => {
    wrapper = shallowMount(ListItem, {
      props: {
        item: MOCK_LIST_ITEM_ITEM,
        class: MOCK_LIST_ITEM_CLASS,
      },
    });

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('text');
    expect(listItemIconAttributes.text).toBeFalsy();
  });

  it('should pass text prop to ListItemIcon depending on item prop', () => {
    wrapper = shallowMount(ListItem, {
      props: {
        item: MOCK_LIST_ITEM_ITEM,
        class: MOCK_LIST_ITEM_CLASS,
      },
    });

    const itemEnhancement: UseItemEnhancementReturn = useItemEnhancement(MOCK_LIST_ITEM_ITEM as BlackDesertItemType);
    const itemEnhancementName: ItemEnhancementNameData = itemEnhancement.getName();

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('text');
    expect(listItemIconAttributes.text).toEqual(itemEnhancementName.short);
  });

  it('should pass class prop to ListItemIcon depending on item prop', () => {
    wrapper = shallowMount(ListItem, {
      props: {
        item: { ...MOCK_LIST_ITEM_ITEM, grade: MOCK_LIST_ITEM_GRADE },
        class: MOCK_LIST_ITEM_CLASS,
      },
    });

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('class');
    expect(listItemIconAttributes.class).toContain(String(MOCK_LIST_ITEM_GRADE));
  });

  it('should pass name prop to ListItemName depending on item prop', () => {
    wrapper = shallowMount(ListItem, {
      props: {
        item: MOCK_LIST_ITEM_ITEM,
        class: MOCK_LIST_ITEM_CLASS,
      },
    });

    const listItemNameWrapper: VueWrapper = wrapper.findComponent(ListItemName);
    const listItemNameAttributes: Record<string, string> = listItemNameWrapper.attributes();

    expect(listItemNameAttributes).toHaveProperty('name');
    expect(listItemNameAttributes.name).toContain(MOCK_LIST_ITEM_ITEM.name);
  });

  it('should pass value prop to ListItemProperty depending on item prop', () => {
    wrapper = shallowMount(ListItem, {
      props: {
        item: MOCK_LIST_ITEM_ITEM,
        class: MOCK_LIST_ITEM_CLASS,
      },
    });

    const numberFormat: UseNumberFormatReturn = useNumberFormat();

    const listItemPropertyPrice: DOMWrapper<HTMLElement> = wrapper.find('[data-test="price"]');
    const listItemPropertyPriceAttributes: Record<string, string> = listItemPropertyPrice.attributes();

    const listItemPropertyCount: DOMWrapper<HTMLElement> = wrapper.find('[data-test="count"]');
    const listItemPropertyCountAttributes: Record<string, string> = listItemPropertyCount.attributes();

    expect(listItemPropertyPriceAttributes).toHaveProperty('value');
    expect(listItemPropertyCountAttributes).toHaveProperty('value');
    expect(listItemPropertyPriceAttributes.value).toBe(numberFormat.format(MOCK_LIST_ITEM_ITEM.basePrice));
    expect(listItemPropertyCountAttributes.value).toBe(String(MOCK_LIST_ITEM_ITEM.count));
  });
});
