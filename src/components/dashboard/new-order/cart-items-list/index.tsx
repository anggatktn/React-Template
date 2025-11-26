import React from 'react';
import { Card, Empty, Typography, Row, Col, Button, Space, Divider } from 'antd';
import type { CartItem } from '../../../../pages/dashboard/new-order/landing/new-order-state';

const { Text, Title } = Typography;

interface CartItemsListProps {
    cartItems: CartItem[];
    onRemoveItem: (itemId: string) => void;
    onEditItem: (itemId: string) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
    cartItems,
    onRemoveItem,
    onEditItem
}) => {
    if (cartItems.length === 0) {
        return (
            <Card
                style={{
                    minHeight: 400,
                    backgroundColor: 'white'
                }}
            >
                <Empty
                    description={
                        <div>
                            <Text type="secondary" style={{ fontSize: 16, display: 'block', marginBottom: 8 }}>
                                Your cart is empty
                            </Text>
                            <Text type="secondary">
                                Start by adding a SSN to the cart.
                            </Text>
                        </div>
                    }
                    style={{
                        padding: '80px 0',
                    }}
                />
            </Card>
        );
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            {cartItems.map((item) => (
                <Card
                    key={item.id}
                    style={{
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0'
                    }}
                >
                    {/* Header with Product Type and Actions */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 16
                    }}>
                        <Title level={5} style={{ margin: 0 }}>
                            {item.productType}
                        </Title>
                        <Space>
                            <Button
                                type="text"
                                danger
                                onClick={() => onRemoveItem(item.id)}
                            >
                                Remove
                            </Button>
                            <Button
                                type="link"
                                onClick={() => onEditItem(item.id)}
                            >
                                Edit
                            </Button>
                        </Space>
                    </div>

                    <Row gutter={[24, 16]}>
                        {/* Left Column - Barcode and Details */}
                        <Col xs={24} md={12}>
                            {/* Barcode */}
                            <div style={{
                                backgroundColor: '#f5f5f5',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                padding: '16px',
                                marginBottom: 16,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                {/* Barcode visual */}
                                <div style={{
                                    width: '200px',
                                    height: '60px',
                                    background: 'repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px)',
                                    marginBottom: 8
                                }} />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    marginTop: 8
                                }}>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {item.description || 'Navy Uniform Set 001'}
                                    </Text>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {item.size || 'M'}
                                    </Text>
                                </div>
                            </div>

                            {/* Details */}
                            <Space direction="vertical" size={8} style={{ width: '100%' }}>
                                <Row>
                                    <Col span={8}>
                                        <Text strong>SSN</Text>
                                    </Col>
                                    <Col span={16}>
                                        <Text>{item.ssn}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Text strong>Description</Text>
                                    </Col>
                                    <Col span={16}>
                                        <Text ellipsis title={item.description}>
                                            {item.description || '-'}
                                        </Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Text strong>Size</Text>
                                    </Col>
                                    <Col span={16}>
                                        <Text>{item.size || '-'}</Text>
                                    </Col>
                                </Row>
                            </Space>
                        </Col>

                        {/* Right Column - Quantity, Destination, and Pricing */}
                        <Col xs={24} md={12}>
                            <Space direction="vertical" size={12} style={{ width: '100%' }}>
                                {/* Quantity */}
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span style={{ fontWeight: '500', marginRight: 16 }}>Quantity</span>

                                    <div style={{
                                        backgroundColor: '#f5f5f5',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        width: 240,
                                    }}>
                                        <Text strong>{item.quantity}</Text>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span style={{ fontWeight: '500', marginRight: 16 }}>Deliver to</span>

                                    <div style={{
                                        backgroundColor: '#f5f5f5',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        width: 240,
                                    }}>
                                        <Text strong>{item.deliveryDestination}</Text>
                                    </div>
                                </div>
                                <Divider style={{ margin: '8px 0', backgroundColor: "#D2DAE5" }} />
                                {/* Pricing */}
                                <div style={{}}>
                                    <Row style={{ marginBottom: 8 }}>
                                        <Col span={12}>
                                            <Text>Tags</Text>
                                        </Col>
                                        <Col span={12} style={{ textAlign: 'right' }}>
                                            <Text>S${item.tagsPrice.toFixed(2)}</Text>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: 8 }}>
                                        <Col span={12}>
                                            <Text>Singapore GST 9%</Text>
                                        </Col>
                                        <Col span={12} style={{ textAlign: 'right' }}>
                                            <Text>S${item.gst.toFixed(2)}</Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Text strong>Subtotal</Text>
                                        </Col>
                                        <Col span={12} style={{ textAlign: 'right' }}>
                                            <Text strong style={{ color: '#1890ff', fontSize: 16 }}>
                                                S${item.subtotal.toFixed(2)}
                                            </Text>
                                        </Col>
                                    </Row>
                                </div>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            ))}
        </div>
    );
};

export default CartItemsList;
