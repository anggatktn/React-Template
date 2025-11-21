import type { ProfileCompleteState } from "./profile-complete-state";
import { StateFlow } from "../../utils/StateFlow";
import type { ProfileCompleteForms } from ".";

export class ProfileCompleteModel {
    public readonly state: StateFlow<ProfileCompleteState> = new StateFlow({
        formValues: {
            vendorCode: "",
            customerName: "",
            companyName: "",
            companyUen: "",
            companyEmail: "",
            customerMobile: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            stateRegion: "",
            postalCode: "",
            country: "",
            deliveryContactPerson: "",
            deliveryContactPhone: "",
        }
    });

    onCompleteSignUpPressed(values: ProfileCompleteForms) {
        this.state.setValue({
            ...this.state.getValue(),
            formValues: values
        });
    }
}