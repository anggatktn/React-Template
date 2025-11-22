import type { NavigateFunction } from "react-router-dom";
import { StateFlow } from "../../../../utils/StateFlow";
import { type SSNLibState } from "./ssn-lib-state";

export class SSNLibModel {
    public readonly state: StateFlow<SSNLibState> = new StateFlow({
        sortBy: "S/N",
        searchValue: "",
        ssnLibList: ["1"],
    } as SSNLibState);

    private navigate?: NavigateFunction;

    constructor(navigate?: NavigateFunction) {
        this.navigate = navigate;
    }

    public handleSortChange = (value: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            sortBy: value
        });
    }

    public handleAddSSN = () => {
        this.navigate?.('/dashboard/ssn-lib/new');
    }

    public handleSearch = (value: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            searchValue: value
        });
    }

    public handleSSNLibList = (value: string[]) => {
        this.state.setValue({
            ...this.state.getValue(),
            ssnLibList: value
        });
    }
}