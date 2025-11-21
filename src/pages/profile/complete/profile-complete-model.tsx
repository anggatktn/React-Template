import type { ProfileCompleteForms, ProfileCompleteState } from "./profile-complete-state";
import { StateFlow } from "../../../utils/StateFlow";

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
            country: undefined,
            deliveryContactPerson: "",
            deliveryContactPhone: "",
        }
    } as ProfileCompleteState);

    public readonly countries: Record<string, string> = {
        "Singapore": "Singapore",
        "Malaysia": "Malaysia",
        "Indonesia": "Indonesia",
        "Brunei": "Brunei",
        "Thailand": "Thailand",
        "Vietnam": "Vietnam",
        "Myanmar": "Myanmar",
        "Philippines": "Philippines",
        "Laos": "Laos",
        "Cambodia": "Cambodia",
    };

    public onCompleteSignUpPressed = (values: ProfileCompleteForms) => {
        console.log(values)
        this.state.setValue({
            ...this.state.getValue(),
            formValues: values
        });
    }
}