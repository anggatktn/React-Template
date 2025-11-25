export interface CartItem {
    id: string;
    ssn: string;
    productType: string; // e.g., "Normal RFID Tag"
    quantity: number;
    deliveryDestination: string;
    description?: string;
    size?: string;
    tagsPrice: number;
    gst: number;
    subtotal: number;
}

export interface NewOrderState {
    selectedSSN: string | null;
    quantity: number;
    deliveryDestination: string | null;
    cartItems: CartItem[];
    subTotal: number;
    transactionFee: number;
    totalCost: number;
    isAddAddressModalOpen: boolean;
}
