import type { NavigateFunction } from "react-router-dom";
import { StateFlow } from "../../../../utils/StateFlow";
import { type AddSSNState, type AddedSSNRecord } from "./new-ssn-state";
import { v4 as uuidv4 } from 'uuid';
import { BaseModel } from "../../../../utils/base/BaseModel";
import { ssnService, type NewSSNRequestBody } from "../../../../services/ssn-service";

export class AddSSNModel extends BaseModel<AddSSNState> {

    private navigate?: NavigateFunction;

    constructor(navigate?: NavigateFunction) {
        super({
            selectedRFIDType: null,
            selectedLayout: 'standard',
            ssnValue: '',
            description: '',
            size: '',
            addedSSNs: [],
        });
        this.navigate = navigate;
    }

    public handleRFIDTypeSelect = (type: 'normal' | 'floating' | 'metallic') => {
        this.state.setValue({
            ...this.state.getValue(),
            selectedRFIDType: type
        });
    }

    public handleLayoutChange = (layout: 'standard' | 'large-font') => {
        this.state.setValue({
            ...this.state.getValue(),
            selectedLayout: layout
        });
    }

    public handleSSNChange = (value: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            ssnValue: value
        });
    }

    public handleDescriptionChange = (value: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            description: value
        });
    }

    public handleSizeChange = (value: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            size: value
        });
    }

    private getProductName(type: 'normal' | 'floating' | 'metallic' | null): string {
        switch (type) {
            case 'normal': return 'Normal';
            case 'floating': return 'Floating';
            case 'metallic': return 'Metallic';
            default: return '';
        }
    }

    private getLayoutName(layout: 'standard' | 'large-font'): string {
        return layout === 'standard' ? 'Standard' : 'Large Layout';
    }

    private formatDateTime(): string {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return now.toLocaleString('en-US', options).replace(',', '');
    }

    public addNewSSN = () => {
        const currentState = this.state.getValue();
        const newSSN: NewSSNRequestBody = {
            type: this.getProductName(currentState.selectedRFIDType),
            layout_style: this.getLayoutName(currentState.selectedLayout),
            ssn: currentState.ssnValue,
            description: currentState.description,
            size: currentState.size
        };
        ssnService.createNewSSN(newSSN).then((response) => {
            console.log(response);
        });
    }

    public handleAddToLibrary = () => {
        const currentState = this.state.getValue();

        // Create new SSN record
        const newRecord: AddedSSNRecord = {
            addedOn: this.formatDateTime(),
            barcode: `barcode_${currentState.ssnValue}`, // Placeholder for barcode image
            ssn: currentState.ssnValue,
            product: this.getProductName(currentState.selectedRFIDType),
            style: this.getLayoutName(currentState.selectedLayout),
            description: currentState.description || '-',
            size: currentState.size || '-',
            id: uuidv4(),
        };

        // Add to the list
        this.state.setValue({
            ...currentState,
            addedSSNs: [newRecord, ...currentState.addedSSNs],
            // Reset form fields
            ssnValue: '',
            description: '',
            size: '',
        });

        // TODO: Implement API call to save to backend
        console.log('Adding SSN to library:', newRecord);
    }

    public handleBack = () => {
        this.navigate?.('/dashboard/ssn-lib');
    }
}
