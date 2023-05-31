import AtomButton from './AtomButton.vue'
import { mount } from '@vue/test-utils'

it('should render a button', () => {
    const wrapper = mount(AtomButton)
    expect(wrapper.html()).toContain('button')
    wrapper.unmount();
})

it('should render a button of type submit if prop type is submit', () => {
    const wrapper = mount(AtomButton, {
        props: {
        type: 'submit'
        }
    })
    expect(wrapper.html()).toContain('type="submit"')
    wrapper.unmount();
})

it('should render a button of type button if no prop type is passed', () => {
    const wrapper = mount(AtomButton)
    expect(wrapper.html()).toContain('type="button"')
    wrapper.unmount();
})

it('should apply the passed class', () => {
    const wrapper = mount(AtomButton, {
        props: {
        class: 'button-blue'
        }
    })
    expect(wrapper.html()).toContain('button-blue')
    wrapper.unmount();
})