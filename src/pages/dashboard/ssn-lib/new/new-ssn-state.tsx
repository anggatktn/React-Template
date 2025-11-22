export interface AddedSSNRecord {
    addedOn: string;
    barcode: string;
    ssn: string;
    product: string;
    style: string;
    description: string;
    size: string;
    id: string;
}

export interface AddSSNState {
    selectedRFIDType: 'normal' | 'floating' | 'metallic' | null;
    selectedLayout: 'standard' | 'large-font';
    ssnValue: string;
    description: string;
    size: string;
    addedSSNs: AddedSSNRecord[];
}
