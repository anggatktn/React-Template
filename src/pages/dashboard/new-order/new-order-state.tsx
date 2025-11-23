export interface CartItem {
    id: string;
    ssn: string;
    quantity: number;
    deliveryDestination: string;
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
