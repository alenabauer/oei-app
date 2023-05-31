import AtomLogo from './AtomLogo.vue';
import { mount } from "@vue/test-utils";

it('should render correctly', () => {
    const wrapper = mount(AtomLogo);
    expect(wrapper.html()).toMatchSnapshot();
})

it('should render an image', () => {
    const wrapper = mount(AtomLogo);
    expect(wrapper.html()).toContain('img');
})

it('should render an image with the correct src', () => {
    const wrapper = mount(AtomLogo);
    expect(wrapper.html()).toContain('src="/src/assets/logo.png"');
})