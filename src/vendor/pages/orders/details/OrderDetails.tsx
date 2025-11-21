import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../../components/layout/Navbar';
import OrderInfoCard from '../../../components/orders/details/OrderInfoCard';
import ShippingUpdateCard from '../../../components/orders/details/ShippingUpdateCard';
import ShippingInfoCard from '../../../components/orders/details/ShippingInfoCard';
import UpdateOrderStatusCard from '../../../components/orders/details/UpdateOrderStatusCard';
import PackingListTable from '../../../components/orders/details/PackingListTable';
import classes from './OrderDetails.module.less';
import CustomerInfoSection from '../../../components/orders/details/CustomerInfoCard';
import MessagesCard from '../../../components/orders/details/MessagesCard';
import DeliveryInfoSection from '../../../components/orders/details/DeliveryInfoSection';
import OrderTrackingCard from '../../../components/orders/details/OrderTrackingCard';
import { getMockOrderData, mockPackingListItems, mockCustomerData } from './data';

const { Content } = Layout;
const { Title } = Typography;

const OrderDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Load mock data
    const orderData = getMockOrderData(id);
    const packingListItems = mockPackingListItems;
    const customerData = mockCustomerData;

    const [currentStatus, setCurrentStatus] = useState(orderData.status);

    // Update local state when orderData changes
    useEffect(() => {
        setCurrentStatus(orderData.status);
    }, [orderData.status]);

    const handleShippingUpdate = (newWeight: number, newCost: number) => {
        console.log('Updating:', newWeight, newCost);
        // Here you would typically call your backend API
        setCurrentStatus('Awaiting Shipment Payment');
    };

    const handleEditShipping = () => {
        setCurrentStatus('Update Shipping Cost');
    };

    const handleMarkAsShipped = () => {
        console.log('Marking as shipped');
        setCurrentStatus('Order Shipped');
    };

    const handleMarkAsCollected = () => {
        console.log('Marking as collected');
        setCurrentStatus('Order Collected');
    };

    return (
        <Layout>
            <Navbar />
            <Content className={classes.pageContainer}>
                {/* Header */}
                <div className={classes.header}>
                    <div className={classes.breadcrumb}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#1890ff', marginBottom: '12px', marginTop: '23px' }}>
                            <ArrowLeftOutlined onClick={() => navigate('/vendor/orders')} style={{ cursor: 'pointer' }} />
                            <span>Order Tracking</span>
                            <span>{'>'}</span>
                            <span style={{ fontWeight: 600 }}>Order #{orderData.id}</span>
                        </div>
                    </div>
                    <div className={classes.titleRow}>
                        <Title level={2} style={{ margin: 0 }}>Order details</Title>
                    </div>
                    <Divider style={{ margin: '16px 0', borderColor: '#D2DAE5' }} />
                </div>

                <div className={classes.content}>

                    <OrderInfoCard order={{ ...orderData, status: currentStatus }} />

                    {currentStatus === 'Update Shipping Cost' && (
                        <ShippingUpdateCard
                            initialWeight={4}
                            initialCost={30.00}
                            onUpdate={handleShippingUpdate}
                        />
                    )}

                    {currentStatus === 'Awaiting Shipment Payment' && (
                        <ShippingInfoCard
                            weight={4}
                            shippingCost={30.00}
                            status={currentStatus}
                            onEdit={handleEditShipping}
                        />
                    )}

                    {currentStatus === 'Ready to Ship' && (
                        <UpdateOrderStatusCard
                            onAction={handleMarkAsShipped}
                            buttonText="Mark Order as Shipped"
                            successMessage="Order marked as shipped"
                        />
                    )}

                    {currentStatus === 'Awaiting Collection' && (
                        <UpdateOrderStatusCard
                            onAction={handleMarkAsCollected}
                            buttonText="Mark Order as Collected"
                            successMessage="Order marked as collected"
                        />
                    )}

                    <PackingListTable items={packingListItems} />

                    <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                        <Col xs={24} lg={12}>
                            <CustomerInfoSection data={customerData} />
                        </Col>
                        <Col xs={24} lg={12}>
                            <DeliveryInfoSection data={{
                                deliverTo: orderData.deliveryAddress,
                                contactPerson: orderData.contactPerson,
                                contactMobile: orderData.contactPhone,
                                deliveryNote: orderData.deliveryNote
                            }} />
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                        <Col xs={24} lg={12}>
                            <MessagesCard />
                        </Col>
                        <Col xs={24} lg={12}>
                            <OrderTrackingCard />
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default OrderDetails;