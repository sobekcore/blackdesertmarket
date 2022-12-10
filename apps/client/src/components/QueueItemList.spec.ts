import { ComponentInternalInstance } from 'vue';
import { BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemQueue } from '@blackdesertmarket/mocks';
import { VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import ItemDetailsModal from '@/components/ItemDetails/ItemDetailsModal.vue';
import ListItem from '@/components/ListItem/ListItem.vue';
import QueueItemList from '@/components/QueueItemList.vue';

const MOCK_QUEUE_ITEM_LIST_ITEM_QUEUE: BlackDesertItemQueue = mockBlackDesertItemQueue();

jest.mock('@/composables/use-queue-item-list', () => ({
  useQueueItemList: () => ({
    fetch: () => Promise.resolve([MOCK_QUEUE_ITEM_LIST_ITEM_QUEUE]),
  }),
}));

describe('QueueItemList', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(QueueItemList, {
      global: {
        plugins: mockPlugins(),
        stubs: {
          teleport: true,
        },
      },
    });
  });

  it('should render ListItem component', () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    expect(listItemWrapper.exists()).toBeTruthy();
  });

  it('should handle effect event from ListItem', () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    const component: ComponentInternalInstance = listItemWrapper.getCurrentComponent();
    component.emit('effect');

    const emitted: Record<string, unknown[]> = listItemWrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should handle close event from ItemDetailsModal', async () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    const listItemComponent: ComponentInternalInstance = listItemWrapper.getCurrentComponent();
    listItemComponent.emit('effect');

    await flushPromises();

    const itemDetailsModalWrapper: VueWrapper = wrapper.findComponent(ItemDetailsModal);

    const itemDetailsModalComponent: ComponentInternalInstance = itemDetailsModalWrapper.getCurrentComponent();
    itemDetailsModalComponent.emit('effect');

    const emitted: Record<string, unknown[]> = itemDetailsModalWrapper.emitted();
    const [events] = emitted.effect;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should display ItemDetailsModal after effect event', async () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    const component: ComponentInternalInstance = listItemWrapper.getCurrentComponent();
    component.emit('effect');

    await flushPromises();

    const itemDetailsModalWrapper: VueWrapper = wrapper.findComponent(ItemDetailsModal);

    expect(itemDetailsModalWrapper.exists()).toBeTruthy();
  });

  it('should pass item prop to ListItem', () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);
    const listItemVM: Record<string, any> = listItemWrapper.vm as Record<string, any>;

    expect(listItemVM).toHaveProperty('item');
    expect(listItemVM.item).toEqual(MOCK_QUEUE_ITEM_LIST_ITEM_QUEUE);
  });

  it('should pass id prop to ItemDetailsModal', async () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    const component: ComponentInternalInstance = listItemWrapper.getCurrentComponent();
    component.emit('effect');

    await flushPromises();

    const itemDetailsModalWrapper: VueWrapper = wrapper.findComponent(ItemDetailsModal);
    const itemDetailsModalAttributes: Record<string, string> = itemDetailsModalWrapper.attributes();

    expect(itemDetailsModalAttributes).toHaveProperty('id');
    expect(itemDetailsModalAttributes.id).toBe(String(MOCK_QUEUE_ITEM_LIST_ITEM_QUEUE.id));
  });

  it('should pass enhancement prop to ItemDetailsModal', async () => {
    const listItemWrapper: VueWrapper = wrapper.findComponent(ListItem);

    const component: ComponentInternalInstance = listItemWrapper.getCurrentComponent();
    component.emit('effect');

    await flushPromises();

    const itemDetailsModalWrapper: VueWrapper = wrapper.findComponent(ItemDetailsModal);
    const itemDetailsModalAttributes: Record<string, string> = itemDetailsModalWrapper.attributes();

    expect(itemDetailsModalAttributes).toHaveProperty('enhancement');
    expect(itemDetailsModalAttributes.enhancement).toBe(String(MOCK_QUEUE_ITEM_LIST_ITEM_QUEUE.enhancement));
  });
});
