import { BlackDesertItemTooltip, BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemTooltip, mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { UseItemTooltipReturn, useItemTooltip } from '@/composables/item-tooltip/use-item-tooltip';
import { UseItemTypeReturn, useItemType } from '@/composables/item-type/use-item-type';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';
import ListItemTooltip from '@/components/ListItem/ListItemTooltip/ListItemTooltip.vue';
import ListItemTooltipSection from '@/components/ListItem/ListItemTooltip/ListItemTooltipSection.vue';

const MOCK_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();
const MOCK_ITEM_TOOLTIP: BlackDesertItemTooltip = mockBlackDesertItemTooltip();

describe('ListItemTooltip', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItemTooltip, {
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

  it('should render content depending on itemType prop', () => {
    wrapper = shallowMount(ListItemTooltip, {
      props: {
        itemType: MOCK_ITEM_TYPE,
        itemTooltip: MOCK_ITEM_TOOLTIP,
      },
    });

    const itemTypeComposable: UseItemTypeReturn = useItemType(MOCK_ITEM_TYPE);

    const name: DOMWrapper<HTMLElement> = wrapper.find('[data-test="name"]');

    expect(name.text()).toBe(itemTypeComposable.getItemName());
  });

  it('should render content depending on itemTooltip prop', () => {
    wrapper = shallowMount(ListItemTooltip, {
      props: {
        itemType: MOCK_ITEM_TYPE,
        itemTooltip: MOCK_ITEM_TOOLTIP,
      },
    });

    const category: DOMWrapper<HTMLElement> = wrapper.find('[data-test="category"]');

    expect(category.text()).toBe(MOCK_ITEM_TOOLTIP.category);
  });

  it('should pass text prop to ListItemIcon depending on itemType prop', () => {
    wrapper = shallowMount(ListItemTooltip, {
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

  describe('should pass value prop to ListItemTooltipProperty depending on itemTooltip prop', () => {
    wrapper = shallowMount(ListItemTooltip, {
      props: {
        itemType: MOCK_ITEM_TYPE,
        itemTooltip: MOCK_ITEM_TOOLTIP,
      },
    });

    const itemTooltipComposable: UseItemTooltipReturn = useItemTooltip(MOCK_ITEM_TOOLTIP);

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
      expect(weightAttributes.value).toBe(itemTooltipComposable.getItemWeight());
    });
  });
});
