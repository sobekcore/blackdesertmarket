import { BlackDesertItemTooltip, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemTooltip, mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { mockProvide } from '@test/mocks/provide.mock';
import { UseItemTypeReturn, useItemType } from '@/composables/item-type/use-item-type';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemName from '@/components/ListItem/ListItemName.vue';
import ListItemTooltip from '@/components/ListItem/ListItemTooltip/ListItemTooltip.vue';
import ListItemTooltipSection from '@/components/ListItem/ListItemTooltip/ListItemTooltipSection.vue';

const MOCK_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();
const MOCK_ITEM_TOOLTIP: BlackDesertItemTooltip = mockBlackDesertItemTooltip();
const MOCK_GRADE: number = 1;

describe('ListItemTooltip', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItemTooltip, {
      global: {
        provide: mockProvide(),
      },
      props: {
        itemType: MOCK_ITEM_TYPE,
        itemTooltip: MOCK_ITEM_TOOLTIP,
      },
    });
  });

  it('should render ListItemTooltipSection component', () => {
    wrapper.findAllComponents(ListItemTooltipSection).forEach((listItemTooltipSectionWrapper: VueWrapper): void => {
      expect(listItemTooltipSectionWrapper.exists()).toBeTruthy();
    });
  });

  it('should render content depending on itemTooltip prop', () => {
    wrapper = shallowMount(ListItemTooltip, {
      global: {
        provide: mockProvide(),
      },
      props: {
        itemType: MOCK_ITEM_TYPE,
        itemTooltip: MOCK_ITEM_TOOLTIP,
      },
    });

    const category: DOMWrapper<HTMLElement> = wrapper.find('[data-test="category"]');

    expect(category.text()).toBe(MOCK_ITEM_TOOLTIP.category);
  });

  it('should pass name prop to ListItemName depending on itemType prop', () => {
    wrapper = shallowMount(ListItemTooltip, {
      global: {
        provide: mockProvide(),
      },
      props: {
        itemType: MOCK_ITEM_TYPE,
        itemTooltip: MOCK_ITEM_TOOLTIP,
      },
    });

    const itemTypeComposable: UseItemTypeReturn = useItemType(MOCK_ITEM_TYPE);

    const listItemNameWrapper: VueWrapper = wrapper.findComponent(ListItemName);
    const listItemNameAttributes: Record<string, string> = listItemNameWrapper.attributes();

    expect(listItemNameAttributes).toHaveProperty('name');
    expect(listItemNameAttributes.name).toBe(itemTypeComposable.getItemName());
  });

  it('should pass class prop to ListItemName depending on itemType prop', () => {
    wrapper = shallowMount(ListItemTooltip, {
      global: {
        provide: mockProvide(),
      },
      props: {
        itemType: { ...MOCK_ITEM_TYPE, grade: MOCK_GRADE },
        itemTooltip: MOCK_ITEM_TOOLTIP,
      },
    });

    const listItemNameWrapper: VueWrapper = wrapper.findComponent(ListItemName);
    const listItemNameAttributes: Record<string, string> = listItemNameWrapper.attributes();

    expect(listItemNameAttributes).toHaveProperty('class');
    expect(listItemNameAttributes.class).toContain(String(MOCK_GRADE));
  });

  it('should pass text prop to ListItemIcon depending on itemType prop', () => {
    wrapper = shallowMount(ListItemTooltip, {
      global: {
        provide: mockProvide(),
      },
      props: {
        itemType: MOCK_ITEM_TYPE,
        itemTooltip: MOCK_ITEM_TOOLTIP,
      },
    });

    const itemTypeComposable: UseItemTypeReturn = useItemType(MOCK_ITEM_TYPE);

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('text');
    expect(listItemIconAttributes.text).toBe(itemTypeComposable.getItemIconText());
  });

  it('should pass class prop to ListItemIcon depending on itemType prop', () => {
    wrapper = shallowMount(ListItemTooltip, {
      global: {
        provide: mockProvide(),
      },
      props: {
        itemType: { ...MOCK_ITEM_TYPE, grade: MOCK_GRADE },
        itemTooltip: MOCK_ITEM_TOOLTIP,
      },
    });

    const listItemIconWrapper: VueWrapper = wrapper.findComponent(ListItemIcon);
    const listItemIconAttributes: Record<string, string> = listItemIconWrapper.attributes();

    expect(listItemIconAttributes).toHaveProperty('class');
    expect(listItemIconAttributes.class).toContain(String(MOCK_GRADE));
  });

  describe('should pass value prop to ListItemTooltipProperty depending on itemTooltip prop', () => {
    wrapper = shallowMount(ListItemTooltip, {
      global: {
        provide: mockProvide(),
      },
      props: {
        itemType: MOCK_ITEM_TYPE,
        itemTooltip: MOCK_ITEM_TOOLTIP,
      },
    });

    it('when data-test = damage', () => {
      const damage: DOMWrapper<HTMLElement> = wrapper.find('[data-test="damage"]');
      const damageAttributes: Record<string, string> = damage.attributes();

      expect(damageAttributes).toHaveProperty('value');
      expect(damageAttributes.value).toBe(MOCK_ITEM_TOOLTIP.damage);
    });

    it('when data-test = defense', () => {
      const defense: DOMWrapper<HTMLElement> = wrapper.find('[data-test="defense"]');
      const defenseAttributes: Record<string, string> = defense.attributes();

      expect(defenseAttributes).toHaveProperty('value');
      expect(defenseAttributes.value).toBe(MOCK_ITEM_TOOLTIP.defense);
    });

    it('when data-test = accuracy', () => {
      const accuracy: DOMWrapper<HTMLElement> = wrapper.find('[data-test="accuracy"]');
      const accuracyAttributes: Record<string, string> = accuracy.attributes();

      expect(accuracyAttributes).toHaveProperty('value');
      expect(accuracyAttributes.value).toBe(MOCK_ITEM_TOOLTIP.accuracy);
    });

    it('when data-test = evasion', () => {
      const accuracy: DOMWrapper<HTMLElement> = wrapper.find('[data-test="evasion"]');
      const accuracyAttributes: Record<string, string> = accuracy.attributes();

      expect(accuracyAttributes).toHaveProperty('value');
      expect(accuracyAttributes.value).toBe(MOCK_ITEM_TOOLTIP.evasion);
    });

    it('when data-test = damageReduction', () => {
      const accuracy: DOMWrapper<HTMLElement> = wrapper.find('[data-test="damageReduction"]');
      const accuracyAttributes: Record<string, string> = accuracy.attributes();

      expect(accuracyAttributes).toHaveProperty('value');
      expect(accuracyAttributes.value).toBe(MOCK_ITEM_TOOLTIP.damageReduction);
    });

    it('when data-test = weight', () => {
      const weight: DOMWrapper<HTMLElement> = wrapper.find('[data-test="weight"]');
      const weightAttributes: Record<string, string> = weight.attributes();

      expect(weightAttributes).toHaveProperty('value');
      expect(weightAttributes.value).toBe(`${MOCK_ITEM_TOOLTIP.weight} LT`);
    });
  });
});
