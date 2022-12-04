import { BlackDesertItemDetails, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemDetails, mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import ItemDetailsOverview from '@/components/ItemDetails/ItemDetailsOverview.vue';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';

const MOCK_ITEM_DETAILS_OVERVIEW_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();
const MOCK_ITEM_DETAILS_OVERVIEW_ITEM_DETAILS: BlackDesertItemDetails = mockBlackDesertItemDetails();
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
});
