import React from 'react';
import { Card, Row, Col, Typography, Divider, Button } from 'antd';

const { Title, Text } = Typography;

interface PaymentSummaryCardProps {
    subTotal: number;
    transactionFee: number;
    totalCost: number;
    onProceed: () => void;
}

const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
    subTotal,
    transactionFee,
    totalCost,
    onProceed
}) => {
    return (
        <Card style={{
            backgroundColor: '#E8EDF0',
            border: 'none',
            width: 'max-content'
        }}>
            <div style={{ width: 'auto' }}>
                <Row justify="space-between">
                    <Col><Text>Sub Total</Text></Col>
                    <Col><Text style={{
                        fontSize: 16,
                        fontWeight: 600
                    }}>S${subTotal.toFixed(2)}</Text></Col>
                </Row>
                <Row justify="space-between">
                    <Col><Text type="secondary">- Products</Text></Col>
                    <Col><Text strong>S${(subTotal / 1.09).toFixed(2)}</Text></Col>
                </Row>
                <Row justify="space-between">
                    <Col><Text type="secondary">- Singapore GST 9%</Text></Col>
                    <Col><Text strong>S${(subTotal - (subTotal / 1.09)).toFixed(2)}</Text></Col>
                </Row>
                <Row justify="space-between">
                    <Col><Text>Transaction Fee</Text></Col>
                    <Col><Text strong>S${transactionFee.toFixed(2)}</Text></Col>
                </Row>
                <Row
                    justify="space-between"
                    style={{
                        margin: '18px 0'
                    }}
                >
                    <Col><Text style={{
                        fontSize: 16,
                        fontWeight: 600
                    }}>Total Cost Payable</Text></Col>
                    <Col><Text style={{
                        fontSize: 16,
                        fontWeight: 600
                    }}>S${totalCost.toFixed(2)}</Text></Col>
                </Row>
                <Divider style={{
                    margin: '18px 0',
                    backgroundColor: '#D2DAE5'
                }} />
                <div
                    style={{
                        marginBottom: 16
                    }}
                >
                    <Text style={{
                        fontSize: 12,
                        fontStyle: 'italic',
                        color: '#666666',
                    }}>
                        Import taxes will be borne by the receiver for countries outside Singapore.
                    </Text>
                </div>

                <Button type="primary" block size="large" onClick={onProceed} style={{ height: 48 }}>
                    Proceed to Payment
                </Button>
            </div>
        </Card>
    );
};

export default PaymentSummaryCard;
