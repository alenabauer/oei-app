import AtomLogo from './AtomLogo.vue';
import { mount } from "@vue/test-utils";

describe("AtomLogo", () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(AtomLogo);
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it('should render an image', () => {
        expect(wrapper.html()).toContain('img');
    });

    it('should render an image with the correct src', () => {
        expect(wrapper.html()).toContain('src="/src/assets/logo.png"');
    });
});
