
export interface ProfileCompleteState {
    readonly formValues: ProfileCompleteForms;
}


export interface ProfileCompleteForms {
    vendorCode: string;
    customerName: string;
    companyName: string;
    companyUen: string;
    companyEmail: string;
    customerMobile: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateRegion: string;
    postalCode: string;
    country?: string;
    deliveryContactPerson: string;
    deliveryContactPhone: string;
}