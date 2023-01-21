import { ComponentInternalInstance } from 'vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { Placement, Tooltip } from 'floating-vue';
import AppTooltip from '@/components/Base/AppTooltip.vue';

const MOCK_PLACEMENT: Placement = 'bottom';
const MOCK_DISABLED: boolean = false;

describe('AppTooltip', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppTooltip);
  });

  it('should emit show event on show', () => {
    const tooltipWrapper: VueWrapper = wrapper.findComponent(Tooltip);

    const component: ComponentInternalInstance = tooltipWrapper.getCurrentComponent();
    component.emit('show');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.show;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should handle show event from Tooltip', () => {
    const tooltipWrapper: VueWrapper = wrapper.findComponent(Tooltip);

    const component: ComponentInternalInstance = tooltipWrapper.getCurrentComponent();
    component.emit('show');

    const emitted: Record<string, unknown[]> = tooltipWrapper.emitted();
    const [events] = emitted.show;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should pass placement prop to Tooltip depending on placement prop', () => {
    wrapper = shallowMount(AppTooltip, {
      props: {
        placement: MOCK_PLACEMENT,
      },
    });

    const tooltipWrapper: VueWrapper = wrapper.findComponent(Tooltip);
    const tooltipAttributes: Record<string, string> = tooltipWrapper.attributes();

    expect(tooltipAttributes).toHaveProperty('placement');
    expect(tooltipAttributes.placement).toBe(MOCK_PLACEMENT);
  });

  it('should pass disabled prop to Tooltip depending on disabled prop', () => {
    wrapper = shallowMount(AppTooltip, {
      props: {
        disabled: MOCK_DISABLED,
      },
    });

    const tooltipWrapper: VueWrapper = wrapper.findComponent(Tooltip);
    const tooltipAttributes: Record<string, string> = tooltipWrapper.attributes();

    expect(tooltipAttributes).toHaveProperty('disabled');
    expect(tooltipAttributes.disabled).toBe(String(MOCK_DISABLED));
  });
});
