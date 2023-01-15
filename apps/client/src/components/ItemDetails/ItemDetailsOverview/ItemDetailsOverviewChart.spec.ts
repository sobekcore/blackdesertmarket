import { Line } from 'vue-chartjs';
import { getFirstElement } from '@blackdesertmarket/helpers';
import { BlackDesertItemDetailsHistory } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItemDetailsHistory } from '@blackdesertmarket/mocks';
import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { DefaultDataPoint } from 'chart.js/dist/types';
import { extractFromSetup } from '@test/helpers/extract-from-setup';
import ItemDetailsOverviewChart from '@/components/ItemDetails/ItemDetailsOverview/ItemDetailsOverviewChart.vue';

type ChartType = 'line';

const MOCK_DATA_ITEM: BlackDesertItemDetailsHistory = mockBlackDesertItemDetailsHistory();
const MOCK_DAYS: number = 31;
const MOCK_CLASS: string = 'mock-class';

describe('ItemDetailsOverviewChart', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ItemDetailsOverviewChart, {
      props: {
        data: [MOCK_DATA_ITEM],
        days: MOCK_DAYS,
      },
    });
  });

  it('should render Line component', () => {
    const lineWrapper: VueWrapper = wrapper.findComponent(Line);

    expect(lineWrapper.exists()).toBeTruthy();
  });

  it('should pass class attribute to div depending on class prop', () => {
    wrapper = shallowMount(ItemDetailsOverviewChart, {
      props: {
        data: [MOCK_DATA_ITEM],
        days: MOCK_DAYS,
        class: MOCK_CLASS,
      },
    });

    const outer: DOMWrapper<HTMLElement> = wrapper.find('[data-test="outer"]');
    const outerAttributes: Record<string, string> = outer.attributes();

    expect(outerAttributes).toHaveProperty('class');
    expect(outerAttributes.class).toContain(MOCK_CLASS);
  });

  it('should pass data prop to Line depending on data prop', () => {
    wrapper = shallowMount(ItemDetailsOverviewChart, {
      props: {
        data: [MOCK_DATA_ITEM],
        days: MOCK_DAYS,
      },
    });

    const unit: number = extractFromSetup<number>(wrapper.getCurrentComponent(), 'unit');

    const lineWrapper: VueWrapper = wrapper.findComponent(Line);
    const lineVM: Record<string, any> = lineWrapper.vm as Record<string, any>;

    expect(lineVM).toHaveProperty('data');
    expect(lineVM.data).toHaveProperty('datasets');

    const datasets: DefaultDataPoint<ChartType> = lineVM.data.datasets;
    const data: number[] = [MOCK_DATA_ITEM.onePrice / unit];

    expect(datasets).toHaveLength(1);
    expect(getFirstElement(datasets)).toHaveProperty('data', data);
  });
});
