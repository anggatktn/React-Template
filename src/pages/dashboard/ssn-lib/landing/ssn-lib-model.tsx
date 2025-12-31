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
            editModalVisible: false,
            editingItem: null,
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

    public openEditModal = (item: any) => {
        this.updateState((state) => ({
            ...state,
            editModalVisible: true,
            editingItem: item
        }));
    }

    public closeEditModal = () => {
        this.updateState((state) => ({
            ...state,
            editModalVisible: false,
            editingItem: null
        }));
    }

    public handleSaveSsn = (item: any) => {
        // TODO: Implement actual save logic here (API call)
        console.log("Saving SSN:", item);
        this.closeEditModal();
        // Ideally, refresh the list or update the local list item
        this.getSSNList();
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