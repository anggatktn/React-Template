import React from 'react';
import { Select, InputNumber, Button, Typography, Card, Form, Row } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

interface OrderFormInputsProps {
    selectedSSN: string | null;
    quantity: number;
    deliveryDestination: string | null;
    itemsCount: number;
    canAddToCart: boolean;
    ssnOptions: Array<{ value: string; label: string }>;
    deliveryDestinations: Array<{ value: string; label: string }>;
    onSSNSelect: (value: string | null) => void;
    onQuantityChange: (value: number) => void;
    onDeliveryDestinationSelect: (value: string | null) => void;
    onAddToCart: () => void;
    onAddHandheldScanner: () => void;
    onAddDeliveryAddress: () => void;
}

const OrderFormInputs: React.FC<OrderFormInputsProps> = ({
    selectedSSN,
    quantity,
    deliveryDestination,
    itemsCount,
    canAddToCart,
    ssnOptions,
    deliveryDestinations,
    onSSNSelect,
    onQuantityChange,
    onDeliveryDestinationSelect,
    onAddToCart,
    onAddHandheldScanner,
    onAddDeliveryAddress
}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        }}>
            <Card
                style={{
                    backgroundColor: '#E8EDF0',
                    border: '1px solid #e0e0e0'
                }}
            >
                <Form
                    layout="vertical"
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        alignItems: 'end'
                    }}>
                        <Form.Item
                            label={<Text strong style={{ fontSize: '14px' }}>Select SSN</Text>}
                            style={{ marginBottom: 0 }}
                        >
                            <Select
                                placeholder="Select SSN"
                                style={{ width: '100%' }}
                                value={selectedSSN}
                                onChange={onSSNSelect}
                                options={ssnOptions}
                                size="large"
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item
                            label={<Text strong style={{ fontSize: '14px' }}>Quantity</Text>}
                            style={{ marginBottom: 0 }}
                        >
                            <InputNumber
                                placeholder="Enter quantity"
                                style={{ width: '100%' }}
                                min={1}
                                size="large"
                                value={quantity}
                                onChange={(value) => onQuantityChange(value || 1)}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<Text strong style={{ fontSize: '14px' }}>Delivery Destination</Text>}
                            style={{ marginBottom: 0, width: '100%' }}
                        >
                            <Select
                                placeholder="Select a delivery destination"
                                style={{ width: '100%' }}
                                value={deliveryDestination}
                                onChange={onDeliveryDestinationSelect}
                                options={deliveryDestinations}
                                size="large"
                                allowClear
                                popupRender={(menu) => (
                                    <div style={{
                                        width: '100%'
                                    }}>
                                        {menu}
                                        <Row
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                marginTop: '8px',
                                                cursor: 'pointer',
                                                gap: '8px',
                                                padding: '0 0 8px 12px'
                                            }}
                                            onClick={onAddDeliveryAddress}
                                        >
                                            <PlusCircleFilled />
                                            <Text>Add new delivery address</Text>
                                        </Row>
                                    </div>
                                )}
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button
                                type="primary"
                                style={{
                                    width: 120
                                }}
                                disabled={!canAddToCart}
                                onClick={onAddToCart}
                                size='large'
                            >
                                Add to cart
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Card>
            {/* Form Row */}


            {/* Items Count and Scanner Link */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text type="secondary">Items added:</Text>
                <Text strong style={{
                    flex: 1,
                    margin: '0 8px',
                }}>{itemsCount}</Text>

                <Button
                    type="link"
                    icon={<PlusCircleFilled />}
                    onClick={onAddHandheldScanner}
                    style={{ padding: 0 }}
                >
                    Add handheld scanner to cart
                </Button>
            </div>
        </div>
    );
};

export default OrderFormInputs;
