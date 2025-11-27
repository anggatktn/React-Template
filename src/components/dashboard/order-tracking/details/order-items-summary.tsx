import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import { type OrderDetailsState } from '../../../../pages/dashboard/order-tracking/details/order-details-state';
import { BarcodeOutlined } from '@ant-design/icons'; // Placeholder for barcode

const { Text, Title } = Typography;

interface OrderItemsSummaryProps {
    data: OrderDetailsState;
}

const OrderItemsSummary: React.FC<OrderItemsSummaryProps> = ({ data }) => {
    return (
        <div style={{
            marginBottom: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            height: 'auto'
        }}>
            <span
                style={{
                    fontSize: 16,
                    fontWeight: 600
                }}
            >Order items summary</span>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    height: 'auto'
                }}
            >
                {data.items.map((item, index) => (
                    <Card style={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        height: 'max-content'
                    }}>
                        <div key={item.id}>
                            <Row
                                style={{
                                    width: '100%',
                                    gap: 24,
                                    height: "100%"
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flex: '0 0 190px',
                                        gap: 16
                                    }}
                                >
                                    <Text strong>{item.name}</Text>
                                    <div style={{
                                        border: '1px solid #d9d9d9',
                                        borderRadius: '4px',
                                        padding: '16px',
                                        textAlign: 'center',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        {/* Placeholder for actual barcode image */}
                                        <BarcodeOutlined style={{
                                            fontSize: '48px',
                                            color: '#000',
                                        }} />
                                    </div>
                                </div>

                                <Col flex="1">
                                    <Row gutter={[16, 8]}>
                                        <Col span={4}><Text strong>SSN</Text></Col>
                                        <Col span={20}><Text type="secondary">{item.ssn}</Text></Col>

                                        <Col span={4}><Text strong>Description</Text></Col>
                                        <Col span={20}><Text type="secondary">{item.description}</Text></Col>

                                        <Col span={4}><Text strong>Size</Text></Col>
                                        <Col span={20}><Text type="secondary">{item.size}</Text></Col>

                                        <Col span={4}><Text strong>Quantity</Text></Col>
                                        <Col span={20}><Text type="secondary">{item.quantity}</Text></Col>

                                        <Col span={4}><Text strong>Deliver to</Text></Col>
                                        <Col span={20}>
                                            <Row justify="space-between">
                                                <Col><Text type="secondary">{item.deliverTo}</Text></Col>
                                                <Col>
                                                    <Text strong style={{ marginRight: 8 }}>Subtotal</Text>
                                                    <Text style={{ color: '#1890ff' }}>{item.subtotal}</Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Card>)
                )}
            </div>
            <Row justify="end" style={{ marginTop: 24 }}>
                <Col>
                    <Text strong style={{ fontSize: '16px', marginRight: 24 }}>Total Paid</Text>
                    <Text strong style={{ fontSize: '16px' }}>{data.amountPaid}</Text>
                </Col>
            </Row>
        </div>
    );
};

// Helper import
import { Space } from 'antd';

export default OrderItemsSummary;
