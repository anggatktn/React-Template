import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Typography, Row, Col, message, Select } from 'antd';

const { Text, Title } = Typography;
const { Option } = Select;

interface ShippingUpdateProps {
    initialWeight?: number;
    initialCost?: number;
    initialDuties?: number;
    onUpdate: (weight: number, cost: number, duties: number) => void;
}

const CURRENCIES = [
    { label: 'SGD', value: 'SGD', symbol: 'S$' },
    { label: 'MYR', value: 'MYR', symbol: 'RM' },
    { label: 'IDR', value: 'IDR', symbol: 'Rp' },
    { label: 'THB', value: 'THB', symbol: '฿' },
];

const ShippingUpdateCard: React.FC<ShippingUpdateProps> = ({
    initialWeight = 0,
    initialCost = 0,
    initialDuties = 0,
    onUpdate
}) => {
    const [weight, setWeight] = useState<string>(initialWeight.toString());
    const [shippingCost, setShippingCost] = useState<string>(initialCost.toString());
    const [shippingCurrency, setShippingCurrency] = useState<string>('SGD');
    const [duties, setDuties] = useState<string>(initialDuties.toString());
    const [dutiesCurrency, setDutiesCurrency] = useState<string>('SGD');
    const [loading, setLoading] = useState(false);

    const handleUpdate = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            onUpdate(parseFloat(weight), parseFloat(shippingCost), parseFloat(duties));
            setLoading(false);
            message.success('Shipping details updated successfully');
        }, 1000);
    };

    const totalCost = (parseFloat(shippingCost) || 0) + (parseFloat(duties) || 0);
    const currentCurrencySymbol = CURRENCIES.find(c => c.value === shippingCurrency)?.symbol || '$';

    const renderCustomInput = (
        value: string,
        onChange: (val: string) => void,
        currency: string,
        onCurrencyChange: (val: string) => void
    ) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            padding: '4px 11px',
            backgroundColor: '#fff',
            transition: 'all 0.3s'
        }}>
            <span style={{ color: '#000', marginRight: 8, fontWeight: 'bold' }}>
                {CURRENCIES.find(c => c.value === currency)?.symbol}
            </span>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                bordered={false}
                style={{ padding: 0, flex: 1 }}
            />
            <Select
                value={currency}
                onChange={onCurrencyChange}
                bordered={false}
                style={{ width: 75, fontWeight: 'bold' }}
                dropdownMatchSelectWidth={false}
            >
                {CURRENCIES.map(c => (
                    <Option key={c.value} value={c.value}>
                        <span style={{ fontWeight: 'bold', color: '#000' }}>{c.value}</span>
                    </Option>
                ))}
            </Select>
        </div>
    );

    return (
        <div style={{ marginBottom: 24 }}>
            <Title level={4} style={{ marginBottom: 16, marginTop: 30 }}>Update Shipping Cost and Weight</Title>
            <Card
                bordered={false}
                style={{ borderRadius: 8, width: '100%' }}
                bodyStyle={{ padding: '24px' }}
            >
                <Row gutter={[24, 24]} align="middle">
                    <Col span={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Text strong style={{ fontSize: '14px' }}>Total Weight</Text>
                            <Input
                                suffix={<span style={{ color: '#000', fontWeight: 'bold' }}>KG</span>}
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                style={{ padding: '8px 12px' }}
                            />
                        </div>
                    </Col>

                    <Col span={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Text strong style={{ fontSize: '14px' }}>Total Shipping Cost</Text>
                            {renderCustomInput(shippingCost, setShippingCost, shippingCurrency, setShippingCurrency)}
                        </div>
                    </Col>

                    <Col span={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Text strong style={{ fontSize: '14px' }}>Duties and Taxes</Text>
                            {renderCustomInput(duties, setDuties, dutiesCurrency, setDutiesCurrency)}
                        </div>
                    </Col>

                    <Col span={6}>
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: '28px' }}>
                            <Text strong style={{ fontSize: '16px', marginRight: 8 }}>Total Cost</Text>
                            <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                                {currentCurrencySymbol}{totalCost.toFixed(2)}
                            </Text>
                        </div>
                    </Col>
                </Row>

                <Row style={{ marginTop: 24 }}>
                    <Col span={6}>
                        <Button
                            type="primary"
                            onClick={handleUpdate}
                            loading={loading}
                            block
                            style={{ height: '40px', backgroundColor: '#2563EB', fontWeight: 500 }}
                        >
                            Update Shipping Cost
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ShippingUpdateCard;
