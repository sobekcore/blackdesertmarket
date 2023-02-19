import { VueWrapper, shallowMount } from '@vue/test-utils';
import CategorySidemenu from '@/components/CategorySidemenu/CategorySidemenu.vue';
import CategorySidemenuHeader from '@/components/CategorySidemenu/CategorySidemenuHeader/CategorySidemenuHeader.vue';
import CategorySidemenuList from '@/components/CategorySidemenu/CategorySidemenuList.vue';

describe('CategorySidemenu', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(CategorySidemenu);
  });

  it('should render CategorySidemenuHeader component', () => {
    const categorySidemenuHeaderWrapper: VueWrapper = wrapper.findComponent(CategorySidemenuHeader);

    expect(categorySidemenuHeaderWrapper.exists()).toBeTruthy();
  });

  it('should render CategorySidemenuList component', () => {
    const categorySidemenuListWrapper: VueWrapper = wrapper.findComponent(CategorySidemenuList);

    expect(categorySidemenuListWrapper.exists()).toBeTruthy();
  });
});
