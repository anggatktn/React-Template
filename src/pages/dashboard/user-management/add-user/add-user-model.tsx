import type { NavigateFunction } from "react-router-dom";
import { StateFlow } from "../../../../utils/StateFlow";
import { type AddUserState } from "./add-user-state";

export class AddUserModel {
    public readonly state: StateFlow<AddUserState> = new StateFlow({
        vendorCode: "",
        customerName: "",
        companyName: "",
        companyUEN: "",
        companyEmail: "",
        customerMobile: "",
        photo: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isSubmitting: false,
    } as AddUserState);

    private navigate?: NavigateFunction;

    constructor(navigate?: NavigateFunction) {
        this.navigate = navigate;
    }

    public updateField = (field: string, value: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            [field]: value
        });
    }

    public updatePhoto = (photoUrl: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            photo: photoUrl
        });
    }

    public handleSubmit = async () => {
        this.state.setValue({
            ...this.state.getValue(),
            isSubmitting: true
        });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Navigate back to user list
        this.navigate?.('/dashboard/user-management');
    }

    public handleCancel = () => {
        this.navigate?.('/dashboard/user-management');
    }
}
