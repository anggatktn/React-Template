import type { NavigateFunction } from "react-router-dom";
import { StateFlow } from "../../../../utils/StateFlow";
import { type SSNLibState } from "./ssn-lib-state";
import { BaseModel } from "../../../../utils/base/BaseModel";
import { ssnService } from "../../../../services/ssn-service";

export class SSNLibModel extends BaseModel<SSNLibState> {

    private navigate?: NavigateFunction;

    constructor(navigate?: NavigateFunction) {
        super({
            sortBy: "S/N",
            searchValue: "",
            ssnLibList: [],
        });
        this.navigate = navigate;
        this.getSSNList();
    }

    public handleSortChange = (value: string) => {
        this.updateState((state) => {
            return {
                ...state,
                sortBy: value
            }
        })
    }

    public handleAddSSN = () => {
        this.navigate?.('/dashboard/ssn-lib/new');
    }

    public handleSearch = (value: string) => {
        this.updateState((state) => {
            return {
                ...state,
                searchValue: value
            }
        })
    }

    public getSSNList = () => {
        ssnService.getSSNList().then((res) => {
            this.updateState((state) => {
                return {
                    ...state,
                    ssnLibList: res.data
                }
            })
        })
    }
}