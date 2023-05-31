import AtomInput from "./AtomInput.vue";
import { mount } from "@vue/test-utils";

describe("AtomInput", () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(AtomInput);
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it("should render an input", () => {
        expect(wrapper.html()).toContain("input");
    });

    it("should render an input of type text if no prop type is passed", async () => {
        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toContain("type=\"text\"");
    });

    it("should render an input of type password if prop type is password", async () => {
        wrapper.setProps({
            type: "password"
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toContain("type=\"password\"");
    });
});
