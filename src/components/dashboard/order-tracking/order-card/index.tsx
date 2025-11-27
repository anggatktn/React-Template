import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, Typography, Divider, Space } from 'antd';

const { Text } = Typography;

export interface Order {
    id: string;
    date: string;
    itemsCount: number;
    shippingMode: string;
    status: string;
    deliverTo: string;
    contactPerson: string;
    contactNumber: string;
    deliveryNote?: string;
}

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const navigate = useNavigate();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Order Placed': return 'blue';
            case 'Pending Shipment Acceptance': return 'orange';
            case 'Packing Order': return 'cyan';
            case 'Order Shipped': return 'purple';
            case 'Order Delivered': return 'green';
            case 'Ready to Collect': return 'geekblue';
            case 'Collected': return 'green';
            default: return 'default';
        }
    };

    return (
        <div
            style={{
                width: '100%',
                marginBottom: 16,
                borderRadius: 8,
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                height: '100%',
                backgroundColor: '#fff',
                padding: '16px',
            }}
        >
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 32,
            }}>
                <Space direction="vertical" size={0}>
                    <Space>
                        <Text strong>Order ID</Text>
                        <Text type="secondary" style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => navigate(`/dashboard/order-tracking/${order.id}`)}>{order.id}</Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{order.date}</Text>
                </Space>
                <Space direction="horizontal" size={8}>
                    <Text strong>No. of items</Text>
                    <Text>{order.itemsCount.toString().padStart(2, '0')}</Text>
                </Space>

                <Space direction="horizontal" size={8}>
                    <Text strong>Shipping Mode</Text>
                    <Text>{order.shippingMode}</Text>
                </Space>

                <Space direction="horizontal" size={8}>
                    <Text strong>Status</Text>
                    <Text style={{ color: getStatusColor(order.status) === 'blue' ? '#1890ff' : getStatusColor(order.status) === 'green' ? '#52c41a' : undefined }}>
                        {order.status}
                    </Text>
                </Space>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    <Button onClick={() => navigate(`/dashboard/order-tracking/${order.id}`)}>
                        View details
                    </Button>
                </div>
            </div>
            <Divider style={{ margin: '16px 0' }} />
            <Row gutter={[16, 8]}>
                <Col xs={24} sm={4}>
                    <Text strong>Deliver To</Text>
                </Col>
                <Col xs={24} sm={20}>
                    <Text type="secondary">{order.deliverTo}</Text>
                </Col>

                <Col xs={24} sm={4}>
                    <Text strong>Contact Person</Text>
                </Col>
                <Col xs={24} sm={20}>
                    <Text type="secondary">{order.contactPerson}, {order.contactNumber}</Text>
                </Col>

                <Col xs={24} sm={4}>
                    <Text strong>Delivery Note</Text>
                </Col>
                <Col xs={24} sm={20}>
                    <Text type="secondary">{order.deliveryNote || '-'}</Text>
                </Col>
            </Row>
        </div>
    );
};

export default OrderCard;
