import React from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';

const { Text } = Typography;

interface ShippingInfoCardProps {
    provider?: string;
    weight?: number;
    shippingCost?: number;
    status?: string;
    onEdit?: () => void;
}

const ShippingInfoCard: React.FC<ShippingInfoCardProps> = ({
    provider = 'Cainiao',
    weight = 4,
    shippingCost = 30.00,
    status = 'Awaiting Shipment Payment',
    onEdit
}) => {
    return (
        <div style={{ marginBottom: 24 }}>
            <Typography.Title level={4} style={{ marginBottom: 16, marginTop: 30 }}>Shipping Cost and Weight</Typography.Title>
            <Card
                bordered={false}
                style={{ borderRadius: 8, width: '100%' }}
                bodyStyle={{ padding: '24px' }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Row align="middle">
                            <Col span={6}>
                                <Text style={{ color: '#515B6D', fontWeight: 500 }}>Logistics Provider</Text>
                            </Col>
                            <Col flex="auto">
                                <Text strong>{provider}</Text>
                            </Col>
                            <Col>
                                <Button type="link" onClick={onEdit} style={{ padding: 0, fontWeight: 600 }}>
                                    Edit
                                </Button>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row>
                            <Col span={6}>
                                <Text style={{ color: '#515B6D', fontWeight: 500 }}>Weight</Text>
                            </Col>
                            <Col span={18}>
                                <Text strong>{weight} KG</Text>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row>
                            <Col span={6}>
                                <Text style={{ color: '#515B6D', fontWeight: 500 }}>Shipping Cost</Text>
                            </Col>
                            <Col span={18}>
                                <Text strong style={{ color: '#1890ff' }}>S${shippingCost.toFixed(2)}</Text>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row>
                            <Col span={6}>
                                <Text style={{ color: '#515B6D', fontWeight: 500 }}>Status</Text>
                            </Col>
                            <Col span={18}>
                                <Text strong style={{ color: '#13c2c2' }}>{status}</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ShippingInfoCard;
