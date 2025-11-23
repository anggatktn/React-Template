import MenuLayout, { TopBarMenu } from "../../../components/layout/menu-layout";
import React, { useMemo } from 'react';
import { Typography, Row, Col, Card, Divider } from 'antd';
import { NewOrderModel } from "./new-order-model";
import { useStateFlow } from "../../../utils/StateFlow";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../../components/dashboard/page-breadcrumb";
import OrderFormInputs from "../../../components/dashboard/new-order/order-form-inputs";
import CartItemsList from "../../../components/dashboard/new-order/cart-items-list";
import OrderSummaryCard from "../../../components/dashboard/new-order/order-summary-card";
import AddDeliveryAddressModal from "../../../components/dashboard/new-order/add-delivery-address-modal";

const { Title } = Typography;

// Mock SSN options - replace with actual data from API/service
const ssnOptions = [
    { value: 'SSN-001', label: 'SSN-001' },
    { value: 'SSN-002', label: 'SSN-002' },
    { value: 'SSN-003', label: 'SSN-003' },
];

// Mock delivery destinations - replace with actual data
const deliveryDestinations = [
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Malaysia', label: 'Malaysia' },
    { value: 'Indonesia', label: 'Indonesia' },
    { value: 'Thailand', label: 'Thailand' },
];

const NewOrderPage: React.FC = () => {
    const navigate = useNavigate();
    const model = useMemo(() => new NewOrderModel(navigate), [navigate]);
    const state = useStateFlow(model.state);

    const canAddToCart = state.selectedSSN && state.deliveryDestination && state.quantity > 0;

    return <MenuLayout selectedMenu={TopBarMenu.NewOrder}>
        <div style={{
            width: "100%",
            minHeight: '100vh',
            padding: "0px 10px 100px 10px",
            backgroundColor: '#f5f5f5',
        }}>
            {/* Header */}
            <Title level={2} style={{ margin: '0 0 24px 0', fontWeight: 600 }}>
                New Order
            </Title>
            <Divider style={{ backgroundColor: '#D2DAE5', margin: '0 0 24px 0' }} />
            {/* Add SSNs to cart section */}
            <Title level={5} style={{
                marginTop: 0,
            }}>
                Add SSNs to cart
            </Title>
            <Row gutter={24}>
                {/* Left Column - Cart Items */}
                <Col xs={24} lg={16} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    <OrderFormInputs
                        selectedSSN={state.selectedSSN}
                        quantity={state.quantity}
                        deliveryDestination={state.deliveryDestination}
                        itemsCount={state.cartItems.length}
                        canAddToCart={!!canAddToCart}
                        ssnOptions={ssnOptions}
                        deliveryDestinations={deliveryDestinations}
                        onSSNSelect={model.handleSSNSelect}
                        onQuantityChange={model.handleQuantityChange}
                        onDeliveryDestinationSelect={model.handleDeliveryDestinationSelect}
                        onAddToCart={model.handleAddToCart}
                        onAddHandheldScanner={model.handleAddHandheldScanner}
                        onAddDeliveryAddress={model.handleOpenAddAddressModal}
                    />
                    <CartItemsList
                        cartItems={state.cartItems}
                        onRemoveItem={model.handleRemoveFromCart}
                    />
                </Col>

                {/* Right Column - Order Summary */}
                <Col xs={24} lg={8}>
                    <OrderSummaryCard
                        subTotal={state.subTotal}
                        transactionFee={state.transactionFee}
                        totalCost={state.totalCost}
                        hasItems={state.cartItems.length > 0}
                        onCheckout={model.handleCheckout}
                    />
                </Col>
            </Row>

            {/* Add Delivery Address Modal */}
            <AddDeliveryAddressModal
                open={state.isAddAddressModalOpen}
                onCancel={model.handleCloseAddAddressModal}
                onSubmit={model.handleSubmitDeliveryAddress}
            />
        </div>
    </MenuLayout>
}

export default NewOrderPage;
