import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text, Title } = Typography;

interface ShippingInfoCardProps {
    deliveryType?: string;
    weight?: number;
    shippingCost?: number;
    duties?: number;
    status?: string;
    proofOfDelivery?: string;
}

const ShippingInfoCard: React.FC<ShippingInfoCardProps> = ({
    deliveryType = 'Door Step Delivery',
    weight = 4,
    shippingCost = 30.00,
    duties = 10.00,
    status = 'Awaiting Shipment Acceptance',
    proofOfDelivery = '-'
}) => {
    const totalCost = shippingCost + duties;

    return (
        <div style={{ marginBottom: 24 }}>
            <Title level={4} style={{ marginBottom: 16, marginTop: 30 }}>Shipment Information</Title>
            <Card
                bordered={false}
                style={{ borderRadius: 8, width: '100%' }}
                bodyStyle={{ padding: '24px' }}
            >
                <Row gutter={[24, 16]}>
                    <Col span={9}>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={10}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Delivery Type</Text>
                            </Col>
                            <Col span={14}>
                                <Text style={{ color: '#595959' }}>{deliveryType}</Text>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={10}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Weight</Text>
                            </Col>
                            <Col span={14}>
                                <Text style={{ color: '#595959' }}>{weight} KG</Text>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={10}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Shipping Cost</Text>
                            </Col>
                            <Col span={14}>
                                <Text style={{ color: '#595959' }}>S${shippingCost.toFixed(2)}</Text>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={10}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Duties and Taxes</Text>
                            </Col>
                            <Col span={14}>
                                <Text style={{ color: '#595959' }}>S${duties.toFixed(2)}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Total Cost</Text>
                            </Col>
                            <Col span={14}>
                                <Text strong style={{ color: '#2563EB' }}>S${totalCost.toFixed(2)}</Text>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={15}>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={6}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Status</Text>
                            </Col>
                            <Col span={18}>
                                <Text strong style={{ color: '#1590A0' }}>{status}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Proof of Delivery</Text>
                            </Col>
                            <Col span={18}>
                                <Text style={{ color: '#595959' }}>{proofOfDelivery}</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ShippingInfoCard;
