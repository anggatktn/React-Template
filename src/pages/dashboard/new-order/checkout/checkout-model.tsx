import { StateFlow } from "../../../../utils/StateFlow";
import type { CheckoutState } from "./checkout-state";
import type { CartItem } from "../landing/new-order-state";
import type { NavigateFunction, Location } from "react-router-dom";

export class CheckoutModel {
    public readonly state: StateFlow<CheckoutState>;
    private navigate: NavigateFunction;

    constructor(navigate: NavigateFunction, location: Location) {
        this.navigate = navigate;

        const initialState = location.state as {
            cartItems: CartItem[];
            subTotal: number;
            transactionFee: number;
            totalCost: number;
        } | null;

        this.state = new StateFlow<CheckoutState>({
            cartItems: initialState?.cartItems || [],
            subTotal: initialState?.subTotal || 0,
            transactionFee: initialState?.transactionFee || 0,
            totalCost: initialState?.totalCost || 0,
            shippingMethod: 'doorstep'
        });
    }

    public handleRemoveItem = (itemId: string) => {
        const currentState = this.state.getValue();
        const updatedCartItems = currentState.cartItems.filter(item => item.id !== itemId);

        const newSubTotal = this.calculateSubTotal(updatedCartItems);
        const newTransactionFee = this.calculateTransactionFee(newSubTotal);
        const newTotalCost = newSubTotal + newTransactionFee;

        this.state.setValue({
            ...currentState,
            cartItems: updatedCartItems,
            subTotal: newSubTotal,
            transactionFee: newTransactionFee,
            totalCost: newTotalCost
        });
    }

    public handleShippingMethodChange = (method: 'doorstep' | 'self-collection') => {
        this.state.setValue({
            ...this.state.getValue(),
            shippingMethod: method
        });
    }

    public handleProceedToPayment = () => {
        const currentState = this.state.getValue();
        console.log('Proceeding to payment with:', currentState);
        // TODO: Implement actual payment flow
        alert('Proceeding to payment...');
    }

    private calculateSubTotal(cartItems: CartItem[]): number {
        return cartItems.reduce((total, item) => total + item.subtotal, 0);
    }

    private calculateTransactionFee(subTotal: number): number {
        // Placeholder logic matching new-order-model
        return subTotal > 0 ? 30 : 0; // Fixed fee for example, or percentage
    }
}
