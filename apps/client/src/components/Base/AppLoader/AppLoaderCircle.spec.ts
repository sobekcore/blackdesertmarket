import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { extractFromSetup } from '@test/helpers/extract-from-setup';
import { UnitTestException } from '@/exceptions/unit-test-exception';
import AppLoaderCircle from '@/components/Base/AppLoader/AppLoaderCircle.vue';

const MOCK_X: number = 20;
const MOCK_Y: number = 20;
const MOCK_RADIUS: number = 2;
const MOCK_OPACITY: number = 0.5;
const MOCK_BEGIN: number = 0;

describe('AppLoaderCircle', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppLoaderCircle, {
      props: {
        x: MOCK_X,
        y: MOCK_Y,
        radius: MOCK_RADIUS,
        opacity: MOCK_OPACITY,
        begin: MOCK_BEGIN,
      },
    });
  });

  it('should pass cx attribute to circle depending on x prop', () => {
    const circle: DOMWrapper<HTMLElement> = wrapper.find('[data-test="circle"]');
    const circleAttributes: Record<string, string> = circle.attributes();

    expect(circleAttributes).toHaveProperty('cx');
    expect(circleAttributes.cx).toBe(String(MOCK_X));
  });

  it('should pass cy attribute to circle depending on y prop', () => {
    const circle: DOMWrapper<HTMLElement> = wrapper.find('[data-test="circle"]');
    const circleAttributes: Record<string, string> = circle.attributes();

    expect(circleAttributes).toHaveProperty('cy');
    expect(circleAttributes.cy).toBe(String(MOCK_Y));
  });

  it('should pass r attribute to circle depending on radius prop', () => {
    const circle: DOMWrapper<HTMLElement> = wrapper.find('[data-test="circle"]');
    const circleAttributes: Record<string, string> = circle.attributes();

    expect(circleAttributes).toHaveProperty('r');
    expect(circleAttributes.r).toBe(String(MOCK_RADIUS));
  });

  it('should pass opacity attribute to circle depending on opacity prop', () => {
    const circle: DOMWrapper<HTMLElement> = wrapper.find('[data-test="circle"]');
    const circleAttributes: Record<string, string> = circle.attributes();

    expect(circleAttributes).toHaveProperty('opacity');
    expect(circleAttributes.opacity).toBe(String(MOCK_OPACITY));
  });

  it('should pass begin attribute to animate depending on begin prop', () => {
    const animate: DOMWrapper<HTMLElement> = wrapper.find('[data-test="animate"]');
    const animateAttributes: Record<string, string> = animate.attributes();

    const formatAnimationBegin: unknown = extractFromSetup(wrapper.getCurrentComponent(), 'formatAnimationBegin');

    if (!(formatAnimationBegin instanceof Function)) {
      throw new UnitTestException('Component property formatAnimationBegin is not a function');
    }

    expect(animateAttributes).toHaveProperty('begin');
    expect(animateAttributes.begin).toBe(formatAnimationBegin(MOCK_BEGIN));
  });
});
