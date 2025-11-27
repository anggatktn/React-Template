import React from 'react';
import { Card, Row, Col, Typography, Button, Space } from 'antd';
import type { OrderDetailsState } from '../../../../pages/dashboard/order-tracking/details/order-details-state';

const { Text, Title } = Typography;

interface ShipmentConfirmationProps {
    data: OrderDetailsState;
    onAcceptCharges: () => void;
    onOptForSelfCollection: () => void;
}

const ShipmentConfirmation: React.FC<ShipmentConfirmationProps> = ({ data, onAcceptCharges, onOptForSelfCollection }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16
        }}>
            <span style={{
                fontSize: 16,
                fontWeight: 600
            }}>Shipment Confirmation Required</span>
            <Card style={{
                borderRadius: 8,
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                <Row gutter={[48, 24]}>
                    {/* Door Step Delivery */}
                    <Col xs={24} md={8}>
                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                            <Text strong>Door Step Delivery</Text>

                            <Row gutter={[16, 8]}>
                                <Col span={10}><Text strong>Logistics Provider</Text></Col>
                                <Col span={14}><Text type="secondary">{data.logisticsProvider}</Text></Col>

                                <Col span={10}><Text strong>Weight</Text></Col>
                                <Col span={14}><Text type="secondary">{data.weight}</Text></Col>

                                <Col span={10}><Text strong>Shipping Cost</Text></Col>
                                <Col span={14}><Text type="secondary">{data.shippingCost}</Text></Col>

                                <Col span={10}><Text strong>Duties and Taxes</Text></Col>
                                <Col span={14}><Text type="secondary">{data.dutiesAndTaxes}</Text></Col>

                                <Col span={10}><Text strong>Total Cost</Text></Col>
                                <Col span={14}><Text strong style={{ color: '#1890ff' }}>{data.totalCost}</Text></Col>
                            </Row>

                            <Button
                                type="primary"
                                block
                                onClick={onAcceptCharges}
                                style={{
                                    backgroundColor: '#265CD7',
                                    borderRadius: '4px',
                                    height: '40px'
                                }}
                            >
                                Accept Charges
                            </Button>

                            <div style={{
                                backgroundColor: '#fffbe6',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ffe58f'
                            }}>
                                <Text style={{ fontSize: '12px' }}>
                                    Shipping cost and taxes to be borne by the recipient. Paid before good receipt. Please ask delivery partner for invoice if required.
                                </Text>
                            </div>
                        </Space>
                    </Col>

                    {/* Self Collection */}
                    <Col xs={24} md={16}>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Space
                                direction="vertical"
                                size={16}
                                style={{
                                    width: 'max-content'
                                }}
                            >
                                <Text strong>Self Collection</Text>

                                <Space direction="vertical" size={4}>
                                    <Text strong>Collection Address</Text>
                                    <Text type="secondary" style={{ whiteSpace: 'pre-line' }}>{data.collectionAddress}</Text>
                                </Space>

                                <Button
                                    block
                                    onClick={onOptForSelfCollection}
                                    style={{
                                        marginTop: 'auto',
                                        borderRadius: '4px',
                                        height: '40px',
                                        backgroundColor: '#EEF3FE',
                                        color: '#265CD7',
                                        border: '1px solid #265CD7'
                                    }}
                                >
                                    Opt for Self Collection
                                </Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ShipmentConfirmation;
