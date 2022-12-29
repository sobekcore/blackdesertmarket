import { DefineComponent, defineComponent } from 'vue';
import { VueWrapper, mount } from '@vue/test-utils';
import { useDocumentSize } from '@/composables/use-document-size';

const MOCK_USE_DOCUMENT_SIZE_PIXEL: string = '100px';
const MOCK_USE_DOCUMENT_SIZE_REM: string = '10rem';

describe('useDocumentSize', () => {
  let component: DefineComponent;
  let wrapper: VueWrapper;

  beforeEach(() => {
    component = defineComponent({
      setup() {
        return useDocumentSize();
      },
      template: '<slot></slot>',
    });

    wrapper = mount(component);
  });

  it('should return proper data from pixelToRaw', () => {
    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const size: number = componentVM.pixelToRaw(MOCK_USE_DOCUMENT_SIZE_PIXEL);

    expect(size).toBe(100);
  });

  it('should return proper data from remToRaw', () => {
    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const size: number = componentVM.remToRaw(MOCK_USE_DOCUMENT_SIZE_REM);

    expect(size).toBe(160);
  });

  it('should return proper data from remToPixel', () => {
    const componentVM: Record<string, any> = wrapper.vm as Record<string, any>;
    const size: number = componentVM.remToPixel(MOCK_USE_DOCUMENT_SIZE_REM);

    expect(size).toBe('160px');
  });
});
