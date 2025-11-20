import React from 'react';
import { Layout, Typography, Button, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../../components/layout/Navbar';
import OrderInfoCard from '../../../components/orders/details/OrderInfoCard';
import ShippingUpdateCard from '../../../components/orders/details/ShippingUpdateCard';
import PackingListTable from '../../../components/orders/details/PackingListTable';
import classes from './OrderDetails.module.less';
import CustomerInfoSection from '../../../components/orders/details/CustomerInfoCard';
import MessagesCard from '../../../components/orders/details/MessagesCard';
import DeliveryInfoSection from '../../../components/orders/details/DeliveryInfoSection';
import OrderTrackingCard from '../../../components/orders/details/OrderTrackingCard';
import { getMockOrderData, mockPackingListItems, mockCustomerData, mockDeliveryData } from './data';

const { Content } = Layout;
const { Title } = Typography;

const OrderDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Load mock data
    const orderData = getMockOrderData(id);
    const packingListItems = mockPackingListItems;
    const customerData = mockCustomerData;
    const deliveryData = mockDeliveryData;

    const handleShippingUpdate = (newWeight: number, newCost: number) => {
        console.log('Updating:', newWeight, newCost);
        // Here you would typically call your backend API
    };

    return (
        <Layout>
            <Navbar />
            <Content className={classes.pageContainer}>
                {/* Header */}
                <div className={classes.header}>
                    <div className={classes.breadcrumb}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#1890ff', marginBottom: '12px' }}>
                            <ArrowLeftOutlined onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }} />
                            <span>Order Tracking</span>
                            <span>{'>'}</span>
                            <span style={{ fontWeight: 600 }}>Order #{orderData.id}</span>
                        </div>
                    </div>
                    <div className={classes.titleRow}>
                        <Title level={2} style={{ margin: 0 }}>Order details</Title>
                        <Button type="primary" size="large">Download Packing List</Button>
                    </div>
                </div>

                <div className={classes.content}>

                    <OrderInfoCard order={orderData} />


                    <ShippingUpdateCard
                        initialWeight={4}
                        initialCost={30.00}
                        onUpdate={handleShippingUpdate}
                    />

                    <PackingListTable items={packingListItems} />

                    <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                        <Col xs={24} lg={12}>
                            <CustomerInfoSection data={customerData} />
                        </Col>
                        <Col xs={24} lg={12}>
                            <DeliveryInfoSection data={deliveryData} />
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]}>
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