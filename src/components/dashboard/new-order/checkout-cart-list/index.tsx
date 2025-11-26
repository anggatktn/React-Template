import React from 'react';
import { Card, List, Row, Col, Typography, Button, Space } from 'antd';
import { type CartItem } from '../../../../pages/dashboard/new-order/landing/new-order-state';

const { Text } = Typography;

interface CheckoutCartListProps {
    cartItems: CartItem[];
    onRemoveItem: (id: string) => void;
}

const CheckoutCartList: React.FC<CheckoutCartListProps> = ({ cartItems, onRemoveItem }) => {
    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={cartItems}
            renderItem={(item) => (
                <List.Item>
                    <Card>
                        <Row gutter={24}>
                            <Col span={6}>
                                <div style={{
                                    fontWeight: 600,
                                    marginBottom: 8
                                }}>{item.productType}</div>
                                <div style={{
                                    border: '1px solid #f0f0f0',
                                    borderRadius: 8,
                                    padding: 16,
                                    textAlign: 'center',
                                    height: 120,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {/* Placeholder for product image */}
                                    <img
                                        src={"https://via.placeholder.com/150x80?text=Barcode"}
                                        alt="Product"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%'
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col span={18}>
                                <Row justify="space-between">
                                    <Col span={12}>
                                        <Space direction="vertical" size={8} style={{ width: '100%' }}>
                                            <Row>
                                                <Col span={8}><Text strong>SSN</Text></Col>
                                                <Col span={16}><Text>{item.ssn}</Text></Col>
                                            </Row>
                                            <Row>
                                                <Col span={8}><Text strong>Description</Text></Col>
                                                <Col span={16}><Text type="secondary">{item.description || 'No description'}</Text></Col>
                                            </Row>
                                            <Row>
                                                <Col span={8}><Text strong>Size</Text></Col>
                                                <Col span={16}><Text>{item.size || '-'}</Text></Col>
                                            </Row>
                                            <Row>
                                                <Col span={8}><Text strong>Quantity</Text></Col>
                                                <Col span={16}><Text>{item.quantity}</Text></Col>
                                            </Row>
                                            <Row>
                                                <Col span={8}><Text strong>Deliver to</Text></Col>
                                                <Col span={16}><Text>{item.deliveryDestination}</Text></Col>
                                            </Row>
                                        </Space>
                                    </Col>
                                    <Col span={8} style={{ textAlign: 'right' }}>
                                        <Button type="link" danger onClick={() => onRemoveItem(item.id)}>
                                            Remove
                                        </Button>
                                        <div style={{ marginTop: 16 }}>
                                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                                <Col><Text type="secondary">Products</Text></Col>
                                                <Col><Text strong>S${item.tagsPrice.toFixed(2)}</Text></Col>
                                            </Row>
                                            <Row justify="space-between" style={{ marginBottom: 8 }}>
                                                <Col><Text type="secondary">Singapore GST 9%</Text></Col>
                                                <Col><Text strong>S${item.gst.toFixed(2)}</Text></Col>
                                            </Row>
                                            <Row justify="space-between">
                                                <Col><Text strong>Subtotal</Text></Col>
                                                <Col><Text strong style={{ color: '#1890ff' }}>S${item.subtotal.toFixed(2)}</Text></Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default CheckoutCartList;
