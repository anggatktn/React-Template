import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';

const { Text } = Typography;

interface PaymentInfoProps {
    payment: {
        subtotal: number;
        shipping: number;
        tax: number;
        total: number;
        method: string;
    };
}

const PaymentInfoCard: React.FC<PaymentInfoProps> = ({ payment }) => {
    return (
        <Card title="Payment Summary" bordered={false} style={{ borderRadius: 8 }}>
            <Row gutter={[0, 12]}>
                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">Subtotal</Text>
                    <Text>${payment.subtotal.toFixed(2)}</Text>
                </Col>
                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">Shipping</Text>
                    <Text>${payment.shipping.toFixed(2)}</Text>
                </Col>
                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">Tax</Text>
                    <Text>${payment.tax.toFixed(2)}</Text>
                </Col>
                <Divider style={{ margin: '12px 0' }} />
                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>Total</Text>
                    <Text strong style={{ fontSize: '16px' }}>${payment.total.toFixed(2)}</Text>
                </Col>
                <Col span={24} style={{ marginTop: 12 }}>
                    <Text type="secondary">Paid via {payment.method}</Text>
                </Col>
            </Row>
        </Card>
    );
};

export default PaymentInfoCard;
