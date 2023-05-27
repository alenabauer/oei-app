import AtomSelect from "./AtomSelect.vue";
import { mount } from "@vue/test-utils";

it("should render a select", () => {
    const wrapper = mount(AtomSelect);
    expect(wrapper.html()).toContain("select");
})

it("should render a select with the passed options", () => {
    const wrapper = mount(AtomSelect, {
        props: {
            options: ["option1", "option2", "option3"]
        }
    });
    expect(wrapper.html()).toContain("option1");
    expect(wrapper.html()).toContain("option2");
    expect(wrapper.html()).toContain("option3");
})

it("should render a select with \'Select...\' as the first option if label prop is not provided", () => {
    const wrapper = mount(AtomSelect, {
        props: {
            options: ["option1", "option2", "option3"]
        }
    });
    expect(wrapper.html()).toContain("Select...");
})

it("should render a select with the passed label as the first option if label prop is provided", () => {
    const wrapper = mount(AtomSelect, {
        props: {
            label: "Select an option",
            options: ["option1", "option2", "option3"]
        }
    });
    expect(wrapper.html()).toContain("Select an option");
})