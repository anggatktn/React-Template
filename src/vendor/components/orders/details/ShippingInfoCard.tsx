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

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Update Shipping Cost': return '#DF7021';
        case 'Awaiting Shipment Acceptance': return '#1590A0';
        case 'Pending Courier Pickup': return '#DF7021';
        case 'Order Shipped': return '#672DB7';
        case 'Order Delivered': return '#3A9448';
        case 'Awaiting Collection': return '#1590A0';
        case 'Order Collected': return '#3A9448';
        case 'Not Collected': return '#CF3030';
        case 'Updated Self Collection Status': return '#1551A0';
        default: return '#8c8c8c';
    }
};

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
                                <Text strong style={{ color: getStatusColor(status) }}>{status}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Proof of Delivery</Text>
                            </Col>
                            <Col span={18}>
                                {proofOfDelivery && proofOfDelivery !== '-' ? (
                                    <div style={{
                                        width: '300px',
                                        border: '1px solid #d9d9d9',
                                        borderRadius: '8px',
                                        padding: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#fafafa'
                                    }}>
                                        <img
                                            src={proofOfDelivery}
                                            alt="Proof of Delivery"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <Text style={{ color: '#595959' }}>{proofOfDelivery}</Text>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ShippingInfoCard;
