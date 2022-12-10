import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { useItemType } from '@/composables/use-item-type';

const MOCK_USE_ITEM_LIST_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();

describe('useItemType', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemType(MOCK_USE_ITEM_LIST_ITEM_TYPE);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  describe('should return proper data from isItemPRI', () => {
    it('when mainCategory = 20', () => {
      component = defineComponent({
        setup() {
          return useItemType({
            ...MOCK_USE_ITEM_LIST_ITEM_TYPE,
            mainCategory: 20,
            enhancement: 1,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

      expect(componentVM.isItemPRI()).toBeTruthy();
    });

    it('when enhancement = 16', () => {
      component = defineComponent({
        setup() {
          return useItemType({
            ...MOCK_USE_ITEM_LIST_ITEM_TYPE,
            enhancement: 16,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

      expect(componentVM.isItemPRI()).toBeTruthy();
    });
  });

  describe('should return proper data from isItemDUO', () => {
    it('when mainCategory = 20', () => {
      component = defineComponent({
        setup() {
          return useItemType({
            ...MOCK_USE_ITEM_LIST_ITEM_TYPE,
            mainCategory: 20,
            enhancement: 2,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

      expect(componentVM.isItemDUO()).toBeTruthy();
    });

    it('when enhancement = 17', () => {
      component = defineComponent({
        setup() {
          return useItemType({
            ...MOCK_USE_ITEM_LIST_ITEM_TYPE,
            enhancement: 17,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

      expect(componentVM.isItemDUO()).toBeTruthy();
    });
  });

  describe('should return proper data from isItemTRI', () => {
    it('when mainCategory = 20', () => {
      component = defineComponent({
        setup() {
          return useItemType({
            ...MOCK_USE_ITEM_LIST_ITEM_TYPE,
            mainCategory: 20,
            enhancement: 3,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

      expect(componentVM.isItemTRI()).toBeTruthy();
    });

    it('when enhancement = 18', () => {
      component = defineComponent({
        setup() {
          return useItemType({
            ...MOCK_USE_ITEM_LIST_ITEM_TYPE,
            enhancement: 18,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

      expect(componentVM.isItemTRI()).toBeTruthy();
    });
  });

  describe('should return proper data from isItemTET', () => {
    it('when mainCategory = 20', () => {
      component = defineComponent({
        setup() {
          return useItemType({
            ...MOCK_USE_ITEM_LIST_ITEM_TYPE,
            mainCategory: 20,
            enhancement: 4,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

      expect(componentVM.isItemTET()).toBeTruthy();
    });

    it('when enhancement = 19', () => {
      component = defineComponent({
        setup() {
          return useItemType({
            ...MOCK_USE_ITEM_LIST_ITEM_TYPE,
            enhancement: 19,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

      expect(componentVM.isItemTET()).toBeTruthy();
    });
  });

  describe('should return proper data from isItemPEN', () => {
    it('when mainCategory = 20', () => {
      component = defineComponent({
        setup() {
          return useItemType({
            ...MOCK_USE_ITEM_LIST_ITEM_TYPE,
            mainCategory: 20,
            enhancement: 5,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

      expect(componentVM.isItemPEN()).toBeTruthy();
    });

    it('when enhancement = 20', () => {
      component = defineComponent({
        setup() {
          return useItemType({
            ...MOCK_USE_ITEM_LIST_ITEM_TYPE,
            enhancement: 20,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;

      expect(componentVM.isItemPEN()).toBeTruthy();
    });
  });
});
