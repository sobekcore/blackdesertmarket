import { DefineComponent, defineComponent } from 'vue';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { mockBlackDesertItem } from '@blackdesertmarket/mocks';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockListFilterData } from '@test/mocks/list-filter.mock';
import { ListFilterData } from '@/interfaces/list-filter';
import { ListFilterButtonSearchState, ListFilterButtonSortState } from '@/enums/list-filter';
import { useListFilter } from '@/composables/list-filter/use-list-filter';

const MOCK_FILTER_DATA: ListFilterData = mockListFilterData();
const MOCK_ITEM: BlackDesertItem = mockBlackDesertItem();

describe('useListFilter', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useListFilter(MOCK_FILTER_DATA);
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  describe('should return proper data from filterItemList', () => {
    it('when search does not match data', () => {
      component = defineComponent({
        setup() {
          return useListFilter({
            ...MOCK_FILTER_DATA,
            searchContext: ListFilterButtonSearchState.BY_CATEGORY,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const filteredItemList: string = componentVM.filterItemList([MOCK_ITEM]);

      expect(filteredItemList).toEqual([]);
    });

    it('when search does match data', () => {
      component = defineComponent({
        setup() {
          return useListFilter({
            ...MOCK_FILTER_DATA,
            search: 'Weeds',
            searchContext: ListFilterButtonSearchState.BY_CATEGORY,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const filteredItemList: string = componentVM.filterItemList([MOCK_ITEM]);

      expect(filteredItemList).toEqual([MOCK_ITEM]);
    });
  });

  describe('should return proper data from sortItemList', () => {
    const MOCK_ITEM_COUNT_1: BlackDesertItem = {
      ...MOCK_ITEM,
      count: 1,
    };

    const MOCK_ITEM_COUNT_2: BlackDesertItem = {
      ...MOCK_ITEM,
      count: 2,
    };

    it('when sortCount = desc', () => {
      component = defineComponent({
        setup() {
          return useListFilter({
            ...MOCK_FILTER_DATA,
            sortCount: ListFilterButtonSortState.DESC,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const sortedItemList: string = componentVM.sortItemList([MOCK_ITEM_COUNT_1, MOCK_ITEM_COUNT_2]);

      expect(sortedItemList).toEqual([MOCK_ITEM_COUNT_2, MOCK_ITEM_COUNT_1]);
    });

    it('when sortCount = asc', () => {
      component = defineComponent({
        setup() {
          return useListFilter({
            ...MOCK_FILTER_DATA,
            sortCount: ListFilterButtonSortState.ASC,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const sortedItemList: string = componentVM.sortItemList([MOCK_ITEM_COUNT_1, MOCK_ITEM_COUNT_2]);

      expect(sortedItemList).toEqual([MOCK_ITEM_COUNT_1, MOCK_ITEM_COUNT_2]);
    });

    const MOCK_ITEM_PRICE_1: BlackDesertItem = {
      ...MOCK_ITEM,
      basePrice: 1,
    };

    const MOCK_ITEM_PRICE_2: BlackDesertItem = {
      ...MOCK_ITEM,
      basePrice: 2,
    };

    it('when sortPrice = desc', () => {
      component = defineComponent({
        setup() {
          return useListFilter({
            ...MOCK_FILTER_DATA,
            sortPrice: ListFilterButtonSortState.DESC,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const sortedItemList: string = componentVM.sortItemList([MOCK_ITEM_PRICE_1, MOCK_ITEM_PRICE_2]);

      expect(sortedItemList).toEqual([MOCK_ITEM_PRICE_2, MOCK_ITEM_PRICE_1]);
    });

    it('when sortPrice = asc', () => {
      component = defineComponent({
        setup() {
          return useListFilter({
            ...MOCK_FILTER_DATA,
            sortPrice: ListFilterButtonSortState.ASC,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const sortedItemList: string = componentVM.sortItemList([MOCK_ITEM_PRICE_1, MOCK_ITEM_PRICE_2]);

      expect(sortedItemList).toEqual([MOCK_ITEM_PRICE_1, MOCK_ITEM_PRICE_2]);
    });

    const MOCK_ITEM_GRADE_1: BlackDesertItem = {
      ...MOCK_ITEM,
      grade: 1,
    };

    const MOCK_ITEM_GRADE_2: BlackDesertItem = {
      ...MOCK_ITEM,
      grade: 2,
    };

    it('when sortGrade = desc', () => {
      component = defineComponent({
        setup() {
          return useListFilter({
            ...MOCK_FILTER_DATA,
            sortGrade: ListFilterButtonSortState.DESC,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const sortedItemList: string = componentVM.sortItemList([MOCK_ITEM_GRADE_1, MOCK_ITEM_GRADE_2]);

      expect(sortedItemList).toEqual([MOCK_ITEM_GRADE_2, MOCK_ITEM_GRADE_1]);
    });

    it('when sortGrade = asc', () => {
      component = defineComponent({
        setup() {
          return useListFilter({
            ...MOCK_FILTER_DATA,
            sortGrade: ListFilterButtonSortState.ASC,
          });
        },
        template: '<slot></slot>',
      });

      wrapper = mount(component);

      const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
      const sortedItemList: string = componentVM.sortItemList([MOCK_ITEM_GRADE_1, MOCK_ITEM_GRADE_2]);

      expect(sortedItemList).toEqual([MOCK_ITEM_GRADE_1, MOCK_ITEM_GRADE_2]);
    });
  });

  /**
   * TODO: Write a unit test for processItemList function of useListFilter composable
   */
});
