import MoleculeFileUploader from "./MoleculeFileUploader.vue";
import { mount } from "@vue/test-utils";

describe("MoleculeFileUploader", () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(MoleculeFileUploader);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    it("should render an input", () => {
        expect(wrapper.html()).toContain("input");
    })

    it("should render an input with the type file", () => {
        expect(wrapper.html()).toContain("type=\"file\"");
    })

    it("should accept only geojson files", () => {
        expect(wrapper.html()).toContain("accept=\".geojson\"");
    })

    it("should render an error message if the error value is not null", async () => {
        wrapper.setData({
            error: "This is an error"
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.file-upload__error').exists()).toBe(true);

        wrapper.setData({
            error: null
        });
    })

    it("should render an error message if the geojson is not valid", async () => {
        const testGeoJson = {
            geometry: {
                coordinates: [[0, 0]],
            },
            properties: {},
        };

        wrapper.vm.processData(testGeoJson, "test.geojson");

        await wrapper.vm.$nextTick();

        expect(wrapper.find(".file-upload__error").exists()).toBe(true);
    });
})