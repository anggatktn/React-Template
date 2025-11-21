import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';

const { Text } = Typography;

interface OrderInfoProps {
    order: {
        id: string;
        date: string;
        itemCount: number;
        amountPaid: number;
        shipmentPaid: string | number | null;
        status: string;
        deliveryAddress: string;
        contactPerson: string;
        contactPhone: string;
        deliveryNote: string;
    };
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Update Shipping Cost': return '#DF7021';
        case 'Awaiting Shipment Payment': return '#1590A0';
        case 'Ready to Ship': return '#DF7021';
        case 'Order Shipped': return '#672DB7';
        case 'Order Delivered': return '#3A9448';
        case 'Awaiting Collection': return '#1590A0';
        case 'Order Collected': return '#3A9448';
        case 'Not Collected': return '#CF3030';
        default: return '#8c8c8c';
    }
};

const OrderInfoCard: React.FC<OrderInfoProps> = ({ order }) => {

    const renderStat = (label: string, value: React.ReactNode, isMoney = false) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Text strong style={{ fontSize: '14px', color: '#262626' }}>{label}</Text>

            {isMoney ? (
                <Text style={{ color: '#1890ff' }}>{value}</Text>
            ) : (
                <Text style={{ color: '#595959' }}>{value}</Text>
            )}
        </div>
    );

    return (
        <div style={{ marginBottom: 24 }}>
            <Typography.Title level={4} style={{ marginBottom: 16, marginTop: 30 }}>Order Information</Typography.Title>
            <Card
                bordered={false}
                style={{ borderRadius: 8, width: '100%' }}
                bodyStyle={{ padding: '24px' }}
            >
                {/* Top Row: Metrics */}
                <Row gutter={[24, 24]} align="middle">
                    <Col span={4}>{renderStat("Ordered On", order.date)}</Col>
                    <Col span={4}>{renderStat("Order ID", order.id)}</Col>
                    <Col span={3}>{renderStat("No. of items", String(order.itemCount).padStart(2, '0'))}</Col>
                    <Col span={3}>{renderStat("Amount Paid", `S$${order.amountPaid.toFixed(2)}`, true)}</Col>
                    <Col span={3}>{renderStat("Shipment Paid", order.shipmentPaid || '-')}</Col>
                    <Col span={4}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <Text strong style={{ fontSize: '14px', color: '#262626' }}>Status</Text>
                            <Text strong style={{ color: getStatusColor(order.status) }}>{order.status}</Text>
                        </div>
                    </Col>
                </Row>

                <Divider style={{ margin: '24px 0' }} />


                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Row gutter={[16, 16]}>
                        <Col span={3}>
                            <Text strong>Deliver to</Text>
                        </Col>
                        <Col span={21}>
                            <Text type="secondary">{order.deliveryAddress}</Text>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col span={3}>
                            <Text strong>Contact Person</Text>
                        </Col>
                        <Col span={21}>
                            <Text type="secondary">{order.contactPerson}, {order.contactPhone}</Text>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col span={3}>
                            <Text strong>Delivery Note</Text>
                        </Col>
                        <Col span={21}>
                            <Text type="secondary">{order.deliveryNote}</Text>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
    );
};

export default OrderInfoCard;