import { DOMWrapper, VueWrapper, shallowMount } from '@vue/test-utils';
import { extractFromSetup } from '@test/helpers/extract-from-setup';
import { SocialIcon } from '@/enums/social-icon';
import AppSocialIcon from '@/components/Base/AppSocialIcon.vue';

const MOCK_NAME: SocialIcon = SocialIcon.GITHUB;

describe('AppSocialIcon', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppSocialIcon, {
      props: {
        name: MOCK_NAME,
      },
    });
  });

  it('should pass href attribute to a depending on name prop', () => {
    wrapper = shallowMount(AppSocialIcon, {
      props: {
        name: MOCK_NAME,
      },
    });

    const iconNameLinkMap: Record<SocialIcon, string> = extractFromSetup<Record<SocialIcon, string>>(
      wrapper.getCurrentComponent(),
      'iconNameLinkMap',
    );

    const link: DOMWrapper<HTMLElement> = wrapper.find('[data-test="link"]');
    const linkAttributes: Record<string, string> = link.attributes();

    expect(linkAttributes).toHaveProperty('href');
    expect(linkAttributes.href).toBe(iconNameLinkMap[MOCK_NAME]);
  });
});
