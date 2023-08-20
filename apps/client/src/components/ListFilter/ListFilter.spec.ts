import { ComponentInternalInstance, ComponentPublicInstance } from 'vue';
import { DOMWrapper, VueWrapper, flushPromises, shallowMount } from '@vue/test-utils';
import { extractFromSetup } from '@test/helpers/jest/extract-from-setup';
import { mockPlugins } from '@test/mocks/plugins.mock';
import { mockProvide } from '@test/mocks/provide.mock';
import { ListFilterData } from '@/interfaces/list-filter';
import { ListFilterButtonSearchState, ListFilterButtonSortState } from '@/enums/list-filter';
import ItemFavoritesModal from '@/components/ItemFavorites/ItemFavoritesModal.vue';
import ListFilter from '@/components/ListFilter/ListFilter.vue';

describe('ListFilter', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(ListFilter, {
      global: {
        plugins: mockPlugins(),
        provide: mockProvide(),
        stubs: {
          teleport: true,
        },
      },
    });
  });

  it('should emit filter event on submit', () => {
    const listFilterForm: DOMWrapper<HTMLElement> = wrapper.find('[data-test="list-filter-form"]');
    listFilterForm.trigger('submit');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.filter;

    expect(Array.isArray(events)).toBeTruthy();
  });

  it('should emit filter event on change', () => {
    const listFilterSearch: DOMWrapper<HTMLElement> = wrapper.find('[data-test="list-filter-search"]');
    listFilterSearch.trigger('change');

    const emitted: Record<string, unknown[]> = wrapper.emitted();
    const [events] = emitted.filter;

    expect(Array.isArray(events)).toBeTruthy();
  });

  describe('should emit filter event on click', () => {
    it('when data-test = list-filter-search-context', () => {
      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
        '[data-test="list-filter-search-context"]',
      );

      const component: ComponentInternalInstance = componentWrapper.getCurrentComponent();
      component.emit('click');

      const emitted: Record<string, unknown[]> = wrapper.emitted();
      const [events] = emitted.filter;

      expect(Array.isArray(events)).toBeTruthy();
    });

    it('when data-test = list-filter-sort-count', () => {
      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
        '[data-test="list-filter-sort-count"]',
      );

      const component: ComponentInternalInstance = componentWrapper.getCurrentComponent();
      component.emit('click');

      const emitted: Record<string, unknown[]> = wrapper.emitted();
      const [events] = emitted.filter;

      expect(Array.isArray(events)).toBeTruthy();
    });

    it('when data-test = list-filter-sort-price', () => {
      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
        '[data-test="list-filter-sort-price"]',
      );

      const component: ComponentInternalInstance = componentWrapper.getCurrentComponent();
      component.emit('click');

      const emitted: Record<string, unknown[]> = wrapper.emitted();
      const [events] = emitted.filter;

      expect(Array.isArray(events)).toBeTruthy();
    });

    it('when data-test = list-filter-sort-grade', () => {
      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
        '[data-test="list-filter-sort-grade"]',
      );

      const component: ComponentInternalInstance = componentWrapper.getCurrentComponent();
      component.emit('click');

      const emitted: Record<string, unknown[]> = wrapper.emitted();
      const [events] = emitted.filter;

      expect(Array.isArray(events)).toBeTruthy();
    });
  });

  describe('should update state on click', () => {
    it('when data-test = list-filter-search-context', () => {
      const stateInitial: ListFilterData = extractFromSetup<ListFilterData>(wrapper.getCurrentComponent(), 'state');
      const searchContextInitial: ListFilterButtonSearchState = stateInitial.searchContext;

      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
        '[data-test="list-filter-search-context"]',
      );

      const component: ComponentInternalInstance = componentWrapper.getCurrentComponent();
      component.emit('click');

      const state: ListFilterData = extractFromSetup<ListFilterData>(wrapper.getCurrentComponent(), 'state');
      const searchContext: ListFilterButtonSearchState = state.searchContext;

      expect(searchContextInitial).not.toBe(searchContext);
    });

    it('when data-test = list-filter-sort-count', () => {
      const stateInitial: ListFilterData = extractFromSetup<ListFilterData>(wrapper.getCurrentComponent(), 'state');
      const sortCountInitial: ListFilterButtonSortState = stateInitial.sortCount;

      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
        '[data-test="list-filter-sort-count"]',
      );

      const component: ComponentInternalInstance = componentWrapper.getCurrentComponent();
      component.emit('click');

      const state: ListFilterData = extractFromSetup<ListFilterData>(wrapper.getCurrentComponent(), 'state');
      const sortCount: ListFilterButtonSortState = state.sortCount;

      expect(sortCountInitial).not.toBe(sortCount);
    });

    it('when data-test = list-filter-sort-price', () => {
      const stateInitial: ListFilterData = extractFromSetup<ListFilterData>(wrapper.getCurrentComponent(), 'state');
      const sortPriceInitial: ListFilterButtonSortState = stateInitial.sortPrice;

      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
        '[data-test="list-filter-sort-price"]',
      );

      const component: ComponentInternalInstance = componentWrapper.getCurrentComponent();
      component.emit('click');

      const state: ListFilterData = extractFromSetup<ListFilterData>(wrapper.getCurrentComponent(), 'state');
      const sortPrice: ListFilterButtonSortState = state.sortPrice;

      expect(sortPriceInitial).not.toBe(sortPrice);
    });

    it('when data-test = list-filter-sort-grade', () => {
      const stateInitial: ListFilterData = extractFromSetup<ListFilterData>(wrapper.getCurrentComponent(), 'state');
      const sortGradeInitial: ListFilterButtonSortState = stateInitial.sortGrade;

      const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>(
        '[data-test="list-filter-sort-grade"]',
      );

      const component: ComponentInternalInstance = componentWrapper.getCurrentComponent();
      component.emit('click');

      const state: ListFilterData = extractFromSetup<ListFilterData>(wrapper.getCurrentComponent(), 'state');
      const sortGrade: ListFilterButtonSortState = state.sortGrade;

      expect(sortGradeInitial).not.toBe(sortGrade);
    });
  });

  it('should display ItemFavoritesModal on click', async () => {
    const componentWrapper: VueWrapper = wrapper.findComponent<ComponentPublicInstance>('[data-test="favorites"]');

    const component: ComponentInternalInstance = componentWrapper.getCurrentComponent();
    component.emit('click');

    await flushPromises();

    const itemFavoritesModalWrapper: VueWrapper = wrapper.findComponent(ItemFavoritesModal);

    expect(itemFavoritesModalWrapper.exists()).toBeTruthy();
  });
});
