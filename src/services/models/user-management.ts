export interface User {
    id: string;
    date: string;
    vendorCode: string;
    name: string;
    company: string;
    uen: string;
    email: string;
    mobile: string;
    photo?: string;
    companyAddress: CompanyAddress;
    deliveryAddresses: DeliveryAddress[];
}

export interface CompanyAddress {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface DeliveryAddress {
    id: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    contactPerson: string;
    contactPhone: string;
    contactEmail: string;
}

export interface UserFormData {
    vendorCode: string;
    customerName: string;
    companyName: string;
    companyUEN: string;
    companyEmail: string;
    customerMobile: string;
    photo?: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
