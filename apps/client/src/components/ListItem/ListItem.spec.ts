import { BlackDesertItem, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItem } from '@blackdesertmarket/mocks';
import { DOMWrapper, VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { mockProvide } from '@test/mocks/provide.mock';
import { mockCreateObjectURL } from '@test/mocks/url.mock';
import {
  ItemEnhancementNameData,
  UseItemTypeEnhancementReturn,
  useItemTypeEnhancement,
} from '@/composables/item-type/use-item-type-enhancement';
import { UseNumberFormatReturn, useNumberFormat } from '@/composables/use-number-format';
import ListItem from '@/components/ListItem/ListItem.vue';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';
import ListItemProperty from '@/components/ListItem/ListItemProperty.vue';
import ListItemSeparator from '@/components/ListItem/ListItemSeparator.vue';

const MOCK_ITEM: BlackDesertItem = mockBlackDesertItem();
const MOCK_CLASS: string = 'mock-class';
const MOCK_GRADE: number = 1;
const MOCK_BLOB: string = 'mock-blob';
mockCreateObjectURL(MOCK_BLOB);

jest.mock('@/config', () => ({
  config: {
    marketApiUrl: 'https://api.blackdesertmarket.com',
  },
}));

jest.mock('@/composables/item/use-item-icon-fetch', () => ({
  useItemIconFetch: () => ({
    fetch: () => Promise.resolve(URL.createObjectURL(new Blob())),
  }),
}));

describe('ListItem', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItem, {
      global: {
        provide: mockProvide(),
      },
      props: {
        item: MOCK_ITEM,
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
    const listItemButton: DOMWrapper<HTMLElement> = wrapper.find('[data-test="list-item-button"]');
    listItemButton.trigger('click');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should pass class attribute to div depending on class prop', () => {
    wrapper = shallowMount(ListItem, {
      global: {
        provide: mockProvide(),
      },
      props: {
        item: MOCK_ITEM,
        class: MOCK_CLASS,
      },
    });

    const listItem: DOMWrapper<HTMLElement> = wrapper.find('[data-test="list-item"]');
    const listItemAttributes: Record<string, string> = listItem.attributes();

    expect(listItemAttributes).toHaveProperty('class');
    expect(listItemAttributes.class).toContain(MOCK_CLASS);
  });

  it('should pass src prop to ListItemIcon depending on item prop', async () => {
    wrapper = shallowMount(ListItem, {
      global: {
        provide: mockProvide(),
      },
      props: {
        item: MOCK_ITEM,
        class: MOCK_CLASS,
      },
    });

    await flushPromises();

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('src');
    expect(listItemIconAttributes.src).toContain(MOCK_BLOB);
  });

  it('should pass text prop to ListItemIcon depending on item prop', () => {
    wrapper = shallowMount(ListItem, {
      global: {
        provide: mockProvide(),
      },
      props: {
        item: MOCK_ITEM,
        class: MOCK_CLASS,
      },
    });

    const itemEnhancement: UseItemTypeEnhancementReturn = useItemTypeEnhancement(MOCK_ITEM as BlackDesertItemType);
    const itemEnhancementName: ItemEnhancementNameData = itemEnhancement.getName();

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('text');
    expect(listItemIconAttributes.text).toEqual(itemEnhancementName.short);
  });

  it('should pass class prop to ListItemIcon depending on item prop', () => {
    wrapper = shallowMount(ListItem, {
      global: {
        provide: mockProvide(),
      },
      props: {
        item: { ...MOCK_ITEM, grade: MOCK_GRADE },
        class: MOCK_CLASS,
      },
    });

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('class');
    expect(listItemIconAttributes.class).toContain(String(MOCK_GRADE));
  });

  it('should pass name prop to ListItemName depending on item prop', () => {
    wrapper = shallowMount(ListItem, {
      global: {
        provide: mockProvide(),
      },
      props: {
        item: MOCK_ITEM,
        class: MOCK_CLASS,
      },
    });

    const listItemNameWrapper: VueWrapper = wrapper.findComponent(ListItemName);
    const listItemNameAttributes: Record<string, string> = listItemNameWrapper.attributes();

    expect(listItemNameAttributes).toHaveProperty('name');
    expect(listItemNameAttributes.name).toContain(MOCK_ITEM.name);
  });

  it('should pass value prop to ListItemProperty depending on item prop', () => {
    wrapper = shallowMount(ListItem, {
      global: {
        provide: mockProvide(),
      },
      props: {
        item: MOCK_ITEM,
        class: MOCK_CLASS,
      },
    });

    const numberFormat: UseNumberFormatReturn = useNumberFormat();

    const listItemPropertyPrice: DOMWrapper<HTMLElement> = wrapper.find('[data-test="list-item-price"]');
    const listItemPropertyPriceAttributes: Record<string, string> = listItemPropertyPrice.attributes();

    const listItemPropertyCount: DOMWrapper<HTMLElement> = wrapper.find('[data-test="list-item-count"]');
    const listItemPropertyCountAttributes: Record<string, string> = listItemPropertyCount.attributes();

    expect(listItemPropertyPriceAttributes).toHaveProperty('value');
    expect(listItemPropertyCountAttributes).toHaveProperty('value');
    expect(listItemPropertyPriceAttributes.value).toBe(numberFormat.format(MOCK_ITEM.basePrice));
    expect(listItemPropertyCountAttributes.value).toBe(String(MOCK_ITEM.count));
  });
});
