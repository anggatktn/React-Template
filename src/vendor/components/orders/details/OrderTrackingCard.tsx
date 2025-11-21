import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const OrderTrackingCard: React.FC = () => {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: 30 }}>
            <Typography.Title level={4} style={{ marginBottom: 16, marginTop: 0 }}>Order tracking</Typography.Title>
            <Card bordered={false} style={{ borderRadius: 8, flex: 1 }}>
                <Row style={{ padding: '12px 0' }}>
                    <Col span={8} style={{ borderRight: '1px solid #f0f0f0', paddingRight: 16, textAlign: 'right' }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>Oct 25, 2025, 10:10am</Text>
                    </Col>
                    <Col span={16} style={{ paddingLeft: 16 }}>
                        <Text strong>Order Placed - Door Step Delivery</Text>
                    </Col>
                </Row>
                {/* Add more rows here as needed */}
            </Card>
        </div>
    );
};

export default OrderTrackingCard;