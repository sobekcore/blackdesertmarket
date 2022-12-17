import { ComponentInternalInstance, ComponentPublicInstance } from 'vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { mockProvide } from '@test/mocks/provide.mock';
import { MarketCategoriesConfigCategory } from '@/interfaces/market-config';
import { UnitTestException } from '@/exceptions/unit-test-exception';
import marketCategoriesConfig from '@/configs/market-categories.config';
import CategorySidemenu from '@/components/CategorySidemenu/CategorySidemenu.vue';
import CategorySidemenuItem from '@/components/CategorySidemenu/CategorySidemenuItem.vue';

const MOCK_CATEGORY_SIDEMENU_TITLES: string[] = marketCategoriesConfig.categories.map(
  (category: MarketCategoriesConfigCategory): string => category.title,
);

const MOCK_CATEGORY_SIDEMENU_ICONS: string[] = marketCategoriesConfig.categories.map(
  (category: MarketCategoriesConfigCategory): string => category.icon,
);

describe('CategorySidemenu', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(CategorySidemenu, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
      },
    });
  });

  it('should render CategorySidemenuItem component', () => {
    wrapper.findAllComponents(CategorySidemenuItem).forEach((categorySidemenuItemWrapper: VueWrapper): void => {
      expect(categorySidemenuItemWrapper.exists()).toBeTruthy();
    });
  });

  it('should handle effect event from CategorySidemenuItem', () => {
    wrapper.findAllComponents(CategorySidemenuItem).forEach((categorySidemenuItemWrapper: VueWrapper): void => {
      const component: ComponentInternalInstance = categorySidemenuItemWrapper.getCurrentComponent();
      component.emit('effect');

      const emitted: Record<string, unknown[]> = categorySidemenuItemWrapper.emitted();
      const [events] = emitted.effect;

      expect(Array.isArray(events)).toBeTruthy();
    });
  });

  it('should pass title prop to CategorySidemenuItem depending on marketCategoriesConfig inject', () => {
    wrapper
      .findAllComponents<ComponentPublicInstance>('[data-test="config"]')
      .forEach((categorySidemenuItemWrapper: VueWrapper): void => {
        const categorySidemenuItemAttributes: Record<string, string> = categorySidemenuItemWrapper.attributes();

        expect(categorySidemenuItemAttributes).toHaveProperty('title');

        const title: string | undefined = MOCK_CATEGORY_SIDEMENU_TITLES.find((title: string): boolean => {
          return title === categorySidemenuItemAttributes.title;
        });

        if (typeof title === 'undefined') {
          throw new UnitTestException(`Item with title ${categorySidemenuItemAttributes.title} is unrecognized`);
        }

        expect(categorySidemenuItemAttributes.title).toBe(title);
      });
  });

  it('should pass icon prop to CategorySidemenuItem depending on marketCategoriesConfig inject', () => {
    wrapper
      .findAllComponents<ComponentPublicInstance>('[data-test="config"]')
      .forEach((categorySidemenuItemWrapper: VueWrapper): void => {
        const categorySidemenuItemAttributes: Record<string, string> = categorySidemenuItemWrapper.attributes();

        expect(categorySidemenuItemAttributes).toHaveProperty('icon');

        const icon: string | undefined = MOCK_CATEGORY_SIDEMENU_ICONS.find((icon: string): boolean => {
          return icon === categorySidemenuItemAttributes.icon;
        });

        if (typeof icon === 'undefined') {
          throw new UnitTestException(`Item with icon ${categorySidemenuItemAttributes.icon} is unrecognized`);
        }

        expect(categorySidemenuItemAttributes.icon).toBe(icon);
      });
  });
});
