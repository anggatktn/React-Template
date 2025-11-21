import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const OrderTrackingCard: React.FC = () => {
    return (
        <Card title="Order tracking" bordered={false} style={{ borderRadius: 8, height: '100%' }}>
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
    );
};

export default OrderTrackingCard;