import AtomInput from "./AtomInput.vue";
import { mount } from "@vue/test-utils";

it("should render an input", () => {
    const wrapper = mount(AtomInput);
    expect(wrapper.html()).toContain("input");
})

it("should render an input of type text if no prop type is passed", () => {
    const wrapper = mount(AtomInput);
    expect(wrapper.html()).toContain("type=\"text\"");
})

it("should render an input of type password if prop type is password", () => {
    const wrapper = mount(AtomInput, {
        props: {
            type: "password"
        }
    });
    expect(wrapper.html()).toContain("type=\"password\"");
})