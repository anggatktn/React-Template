import React, { useState } from 'react';
import { Card, Button, Input, Typography, Row, Col, message } from 'antd';

const { Text } = Typography;

interface ShippingUpdateProps {
    initialWeight?: number;
    initialCost?: number;
    onUpdate: (weight: number, cost: number) => void;
}

const ShippingUpdateCard: React.FC<ShippingUpdateProps> = ({
    initialWeight = 0,
    initialCost = 0,
    onUpdate
}) => {
    const [weight, setWeight] = useState<string>(initialWeight.toString());
    const [cost, setCost] = useState<string>(initialCost.toString());
    const [loading, setLoading] = useState(false);

    const handleUpdate = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            onUpdate(parseFloat(weight), parseFloat(cost));
            setLoading(false);
            message.success('Shipping details updated successfully');
        }, 1000);
    };

    return (
        <Card
            title="Update Shipping Cost and Weight"
            bordered={false}
            style={{ borderRadius: 8, marginBottom: 24, width: '100%' }}
            bodyStyle={{ padding: '24px' }}
        >
            <Row gutter={[24, 24]} align="bottom">
                <Col span={6}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Text strong style={{ fontSize: '14px' }}>Total Weight</Text>
                        <Input
                            suffix={<span style={{ color: '#bfbfbf' }}>KG</span>}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            style={{ padding: '8px 12px' }}
                        />
                    </div>
                </Col>

                <Col span={6}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Text strong style={{ fontSize: '14px' }}>Total Shipping Cost</Text>
                        <Input
                            prefix={<span style={{ color: '#bfbfbf', marginRight: 4 }}>S$</span>}
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            style={{ padding: '8px 12px' }}
                        />
                    </div>
                </Col>

                <Col span={4}>
                    <Button
                        type="primary"
                        onClick={handleUpdate}
                        loading={loading}
                        block
                        style={{ height: '40px' }} // Matches input height
                    >
                        Update
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default ShippingUpdateCard;