import type { NavigateFunction } from "react-router-dom";
import { StateFlow } from "../../../../utils/StateFlow";
import { type UserProfileState } from "./user-profile-state";
import type { User } from "../../../../services/models/user-management";

export class UserProfileModel {
    public readonly state: StateFlow<UserProfileState> = new StateFlow({
        activeTab: "business",
        user: null,
        isLoading: true,
        isEditing: false,
    } as UserProfileState);

    private navigate?: NavigateFunction;

    constructor(navigate?: NavigateFunction) {
        this.navigate = navigate;
    }

    public loadUser = async (userId: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            isLoading: true
        });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock user data
        const mockUser: User = {
            id: userId,
            date: "Oct 25, 2025, 10:10am",
            vendorCode: "0000567",
            name: "John Doe",
            company: "Gear Turf Technology Pte Ltd",
            uen: "201525201Z",
            email: "johndoe@customer.com",
            mobile: "+65 98765432",
            photo: "",
            companyAddress: {
                addressLine1: "123 Orchard Road",
                addressLine2: "#04-12 Lucky Plaza",
                city: "Singapore",
                state: "Central Singapore",
                postalCode: "876543",
                country: "Singapore"
            },
            deliveryAddresses: [
                {
                    id: "1",
                    name: "Factory 1",
                    addressLine1: "123 Orchard Road",
                    addressLine2: "#04-12 Lucky Plaza",
                    city: "Singapore",
                    state: "Central Singapore",
                    postalCode: "876543",
                    country: "Singapore",
                    contactPerson: "John Doe",
                    contactPhone: "+65 98765432",
                    contactEmail: "johndoe@company.com"
                },
                {
                    id: "2",
                    name: "Factory 2",
                    addressLine1: "123 Orchard Road",
                    addressLine2: "#04-12 Lucky Plaza",
                    city: "Singapore",
                    state: "Central Singapore",
                    postalCode: "876543",
                    country: "Singapore",
                    contactPerson: "John Doe",
                    contactPhone: "+65 98765432",
                    contactEmail: "johndoe@company.com"
                }
            ]
        };

        this.state.setValue({
            ...this.state.getValue(),
            user: mockUser,
            isLoading: false
        });
    }

    public handleTabChange = (tab: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            activeTab: tab
        });
    }

    public handleAddDeliveryAddress = () => {
        // Navigate to add delivery address page or open modal
        console.log("Add delivery address");
    }

    public handleEdit = () => {
        this.state.setValue({
            ...this.state.getValue(),
            isEditing: true
        });
    }

    public handleBack = () => {
        this.navigate?.('/dashboard/user-management/user-list');
    }
}
