import React from 'react';
import { Layout, Typography, Button, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../../components/layout/Navbar';
import OrderInfoCard from '../../../components/orders/details/OrderInfoCard';
import ShippingUpdateCard from '../../../components/orders/details/ShippingUpdateCard';
import PackingListTable, { type PackingListItem } from '../../../components/orders/details/PackingListTable';
// We will re-integrate the other components in the next steps
import classes from './OrderDetails.module.less';

const { Content } = Layout;
const { Title } = Typography;

const OrderDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Updated Mock Data to match your Image
    const orderData = {
        id: id?.replace('#', '') || '0020251001', // Clean ID
        date: 'Oct 25, 2025, 10:10am',
        status: 'Update Shipping Cost',
        itemCount: 3,
        amountPaid: 1390.00,
        shipmentPaid: null,

        // Delivery info for the top card
        deliveryAddress: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 876543.',
        contactPerson: 'John Doe',
        contactPhone: '+65 98765432',
        deliveryNote: 'Please attempt to delivery during weekdays.'
    };

    const handleShippingUpdate = (newWeight: number, newCost: number) => {
        console.log('Updating:', newWeight, newCost);
        // Here you would typically call your backend API
    };

    const packingListItems: PackingListItem[] = [
        {
            key: '1', sn: '01', ssn: '1234567890', layout: 'Large Font',
            description: 'Morbi quis elit condimentum, faucibus eros non...',
            size: 'M', quantity: 300, epcStart: '5354250000000001000000104110'
        },
        {
            key: '2', sn: '02', ssn: '1234567890', layout: 'Standard',
            description: 'Morbi quis elit condimentum, faucibus eros non...',
            size: 'M', quantity: 300, epcStart: '5354250000000001000000104110'
        },
        {
            key: '3', sn: '03', ssn: '1234567890', layout: 'Standard',
            description: 'Morbi quis elit condimentum, faucibus eros non...',
            size: 'M', quantity: 300, epcStart: '5354250000000001000000104110'
        },
        {
            key: '4', sn: '04', ssn: '1234567890', layout: 'Large Font',
            description: 'Morbi quis elit condimentum, faucibus eros non...',
            size: 'M', quantity: 300, epcStart: '5354250000000001000000104110'
        },
    ];
    return (
        <Layout>
            <Navbar />
            <Content className={classes.pageContainer}>
                {/* Header Section */}
                <div className={classes.header}>
                    <div className={classes.breadcrumb}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#1890ff', marginBottom: '12px' }}>
                            <ArrowLeftOutlined onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }} />
                            <span>Order Tracking</span>
                            <span>{'>'}</span>
                            <span style={{ fontWeight: 600 }}>Order #{orderData.id}</span>
                        </div>
                    </div>

                    {/* Title Row */}
                    <div className={classes.titleRow}>
                        <Title level={2} style={{ margin: 0 }}>Order details</Title>
                        <Button type="primary" size="large" style={{ borderRadius: '4px' }}>
                            Download Packing List
                        </Button>
                    </div>
                </div>

                <div className={classes.content}>
                    {/* 1. Order Information (Full Width) */}
                    <OrderInfoCard order={orderData} />

                    {/* 2. PLACEHOLDER: Update Shipping Cost (We will build this next) */}
                    <ShippingUpdateCard
                        initialWeight={4}
                        initialCost={30.00}
                        onUpdate={handleShippingUpdate}
                    />

                    {/* 3. PLACEHOLDER: Packing List (We will refactor your Table next) */}
                    <PackingListTable items={packingListItems} />

                    <div style={{ height: '100px', background: 'rgba(0,0,0,0.05)', border: '1px dashed #ccc', margin: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Next Step: Customer Info, Messages & Tracking
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default OrderDetails;