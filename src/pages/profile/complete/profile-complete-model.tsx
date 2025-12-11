import type { ProfileCompleteForms, ProfileCompleteState } from "./profile-complete-state";
import { StateFlow } from "../../../utils/StateFlow";
import { BaseModel } from "../../../utils/base/BaseModel";
import type { NavigateFunction } from "react-router-dom";
import type { BaseService } from "../../../utils/base/BaseService";
import { authService } from "../../../services/auth-service";

export class ProfileCompleteModel extends BaseModel<ProfileCompleteState> {

    private navigate?: NavigateFunction;

    protected get registeredServices(): BaseService[] {
        return [authService];
    }

    protected onLoadingStateChanged(isLoading: boolean): void {
        this.updateState(state => ({
            ...state,
            isLoading
        }));
    }

    constructor(navigate: NavigateFunction) {
        super({
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
        this.navigate = navigate;
    }

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

    public onCompleteSignUpPressed = (values: ProfileCompleteForms) => async () => {
        console.log(values)
        this.state.setValue({
            ...this.state.getValue(),
            formValues: values
        });

        await authService.updateUserProfile({
            vendorCode: values.vendorCode,
            customerName: values.customerName,
            companyName: values.companyName,
            companyUen: values.companyUen,
            companyEmail: values.companyEmail,
            customerMobile: values.customerMobile,
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2,
            city: values.city,
            postalCode: values.postalCode,
            country: values.country || "",
            state: ""
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }
}