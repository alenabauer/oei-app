import AtomError from './AtomError.vue'
import { mount } from '@vue/test-utils'

it('should render the error message', () => {
    const wrapper = mount(AtomError, {
        props: {
            errorMessage: 'This is an error message'
        }
    })
    expect(wrapper.html()).toContain('This is an error message')
    wrapper.unmount();
})

it('should accept the errorMessage prop', () => {
    const wrapper = mount(AtomError, {
        props: {
        errorMessage: 'This is an error message'
        }
    })
    expect(wrapper.props().errorMessage).toBe('This is an error message')
    wrapper.unmount();
})

it('should accept only string as errorMessage', () => {
    const wrapper = mount(AtomError, {
        props: {
        errorMessage: 123
        }
    })
    expect(wrapper).toThrow(TypeError)
    wrapper.unmount();
})