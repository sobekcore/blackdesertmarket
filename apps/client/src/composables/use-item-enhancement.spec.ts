import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemType } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemType } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { ItemEnhancementNameData, useItemEnhancement } from '@/composables/use-item-enhancement';

const MOCK_USE_ITEM_ENHANCEMENT_ITEM_TYPE: BlackDesertItemType = mockBlackDesertItemType();

describe('useItemEnhancement', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemEnhancement(MOCK_USE_ITEM_ENHANCEMENT_ITEM_TYPE);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  describe('should return proper name from getName', () => {
    it('when enhancement = 0', () => {
      component = defineComponent({
        setup() {
          return useItemEnhancement({
            ...MOCK_USE_ITEM_ENHANCEMENT_ITEM_TYPE,
            enhancement: 0,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const name: ItemEnhancementNameData = componentVM.getName();

      expect(name.name).toBe('');
      expect(name.short).toBe('');
      expect(name.advanced).toBeFalsy();
    });

    it('when enhancement > 1 and enhancement <= 15', () => {
      for (let enhancement = 1; enhancement <= 15; enhancement++) {
        component = defineComponent({
          setup() {
            return useItemEnhancement({
              ...MOCK_USE_ITEM_ENHANCEMENT_ITEM_TYPE,
              enhancement: enhancement,
            });
          },
          template: '<slot></slot>',
        });

        wrapper = mount(component);

        const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
        const name: ItemEnhancementNameData = componentVM.getName();

        expect(name.name).toBe(`+${enhancement}`);
        expect(name.short).toBe(`+${enhancement}`);
        expect(name.advanced).toBeFalsy();
      }
    });

    it('when enhancement = 16', () => {
      component = defineComponent({
        setup() {
          return useItemEnhancement({
            ...MOCK_USE_ITEM_ENHANCEMENT_ITEM_TYPE,
            enhancement: 16,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const name: ItemEnhancementNameData = componentVM.getName();

      expect(name.name).toBe('PRI');
      expect(name.short).toBe('I');
      expect(name.advanced).toBeTruthy();
    });

    it('when enhancement = 17', () => {
      component = defineComponent({
        setup() {
          return useItemEnhancement({
            ...MOCK_USE_ITEM_ENHANCEMENT_ITEM_TYPE,
            enhancement: 17,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const name: ItemEnhancementNameData = componentVM.getName();

      expect(name.name).toBe('DUO');
      expect(name.short).toBe('II');
      expect(name.advanced).toBeTruthy();
    });

    it('when enhancement = 18', () => {
      component = defineComponent({
        setup() {
          return useItemEnhancement({
            ...MOCK_USE_ITEM_ENHANCEMENT_ITEM_TYPE,
            enhancement: 18,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const name: ItemEnhancementNameData = componentVM.getName();

      expect(name.name).toBe('TRI');
      expect(name.short).toBe('III');
      expect(name.advanced).toBeTruthy();
    });

    it('when enhancement = 19', () => {
      component = defineComponent({
        setup() {
          return useItemEnhancement({
            ...MOCK_USE_ITEM_ENHANCEMENT_ITEM_TYPE,
            enhancement: 19,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const name: ItemEnhancementNameData = componentVM.getName();

      expect(name.name).toBe('TET');
      expect(name.short).toBe('IV');
      expect(name.advanced).toBeTruthy();
    });

    it('when enhancement = 20', () => {
      component = defineComponent({
        setup() {
          return useItemEnhancement({
            ...MOCK_USE_ITEM_ENHANCEMENT_ITEM_TYPE,
            enhancement: 20,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const name: ItemEnhancementNameData = componentVM.getName();

      expect(name.name).toBe('PEN');
      expect(name.short).toBe('V');
      expect(name.advanced).toBeTruthy();
    });
  });
});
