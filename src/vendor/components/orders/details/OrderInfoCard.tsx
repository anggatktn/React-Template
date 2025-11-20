import React from 'react';
import { Card, Row, Col, Typography, Divider, Space } from 'antd';

const { Text, Title } = Typography;

interface OrderInfoProps {
    order: {
        id: string;
        date: string;
        itemCount: number;
        amountPaid: number;
        shipmentPaid: string | number | null; // Can be '-' or a number
        status: string;
        // Delivery Details
        deliveryAddress: string;
        contactPerson: string;
        contactPhone: string;
        deliveryNote: string;
    };
}

const OrderInfoCard: React.FC<OrderInfoProps> = ({ order }) => {
    // Helper for rendering the top stats to ensure consistent styling
    const renderStat = (label: string, value: React.ReactNode, isMoney = false) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>{label}</Text>
            {isMoney ? (
                <Text style={{ color: '#1890ff', fontWeight: 600 }}>{value}</Text>
            ) : (
                <Text strong>{value}</Text>
            )}
        </div>
    );

    return (
        <Card
            title="Order Information"
            bordered={false}
            style={{ borderRadius: 8, width: '100%', marginBottom: 24 }}
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
                        <Text type="secondary" style={{ fontSize: '12px' }}>Status</Text>
                        <Text type="warning" strong>{order.status}</Text>
                    </div>
                </Col>
            </Row>

            <Divider style={{ margin: '24px 0' }} />

            {/* Bottom Row: Delivery Details */}
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
    );
};

export default OrderInfoCard;