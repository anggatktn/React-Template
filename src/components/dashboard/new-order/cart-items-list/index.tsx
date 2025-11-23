import React from 'react';
import { Card, Empty, Button, Space, Typography, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { CartItem } from '../../../../pages/dashboard/new-order/new-order-state';

const { Text } = Typography;

interface CartItemsListProps {
    cartItems: CartItem[];
    onRemoveItem: (itemId: string) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
    cartItems,
    onRemoveItem
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
        <Card
            style={{
                minHeight: 400,
                backgroundColor: 'white'
            }}
        >
            {cartItems.map((item, index) => (
                <div key={item.id}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px 0',
                            gap: '16px'
                        }}
                    >
                        <Space direction="vertical" size={4}>
                            <Text strong>SSN: {item.ssn}</Text>
                            <Text type="secondary">Quantity: {item.quantity}</Text>
                            <Text type="secondary">Destination: {item.deliveryDestination}</Text>
                        </Space>
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => onRemoveItem(item.id)}
                        >
                            Remove
                        </Button>
                    </div>
                    {index < cartItems.length - 1 && (
                        <Divider style={{ margin: 0 }} />
                    )}
                </div>
            ))}
        </Card>
    );
};

export default CartItemsList;
