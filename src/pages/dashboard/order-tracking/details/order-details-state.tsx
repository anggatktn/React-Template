export interface OrderDetailsState {
    orderId: string;
    orderDate: string;
    itemsCount: number;
    amountPaid: string;
    shipmentPaid: string;
    status: string;
    deliverTo: string;
    contactPerson: string;
    contactNumber: string;
    contactEmail: string;
    deliveryNote: string;

    // Shipment Confirmation
    logisticsProvider: string;
    weight: string;
    shippingCost: string;
    dutiesAndTaxes: string;
    totalCost: string;
    collectionAddress: string;

    // Customer Info
    vendorCode: string;
    customerName: string;
    companyName: string;
    companyUEN: string;
    companyEmail: string;
    customerMobile: string;
    companyAddress: string;

    // Items
    items: Array<{
        id: string;
        name: string;
        ssn: string;
        description: string;
        size: string;
        quantity: number;
        deliverTo: string;
        subtotal: string;
        type: 'Metallic RFID Tag' | 'Normal';
        barcode?: string;
    }>;

    // Timeline
    timeline: Array<{
        date: string;
        status: string;
        description?: string;
    }>;
}

export const initialOrderDetailsState: OrderDetailsState = {
    orderId: '',
    orderDate: '',
    itemsCount: 0,
    amountPaid: '',
    shipmentPaid: '-',
    status: '',
    deliverTo: '',
    contactPerson: '',
    contactNumber: '',
    contactEmail: '',
    deliveryNote: '',

    logisticsProvider: '',
    weight: '',
    shippingCost: '',
    dutiesAndTaxes: '',
    totalCost: '',
    collectionAddress: '',

    vendorCode: '',
    customerName: '',
    companyName: '',
    companyUEN: '',
    companyEmail: '',
    customerMobile: '',
    companyAddress: '',

    items: [],
    timeline: []
};
