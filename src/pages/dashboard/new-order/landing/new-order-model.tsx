import type { NavigateFunction } from "react-router-dom";
import { StateFlow } from "../../../../utils/StateFlow";
import { type NewOrderState, type CartItem } from "./new-order-state";
import { v4 as uuidv4 } from 'uuid';
import type { DeliveryAddressFormValues } from "../../../../components/dashboard/new-order/add-delivery-address-modal";

export class NewOrderModel {
    public readonly state: StateFlow<NewOrderState> = new StateFlow<NewOrderState>({
        selectedSSN: null,
        quantity: 1,
        deliveryDestination: null,
        cartItems: [{
            id: uuidv4(),
            ssn: '123456789',
            productType: 'Normal RFID Tag',
            quantity: 1,
            deliveryDestination: '123 Main St',
            description: 'Normal RFID Tag',
            size: '123 Main St',
            tagsPrice: 12,
            gst: 1,
            subtotal: 13,
        }],
        subTotal: 13,
        transactionFee: 13,
        totalCost: 26,
        isAddAddressModalOpen: false,
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

        // Mock pricing - replace with actual pricing from SSN data
        const pricePerTag = 0.12; // S$0.12 per tag
        const tagsPrice = currentState.quantity * pricePerTag;
        const gst = tagsPrice * 0.09; // 9% GST
        const subtotal = tagsPrice + gst;

        const newCartItem: CartItem = {
            id: uuidv4(),
            ssn: currentState.selectedSSN,
            productType: 'Normal RFID Tag', // TODO: Get from selected SSN data
            quantity: currentState.quantity,
            deliveryDestination: currentState.deliveryDestination,
            description: '', // TODO: Get from form or SSN data
            size: '', // TODO: Get from form or SSN data
            tagsPrice: tagsPrice,
            gst: gst,
            subtotal: subtotal,
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

        // Navigate to checkout page with state
        this.navigate?.('/dashboard/new-order/checkout', {
            state: {
                cartItems: currentState.cartItems,
                subTotal: currentState.subTotal,
                transactionFee: currentState.transactionFee,
                totalCost: currentState.totalCost
            }
        });
    }

    private calculateSubTotal(cartItems: CartItem[]): number {
        return cartItems.reduce((total, item) => total + item.subtotal, 0);
    }

    private calculateTransactionFee(subTotal: number): number {
        // Placeholder - same as subtotal for now
        return subTotal;
    }

    public handleNavigateToSSNLibrary = () => {
        this.navigate?.('/dashboard/ssn-lib');
    }

    public handleEditCartItem = (itemId: string) => {
        // TODO: Implement edit functionality
        // This could open a modal or populate the form with the item's data
        console.log('Editing cart item:', itemId);

        // Example implementation:
        // const item = this.state.getValue().cartItems.find(i => i.id === itemId);
        // if (item) {
        //     this.state.setValue({
        //         ...this.state.getValue(),
        //         selectedSSN: item.ssn,
        //         quantity: item.quantity,
        //         deliveryDestination: item.deliveryDestination,
        //     });
        //     // Remove the item from cart
        //     this.handleRemoveFromCart(itemId);
        // }
    }

    public handleOpenAddAddressModal = () => {
        this.state.setValue({
            ...this.state.getValue(),
            isAddAddressModalOpen: true
        });
    }

    public handleCloseAddAddressModal = () => {
        this.state.setValue({
            ...this.state.getValue(),
            isAddAddressModalOpen: false
        });
    }

    public handleSubmitDeliveryAddress = (values: DeliveryAddressFormValues) => {
        // TODO: Implement API call to save delivery address
        console.log('Submitting delivery address:', values);

        // For now, just add it to the delivery destinations list
        // In real implementation, you'd save to backend and refresh the list

        // Close the modal
        this.handleCloseAddAddressModal();

        // Optionally, you could set the newly added address as selected
        // this.handleDeliveryDestinationSelect(values.addressLine1);
    }
}
