import React from 'react';
import { Typography } from 'antd';
import classes from './index.module.less';

const { Text } = Typography;

export interface RFIDType {
    id: 'normal' | 'floating' | 'metallic';
    name: string;
    dimensions: string;
    price: string;
    icon: string;
}

interface RFIDTypeSelectorProps {
    rfidTypes: RFIDType[];
    selectedType: 'normal' | 'floating' | 'metallic' | null;
    onSelect: (type: 'normal' | 'floating' | 'metallic') => void;
}

const RFIDTypeSelector: React.FC<RFIDTypeSelectorProps> = ({
    rfidTypes,
    selectedType,
    onSelect
}) => {
    return (
        <div style={{ marginBottom: '32px' }}>
            <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>
                Choose RFID type
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {rfidTypes.map((type) => (
                    <div
                        key={type.id}
                        className={`${classes['rfid-card']} ${selectedType === type.id ? classes.selected : ''}`}
                        onClick={() => onSelect(type.id)}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}>
                                <span style={{ fontSize: '32px' }}>{type.icon}</span>
                                <div>
                                    <Text strong style={{
                                        display: 'block',
                                        fontSize: '15px'
                                    }}>
                                        {type.name}
                                    </Text>
                                    <Text type="secondary" style={{
                                        fontSize: '13px'
                                    }}>
                                        {type.dimensions}
                                    </Text>
                                </div>
                            </div>
                            <Text style={{
                                color: '#1677ff',
                                fontWeight: 600,
                                fontSize: '14px'
                            }}>
                                {type.price}
                            </Text>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RFIDTypeSelector;
