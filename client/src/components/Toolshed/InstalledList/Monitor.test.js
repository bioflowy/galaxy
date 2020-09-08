import { mount } from "@vue/test-utils";
import Monitor from "./Monitor";
import { __RewireAPI__ as rewire } from "./Monitor";
import Vue from "vue";

describe("Monitor", () => {
    beforeEach(() => {
        rewire.__Rewire__(
            "Services",
            class {
                async getInstalledRepositories() {
                    return [
                        {
                            name: "name_0",
                            owner: "owner_0",
                            status: "status_0_0",
                            description: "description_0_0",
                        },
                        {
                            name: "name_1",
                            owner: "owner_1",
                            status: "status_1",
                            description: "description_1",
                        },
                    ];
                }
            }
        );
    });

    it("test monitor", async () => {
        const wrapper = mount(Monitor, {});
        await Vue.nextTick();
        const headers = wrapper.findAll("th");
        expect(headers.length).toBe(2);
        expect(headers.at(0).text()).toBe("Name");
        expect(headers.at(1).text()).toBe("Status");
        const cells = wrapper.findAll("td");
        expect(cells.length).toBe(4);
        expect(cells.at(0).text()).toBe("name_0 (owner_0)");
        expect(cells.at(2).text()).toBe("name_1 (owner_1)");
    });
});
