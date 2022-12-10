import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemDetails, BlackDesertItemDetailsAvailability } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemDetails, mockBlackDesertItemDetailsAvailability } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { useItemAvailability } from '@/composables/use-item-availability';

const MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS: BlackDesertItemDetails = mockBlackDesertItemDetails();
const MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS_AVAILABILITY: BlackDesertItemDetailsAvailability =
  mockBlackDesertItemDetailsAvailability();

describe('useItemAvailability', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemAvailability(
          MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS,
          MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS_AVAILABILITY,
        );
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  describe('should return proper class from getBackgroundClass', () => {
    it('when sellCount > 0', () => {
      component = defineComponent({
        setup() {
          return useItemAvailability(MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS, {
            ...MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS_AVAILABILITY,
            sellCount: 1000,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const backgroundClass: string = componentVM.getBackgroundClass();

      expect(backgroundClass).toContain('1');
    });

    it('when sellCount = 0', () => {
      component = defineComponent({
        setup() {
          return useItemAvailability(MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS, {
            ...MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS_AVAILABILITY,
            sellCount: 0,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const backgroundClass: string = componentVM.getBackgroundClass();

      expect(backgroundClass).toContain('2');
    });
  });

  describe('should return proper class from getTextClass', () => {
    it('when onePrice > basePrice', () => {
      component = defineComponent({
        setup() {
          return useItemAvailability(
            {
              ...MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS,
              basePrice: 3000,
            },
            {
              ...MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS_AVAILABILITY,
              onePrice: 3001,
            },
          );
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const backgroundClass: string = componentVM.getTextClass();

      expect(backgroundClass).toContain('1');
    });

    it('when onePrice < basePrice', () => {
      component = defineComponent({
        setup() {
          return useItemAvailability(
            {
              ...MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS,
              basePrice: 3001,
            },
            {
              ...MOCK_USE_ITEM_AVAILABILITY_ITEM_DETAILS_AVAILABILITY,
              onePrice: 3000,
            },
          );
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const backgroundClass: string = componentVM.getTextClass();

      expect(backgroundClass).toContain('2');
    });
  });
});
