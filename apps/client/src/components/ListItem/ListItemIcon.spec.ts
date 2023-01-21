import { VueWrapper, shallowMount } from '@vue/test-utils';
import { mockPlugins } from '@test/mocks/plugins.mock';
import AppTooltip from '@/components/Base/AppTooltip.vue';
import ListItemIcon from '@/components/ListItem/ListItemIcon.vue';

const MOCK_LIST_ITEM_ICON_SRC: string = 'images/other/in-registration-queue.png';

describe('ListItemIcon', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListItemIcon, {
      global: {
        plugins: mockPlugins(),
      },
      props: {
        src: MOCK_LIST_ITEM_ICON_SRC,
      },
    });
  });

  it('should render AppTooltip component', () => {
    const tooltipWrapper: VueWrapper = wrapper.findComponent(AppTooltip);

    expect(tooltipWrapper.exists()).toBeTruthy();
  });
});
