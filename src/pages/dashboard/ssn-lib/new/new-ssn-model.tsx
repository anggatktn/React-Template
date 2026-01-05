import type { NavigateFunction } from "react-router-dom";
import { StateFlow } from "../../../../utils/StateFlow";
import { type AddSSNState, type AddedSSNRecord } from "./new-ssn-state";
import { v4 as uuidv4 } from 'uuid';
import { BaseModel } from "../../../../utils/base/BaseModel";
import { ssnService, type NewSSNRequestBody } from "../../../../services/ssn-service";
import type { BaseService } from "../../../../utils/base/BaseService";

export class AddSSNModel extends BaseModel<AddSSNState> {

    private navigate?: NavigateFunction;

    constructor(navigate?: NavigateFunction) {
        super({
            selectedRFIDType: null,
            selectedLayout: 'standard',
            ssnValue: '',
            description: '',
            size: '',
            isLoading: false,
            addedSSNs: [],
        });
        this.navigate = navigate;
    }

    protected get registeredServices(): BaseService[] {
        return [ssnService];
    }

    protected onLoadingStateChanged(isLoading: boolean): void {
        this.updateState(state => ({
            ...state,
            isLoading: isLoading
        }));
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
            const newRecord: AddedSSNRecord = {
                addedOn: this.formatDateTime(),
                barcode: `barcode_${currentState.ssnValue}`,
                ssn: currentState.ssnValue,
                product: this.getProductName(currentState.selectedRFIDType),
                style: this.getLayoutName(currentState.selectedLayout),
                description: currentState.description || '-',
                size: currentState.size || '-',
                id: response.data.id,
            };

            this.updateState((state) => ({
                ...state,
                addedSSNs: [newRecord, ...state.addedSSNs],
                ssnValue: '',
                description: '',
                size: '',
                selectedRFIDType: null,
                selectedLayout: 'standard',
            }));
        });
    }

    public handleBack = () => {
        this.navigate?.('/dashboard/ssn-lib');
    }
}
