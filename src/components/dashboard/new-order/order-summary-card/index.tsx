import React from 'react';
import { Card, Button, Space, Typography, Divider } from 'antd';

const { Text } = Typography;

interface OrderSummaryCardProps {
    subTotal: number;
    transactionFee: number;
    totalCost: number;
    hasItems: boolean;
    onCheckout: () => void;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
    subTotal,
    transactionFee,
    totalCost,
    hasItems,
    onCheckout
}) => {
    return (
        <Card
            style={{
                backgroundColor: '#E8EDF0',
                position: 'sticky',
                top: 80,
                padding: 0
            }}
        >
            <Space
                direction="vertical"
                size={8}
                style={{ width: '100%' }}
            >
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Text>Sub Total</Text>
                        <Text strong>S${subTotal}</Text>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Text>Transaction Fee</Text>
                        <Text strong>S${transactionFee}</Text>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Text strong style={{ fontSize: 16 }}>Total Cost</Text>
                        <Text strong style={{ fontSize: 16 }}>
                            S${totalCost}
                        </Text>
                    </div>
                </div>
                <Divider style={{ margin: 0, backgroundColor: '#D2DAE5' }} />
                <Text
                    type="secondary"
                    style={{
                        fontSize: 11,
                        fontStyle: 'italic',
                    }}
                >
                    Import taxes will be borne by receiver or countries excluding Singapore.
                </Text>

                <Button
                    type="primary"
                    size="large"
                    block
                    disabled={!hasItems}
                    onClick={onCheckout}
                    style={{
                        fontSize: 16,
                        fontWeight: 500,
                        marginTop: 16
                    }}
                >
                    Checkout
                </Button>
            </Space>
        </Card>
    );
};

export default OrderSummaryCard;
