import type { NavigateFunction } from "react-router-dom";
import { StateFlow } from "../../../utils/StateFlow";
import { type NewOrderState, type CartItem } from "./new-order-state";
import { v4 as uuidv4 } from 'uuid';

export class NewOrderModel {
    public readonly state: StateFlow<NewOrderState> = new StateFlow<NewOrderState>({
        selectedSSN: null,
        quantity: 1,
        deliveryDestination: null,
        cartItems: [],
        subTotal: 0,
        transactionFee: 0,
        totalCost: 0,
    });

    private navigate?: NavigateFunction;

    constructor(navigate?: NavigateFunction) {
        this.navigate = navigate;
    }

    public handleSSNSelect = (ssn: string | null) => {
        this.state.setValue({
            ...this.state.getValue(),
            selectedSSN: ssn
        });
    }

    public handleQuantityChange = (quantity: number) => {
        this.state.setValue({
            ...this.state.getValue(),
            quantity: quantity > 0 ? quantity : 1
        });
    }

    public handleDeliveryDestinationSelect = (destination: string | null) => {
        this.state.setValue({
            ...this.state.getValue(),
            deliveryDestination: destination
        });
    }

    public handleAddToCart = () => {
        const currentState = this.state.getValue();

        if (!currentState.selectedSSN || !currentState.deliveryDestination) {
            return;
        }

        const newCartItem: CartItem = {
            id: uuidv4(),
            ssn: currentState.selectedSSN,
            quantity: currentState.quantity,
            deliveryDestination: currentState.deliveryDestination,
        };

        const updatedCartItems = [...currentState.cartItems, newCartItem];
        const newSubTotal = this.calculateSubTotal(updatedCartItems);
        const newTransactionFee = this.calculateTransactionFee(newSubTotal);
        const newTotalCost = newSubTotal + newTransactionFee;

        this.state.setValue({
            ...currentState,
            cartItems: updatedCartItems,
            subTotal: newSubTotal,
            transactionFee: newTransactionFee,
            totalCost: newTotalCost,
            // Reset form
            selectedSSN: null,
            quantity: 1,
            deliveryDestination: null,
        });
    }

    public handleRemoveFromCart = (itemId: string) => {
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
            totalCost: newTotalCost,
        });
    }

    public handleAddHandheldScanner = () => {
        // TODO: Implement handheld scanner addition logic
        console.log('Add handheld scanner to cart');
    }

    public handleCheckout = () => {
        const currentState = this.state.getValue();

        if (currentState.cartItems.length === 0) {
            return;
        }

        // TODO: Implement checkout API call
        console.log('Proceeding to checkout with items:', currentState.cartItems);
        console.log('Total cost:', currentState.totalCost);

        // Navigate to order tracking or confirmation page
        // this.navigate?.('/dashboard/order-tracking');
    }

    private calculateSubTotal(cartItems: CartItem[]): number {
        // Placeholder calculation - $0 per item for now
        // In real implementation, you'd fetch prices from SSN data
        return cartItems.reduce((total, item) => total + (item.quantity * 0), 0);
    }

    private calculateTransactionFee(subTotal: number): number {
        // Placeholder - same as subtotal for now
        return subTotal;
    }

    public handleNavigateToSSNLibrary = () => {
        this.navigate?.('/dashboard/ssn-lib');
    }
}
