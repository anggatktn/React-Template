import type { NavigateFunction } from "react-router-dom";
import { StateFlow } from "../../../../utils/StateFlow";
import { type UserListState } from "./user-list-state";

export class UserListModel {
    public readonly state: StateFlow<UserListState> = new StateFlow({
        sortBy: "Recent",
        searchValue: "",
        userList: [
            {
                id: "1",
                date: "Oct 25, 2025, 10:10am",
                vendorCode: "0000567",
                name: "John Doe",
                company: "ST Logistics",
                uen: "201136580N",
                email: "johndoe@gmail.com",
                mobile: "+65 9876 5432",
                photo: "",
                companyAddress: {
                    addressLine1: "123 Orchard Road",
                    addressLine2: "#04-12 Lucky Plaza",
                    city: "Singapore",
                    state: "Central Singapore",
                    postalCode: "876543",
                    country: "Singapore"
                },
                deliveryAddresses: []
            },
            {
                id: "2",
                date: "Oct 25, 2025, 10:10am",
                vendorCode: "0000567",
                name: "Maren Workman",
                company: "ST Logistics",
                uen: "201136580N",
                email: "johndoe@gmail.com",
                mobile: "+65 9876 5432",
                companyAddress: {
                    addressLine1: "123 Orchard Road",
                    addressLine2: "#04-12 Lucky Plaza",
                    city: "Singapore",
                    state: "Central Singapore",
                    postalCode: "876543",
                    country: "Singapore"
                },
                deliveryAddresses: []
            },
            {
                id: "3",
                date: "Oct 25, 2025, 10:10am",
                vendorCode: "0000567",
                name: "Jaylon Bator",
                company: "ST Logistics",
                uen: "201136580N",
                email: "johndoe@gmail.com",
                mobile: "+65 9876 5432",
                companyAddress: {
                    addressLine1: "123 Orchard Road",
                    addressLine2: "#04-12 Lucky Plaza",
                    city: "Singapore",
                    state: "Central Singapore",
                    postalCode: "876543",
                    country: "Singapore"
                },
                deliveryAddresses: []
            },
            {
                id: "4",
                date: "Oct 25, 2025, 10:10am",
                vendorCode: "0000567",
                name: "Gretchen Baptista",
                company: "ST Logistics",
                uen: "201136580N",
                email: "johndoe@gmail.com",
                mobile: "+65 9876 5432",
                companyAddress: {
                    addressLine1: "123 Orchard Road",
                    addressLine2: "#04-12 Lucky Plaza",
                    city: "Singapore",
                    state: "Central Singapore",
                    postalCode: "876543",
                    country: "Singapore"
                },
                deliveryAddresses: []
            },
            {
                id: "5",
                date: "Oct 25, 2025, 10:10am",
                vendorCode: "0000567",
                name: "Maren Culhane",
                company: "ST Logistics",
                uen: "201136580N",
                email: "johndoe@gmail.com",
                mobile: "+65 9876 5432",
                companyAddress: {
                    addressLine1: "123 Orchard Road",
                    addressLine2: "#04-12 Lucky Plaza",
                    city: "Singapore",
                    state: "Central Singapore",
                    postalCode: "876543",
                    country: "Singapore"
                },
                deliveryAddresses: []
            },
            {
                id: "6",
                date: "Oct 25, 2025, 10:10am",
                vendorCode: "0000567",
                name: "Miracle Stanton",
                company: "ST Logistics",
                uen: "201136580N",
                email: "johndoe@gmail.com",
                mobile: "+65 9876 5432",
                companyAddress: {
                    addressLine1: "123 Orchard Road",
                    addressLine2: "#04-12 Lucky Plaza",
                    city: "Singapore",
                    state: "Central Singapore",
                    postalCode: "876543",
                    country: "Singapore"
                },
                deliveryAddresses: []
            },
            {
                id: "7",
                date: "Oct 25, 2025, 10:10am",
                vendorCode: "0000567",
                name: "Justin Lubin",
                company: "ST Logistics",
                uen: "201136580N",
                email: "johndoe@gmail.com",
                mobile: "+65 9876 5432",
                companyAddress: {
                    addressLine1: "123 Orchard Road",
                    addressLine2: "#04-12 Lucky Plaza",
                    city: "Singapore",
                    state: "Central Singapore",
                    postalCode: "876543",
                    country: "Singapore"
                },
                deliveryAddresses: []
            }
        ],
    } as UserListState);

    private navigate?: NavigateFunction;

    constructor(navigate?: NavigateFunction) {
        this.navigate = navigate;
    }

    public handleSortChange = (value: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            sortBy: value
        });
    }

    public handleAddUser = () => {
        this.navigate?.('/dashboard/user-management/add-user');
    }

    public handleViewEdit = (userId: string) => {
        this.navigate?.(`/dashboard/user-management/view-edit-user/${userId}`);
    }

    public handleSearch = (value: string) => {
        this.state.setValue({
            ...this.state.getValue(),
            searchValue: value
        });
    }
}
