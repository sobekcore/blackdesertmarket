import { DefineComponent, defineComponent } from 'vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { useVirtualScroll } from '@/composables/use-virtual-scroll';

type MockDataItem = Record<string, unknown>;

const MOCK_DATA_ITEM_1: MockDataItem = {};
const MOCK_DATA_ITEM_2: MockDataItem = {};
const MOCK_HEIGHT: number = 1;
const MOCK_GAP: number = 1;

describe('useVirtualScroll', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useVirtualScroll();
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  it('should return proper data from prepareData', () => {
    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const data: MockDataItem[] = componentVM.prepareData([MOCK_DATA_ITEM_1, MOCK_DATA_ITEM_2], MOCK_HEIGHT, MOCK_GAP);

    const MOCK_DATA_ITEM_PREPARED_1: MockDataItem = {
      ...MOCK_DATA_ITEM_1,
      size: MOCK_HEIGHT + MOCK_GAP,
    };

    const MOCK_DATA_ITEM_PREPARED_2: MockDataItem = {
      ...MOCK_DATA_ITEM_2,
      size: MOCK_HEIGHT,
    };

    expect(data).toEqual([MOCK_DATA_ITEM_PREPARED_1, MOCK_DATA_ITEM_PREPARED_2]);
  });
});
