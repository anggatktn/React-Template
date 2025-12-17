import React, { useMemo } from 'react';
import MenuLayout from "../../../../components/layout/top-bar-menu/MenuLayout";
import { Typography, Card, Breadcrumb, Divider } from 'antd';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckoutModel } from './checkout-model';
import { useStateFlow } from "../../../../utils/StateFlow";
import CheckoutCartList from "../../../../components/dashboard/new-order/checkout-cart-list";
import ShippingMethodSelector from "../../../../components/dashboard/new-order/shipping-method-selector";
import PaymentSummaryCard from "../../../../components/dashboard/new-order/checkout-payment-summary";
import PageBreadcrumb from '../../../../components/dashboard/page-breadcrumb';
import { CustomerMenu } from '../../../../components/layout/top-bar-menu/customer-menu';

const { Title, Text } = Typography;

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const model = useMemo(() => new CheckoutModel(navigate, location), [navigate, location]);
    const state = useStateFlow(model.state);

    return (
        <MenuLayout selectedMenu={CustomerMenu.NewOrder}>
            <div style={{
                width: "100%",
                minHeight: '100vh',
                padding: "0px 10px 100px 10px",
                backgroundColor: '#f5f5f5',
            }}>
                {/* Breadcrumb */}
                <div style={{ marginBottom: 24 }}>
                    <PageBreadcrumb
                        items={[
                            {
                                label: 'New Order',
                                onClick: () => navigate('/dashboard/new-order'),
                            },
                            {
                                label: 'Check Out',
                                isActive: true,
                            },
                        ]}
                    />
                </div>

                <Title level={2} style={{ margin: '0 0 24px 0', fontWeight: 600 }}>
                    Check Out
                </Title>
                <Divider style={{ margin: '0 0 24px 0', backgroundColor: '#D2DAE5' }} />
                {/* Summary Section */}
                <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <Title level={4} style={{ margin: 0 }}>Summary</Title>
                        <Text type="secondary">Items added {state.cartItems.length}</Text>
                    </div>

                    <CheckoutCartList
                        cartItems={state.cartItems}
                        onRemoveItem={model.handleRemoveItem}
                    />
                </div>

                {/* Shipping Method */}
                <div style={{ marginBottom: 32 }}>
                    <Title level={4}>Select shipping method</Title>
                    <ShippingMethodSelector
                        value={state.shippingMethod}
                        onChange={model.handleShippingMethodChange}
                    />
                    <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: 12, fontStyle: 'italic' }}>
                            Shipping fee to be calculated by vendor and paid later by customer.
                        </Text>
                    </div>
                </div>

                {/* Payment Section */}
                <div style={{ width: 'max-content' }}>
                    <Title level={4}>Payment</Title>
                    <PaymentSummaryCard
                        subTotal={state.subTotal}
                        transactionFee={state.transactionFee}
                        totalCost={state.totalCost}
                        onProceed={model.handleProceedToPayment}
                    />
                    <div style={{ marginTop: 16 }}>
                        <Card size="small" style={{ backgroundColor: '#EEEAD8', borderColor: '#ffe4b5' }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 600
                            }}>
                                Orders cannot be cancelled, no refund will be given once ordered.
                            </Text>
                        </Card>
                    </div>
                </div>
            </div>
        </MenuLayout>
    );
}

export default CheckoutPage;
