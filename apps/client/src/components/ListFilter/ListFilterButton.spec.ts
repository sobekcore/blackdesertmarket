import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { extractFromSetup } from '@test/helpers/jest/extract-from-setup';
import { ListFilterButtonVariant } from '@/enums/list-filter';
import AppModalContent from '@/components/Base/AppModal/AppModalContent.vue';
import ListFilterButton from '@/components/ListFilter/ListFilterButton.vue';

const MOCK_CONTENT: string = '<span>Mock Content</span>';
const MOCK_VARIANT: ListFilterButtonVariant = ListFilterButtonVariant.BRAND;
const MOCK_DISABLED: boolean = true;

describe('ListFilterButton', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListFilterButton);
  });

  it('should render default slot content', () => {
    wrapper = shallowMount(AppModalContent, {
      slots: {
        default: `<div data-slot>${MOCK_CONTENT}</div>`,
      },
    });

    const slot: DOMWrapper<HTMLElement> = wrapper.find('[data-slot]');

    expect(slot.element.innerHTML).toBe(MOCK_CONTENT);
  });

  it('should emit click event on click', () => {
    const button: DOMWrapper<HTMLElement> = wrapper.find('[data-test="button"]');
    button.trigger('click');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.click;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should pass class attribute to div depending on variant prop', () => {
    wrapper = shallowMount(ListFilterButton, {
      props: {
        variant: MOCK_VARIANT,
      },
    });

    const outer: DOMWrapper<HTMLElement> = wrapper.find('[data-test="outer"]');
    const outerAttributes: Record<string, string> = outer.attributes();

    const buttonVariantClassMap: Record<ListFilterButtonVariant, string> = extractFromSetup<
      Record<ListFilterButtonVariant, string>
    >(wrapper.getCurrentComponent(), 'buttonVariantClassMap');

    expect(outerAttributes).toHaveProperty('class');
    expect(outerAttributes.class).toContain(buttonVariantClassMap[MOCK_VARIANT]);
  });

  it('should pass disabled attribute to button depending on disabled prop', () => {
    wrapper = shallowMount(ListFilterButton, {
      props: {
        disabled: MOCK_DISABLED,
      },
    });

    const button: DOMWrapper<HTMLElement> = wrapper.find('[data-test="button"]');
    const buttonAttributes: Record<string, string> = button.attributes();

    expect(buttonAttributes).toHaveProperty('disabled');
  });
});
