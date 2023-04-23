import { ComputedRef, DefineComponent, defineComponent } from 'vue';
import { BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemQueue } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { useDateFormat } from '@vueuse/core';
import { useItemQueue } from '@/composables/item-queue/use-item-queue';

const MOCK_ITEM_QUEUE: BlackDesertItemQueue = mockBlackDesertItemQueue();

describe('useItemQueue', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useItemQueue(MOCK_ITEM_QUEUE);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  it('should return proper data from getEndTime', () => {
    const dateFormat: ComputedRef<string> = useDateFormat(MOCK_ITEM_QUEUE.endTime, 'MM-DD HH:mm');

    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const endTime: string = componentVM.getEndTime();

    expect(endTime).toBe(dateFormat.value);
  });
});
