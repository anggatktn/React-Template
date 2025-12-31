import type { SsnListResponse } from "../../../../services/ssn-service";

export interface SSNLibState {
    sortBy: string;
    searchValue: string;
    ssnLibList: SsnListResponse[];
    editModalVisible: boolean;
    editingItem: SsnListResponse | null;
}   