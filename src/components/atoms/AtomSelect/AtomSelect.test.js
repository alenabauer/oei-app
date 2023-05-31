import AtomSelect from "./AtomSelect.vue";
import { mount } from "@vue/test-utils";

describe("AtomSelect", () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(AtomSelect);
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it("should render a select", () => {
        expect(wrapper.html()).toContain("select");
    });

    it("should render a select with the passed options", async () => {
        wrapper.setProps({
            options: ["option1", "option2", "option3"],
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toContain("option1");
        expect(wrapper.html()).toContain("option2");
        expect(wrapper.html()).toContain("option3");
    });

    it("should render a select with 'Select...' as the first option if label prop is not provided", () => {
        expect(wrapper.html()).toContain("Select...");
    });

    it("should render a select with the passed label as the first option if label prop is provided", async () => {
        wrapper.setProps({
            label: "Select an option",
            options: ["option1", "option2", "option3"],
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toContain("Select an option");
    });
});
