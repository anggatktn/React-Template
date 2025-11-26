import type { CartItem } from "../landing/new-order-state";

export interface CheckoutState {
    cartItems: CartItem[];
    subTotal: number;
    transactionFee: number;
    totalCost: number;
    shippingMethod: 'doorstep' | 'self-collection';
}
