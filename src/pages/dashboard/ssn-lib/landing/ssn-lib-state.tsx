import type { SSNItemResponse } from "../../../../services/ssn-service";

export interface SSNLibState {
    sortBy: string;
    searchValue: string;
    ssnLibList: SSNItemResponse[];
    editModalVisible: boolean;
    editingItem: SSNItemResponse | null;
}   