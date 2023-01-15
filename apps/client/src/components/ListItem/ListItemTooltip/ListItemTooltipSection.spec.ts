import { getFirstElement } from '@blackdesertmarket/helpers';
import { BlackDesertItemTooltipSection } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemTooltipSection } from '@blackdesertmarket/mocks';
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { UnitTestException } from '@/exceptions/unit-test-exception';
import { FormatNameFunction } from '@/composables/item-tooltip/use-item-tooltip';
import {
  UseItemTooltipSectionReturn,
  useItemTooltipSection,
} from '@/composables/item-tooltip/use-item-tooltip-section';
import ListItemTooltipSection from '@/components/ListItem/ListItemTooltip/ListItemTooltipSection.vue';

const MOCK_ITEM_TOOLTIP_SECTION: BlackDesertItemTooltipSection = mockBlackDesertItemTooltipSection();
const MOCK_FORMAT_NAME: FormatNameFunction = (name: string): string => `@@@${name}`;
const MOCK_FORMAT_VALUE: FormatNameFunction = (value: string): string => `@@@${value}`;
const MOCK_CLASS: string = 'mock-class';

describe('ListItemTooltipSection', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItemTooltipSection, {
      props: {
        itemTooltipSection: MOCK_ITEM_TOOLTIP_SECTION,
      },
    });
  });

  describe('should render content depending on itemTooltipSection prop', () => {
    wrapper = shallowMount(ListItemTooltipSection, {
      props: {
        itemTooltipSection: MOCK_ITEM_TOOLTIP_SECTION,
      },
    });

    it('when data-test = name', () => {
      const name: DOMWrapper<HTMLElement> = wrapper.find('[data-test="name"]');

      expect(name.text()).toContain(MOCK_ITEM_TOOLTIP_SECTION.name);
    });

    it('when data-test = value', () => {
      const value: DOMWrapper<HTMLElement> = wrapper.find('[data-test="value"]');

      if (!MOCK_ITEM_TOOLTIP_SECTION.values) {
        throw new UnitTestException('Item property values is missing from the test object');
      }

      expect(value.text()).toBe(getFirstElement<string>(MOCK_ITEM_TOOLTIP_SECTION.values));
    });
  });

  it('should render content depending on formatName prop', () => {
    wrapper = shallowMount(ListItemTooltipSection, {
      props: {
        itemTooltipSection: MOCK_ITEM_TOOLTIP_SECTION,
        formatName: MOCK_FORMAT_NAME,
      },
    });

    const itemTooltipSectionComposable: UseItemTooltipSectionReturn = useItemTooltipSection(MOCK_ITEM_TOOLTIP_SECTION);

    const name: DOMWrapper<HTMLElement> = wrapper.find('[data-test="name"]');

    expect(name.text()).toContain(`@@@${itemTooltipSectionComposable.getSectionName()}`);
  });

  it('should render content depending on formatValue prop', () => {
    wrapper = shallowMount(ListItemTooltipSection, {
      props: {
        itemTooltipSection: MOCK_ITEM_TOOLTIP_SECTION,
        formatValue: MOCK_FORMAT_VALUE,
      },
    });

    const value: DOMWrapper<HTMLElement> = wrapper.find('[data-test="value"]');

    if (!MOCK_ITEM_TOOLTIP_SECTION.values) {
      throw new UnitTestException('Item property values is missing from the test object');
    }

    expect(value.text()).toBe(`@@@${getFirstElement<string>(MOCK_ITEM_TOOLTIP_SECTION.values)}`);
  });

  it('should pass class prop to div depending on class prop', () => {
    wrapper = shallowMount(ListItemTooltipSection, {
      props: {
        itemTooltipSection: MOCK_ITEM_TOOLTIP_SECTION,
        class: MOCK_CLASS,
      },
    });

    const outer: DOMWrapper<HTMLElement> = wrapper.find('[data-test="outer"]');
    const outerAttributes: Record<string, string> = outer.attributes();

    expect(outerAttributes).toHaveProperty('class');
    expect(outerAttributes.class).toContain(MOCK_CLASS);
  });

  it('should pass class prop to span depending on nameClass prop', () => {
    wrapper = shallowMount(ListItemTooltipSection, {
      props: {
        itemTooltipSection: MOCK_ITEM_TOOLTIP_SECTION,
        nameClass: MOCK_CLASS,
      },
    });

    const name: DOMWrapper<HTMLElement> = wrapper.find('[data-test="name"]');
    const nameAttributes: Record<string, string> = name.attributes();

    expect(nameAttributes).toHaveProperty('class');
    expect(nameAttributes.class).toContain(MOCK_CLASS);
  });

  it('should pass class prop to span depending on valueClass prop', () => {
    wrapper = shallowMount(ListItemTooltipSection, {
      props: {
        itemTooltipSection: MOCK_ITEM_TOOLTIP_SECTION,
        valueClass: MOCK_CLASS,
      },
    });

    const value: DOMWrapper<HTMLElement> = wrapper.find('[data-test="value"]');
    const valueAttributes: Record<string, string> = value.attributes();

    expect(valueAttributes).toHaveProperty('class');
    expect(valueAttributes.class).toContain(MOCK_CLASS);
  });
});
