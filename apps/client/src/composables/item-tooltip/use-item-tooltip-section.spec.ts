import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemTooltipSection } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemTooltipSection } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { useItemTooltipSection } from '@/composables/item-tooltip/use-item-tooltip-section';

const MOCK_ITEM_TOOLTIP_SECTION: BlackDesertItemTooltipSection = mockBlackDesertItemTooltipSection();

describe('useItemTooltipSection', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemTooltipSection(MOCK_ITEM_TOOLTIP_SECTION);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  it('should return proper data from getSectionName', () => {
    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const sectionName: number = componentVM.getSectionName();

    expect(sectionName).toBe(`– ${MOCK_ITEM_TOOLTIP_SECTION.name}`);
  });
});
