import React from 'react';
import { Radio, Row, Col, Typography } from 'antd';
import DoorStepIcon from "../../../../assets/door_step_delivery.svg?react"
import SelfCollectionIcon from "../../../../assets/self_collection.svg?react"

const { Text } = Typography;

interface ShippingMethodSelectorProps {
    value: 'doorstep' | 'self-collection';
    onChange: (value: 'doorstep' | 'self-collection') => void;
}

const ShippingMethodSelector: React.FC<ShippingMethodSelectorProps> = ({ value, onChange }) => {
    return (
        <Radio.Group
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '100%' }}
        >
            <Row gutter={16}>
                <Col span={6}>
                    <Radio.Button value="doorstep" style={{
                        width: '100%',
                        height: 'auto',
                        padding: '8px 0px',
                        textAlign: 'center',
                        borderColor: value === 'doorstep' ? '#265CD7' : '#d9d9d9',
                        backgroundColor: value === 'doorstep' ? '#e6f7ff' : '#fff'
                    }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8
                            }}
                        >
                            <Text strong style={{ color: value === 'doorstep' ? '#265CD7' : 'inherit' }}>Door Step Delivery</Text>
                            <DoorStepIcon style={{
                                width: 24,
                                height: 24,
                                color: value === 'doorstep' ? '#265CD7' : '#515B6D'
                            }} />
                        </div>
                    </Radio.Button>
                </Col>
                <Col span={6}>
                    <Radio.Button value="self-collection" style={{
                        width: '100%',
                        height: 'auto',
                        padding: '8px 0px',
                        textAlign: 'center',
                        borderColor: value === 'self-collection' ? '#265CD7' : '#d9d9d9',
                        backgroundColor: value === 'self-collection' ? '#e6f7ff' : '#fff'
                    }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8
                            }}
                        >
                            <Text strong style={{ color: value === 'self-collection' ? '#265CD7' : 'inherit' }}>Self Collection</Text>
                            <SelfCollectionIcon style={{
                                width: 24,
                                height: 24,
                                color: value === "self-collection" ? '#265CD7' : '#515B6D'
                            }} />
                        </div>
                    </Radio.Button>
                </Col>
            </Row>
        </Radio.Group>
    );
};

export default ShippingMethodSelector;
