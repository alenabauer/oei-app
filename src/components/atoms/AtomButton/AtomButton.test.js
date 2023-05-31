import AtomButton from './AtomButton.vue';
import { mount } from '@vue/test-utils';

describe('AtomButton', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(AtomButton);
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it('should render a button', () => {
        expect(wrapper.html()).toContain('button');
    });

    it('should render a button of type button if no prop type is passed', () => {
        expect(wrapper.html()).toContain('type="button"');
    });

    it('should render a button of type submit if prop type is submit', async () => {
        wrapper.setProps({
            type: 'submit'
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toContain('type="submit"');
    });

    it('should apply the passed class', async () => {
        wrapper.setProps({
            class: 'button-blue'
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toContain('button-blue');
    });
});
