import AtomError from './AtomError.vue';
import { mount } from '@vue/test-utils';

describe('AtomError', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(AtomError, {
            props: {
                errorMessage: 'This is an error message'
            }
        });
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it('should render the error message', () => {
        expect(wrapper.html()).toContain('This is an error message');
    });

    it('should accept the errorMessage prop', () => {
        expect(wrapper.props().errorMessage).toBe('This is an error message');
    });

    it('should accept only string as errorMessage', async () => {
        wrapper.setProps({
            errorMessage: 123
        });

        await wrapper.vm.$nextTick();

        expect(wrapper).toThrow(TypeError);
    });
});
