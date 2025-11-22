import React from 'react';
import { Input, Select, Typography } from 'antd';

const { Text } = Typography;
const { TextArea } = Input;

interface SSNFormInputsProps {
    ssnValue: string;
    description: string;
    size: string;
    onSSNChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSizeChange: (value: string) => void;
}

const SSNFormInputs: React.FC<SSNFormInputsProps> = ({
    ssnValue,
    description,
    size,
    onSSNChange,
    onDescriptionChange,
    onSizeChange
}) => {
    return (
        <div style={{
            marginBottom: '24px',
            gap: '24px',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Enter SSN */}
            <div>
                <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                    Enter SSN. <Text type="secondary" style={{ fontWeight: 400 }}>Max 13 characters</Text>
                </Text>
                <Select
                    placeholder="Type or select a previous SSN"
                    style={{ width: '100%', height: '48px' }}
                    value={ssnValue || undefined}
                    onChange={onSSNChange}
                    showSearch
                    allowClear
                    options={[]}
                />
            </div>

            {/* Enter Description */}
            <div>
                <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                    Enter Description. <Text type="secondary" style={{ fontWeight: 400 }}>Max 120 characters</Text>
                </Text>
                <TextArea
                    placeholder="Type item description"
                    rows={4}
                    maxLength={120}
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    style={{ borderRadius: '8px' }}
                />
            </div>

            {/* Enter Size */}
            <div>
                <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                    Enter Size <Text type="secondary" style={{ fontWeight: 400 }}>(Optional)</Text>
                </Text>
                <Input
                    placeholder="Example: S or XL"
                    style={{ height: '48px', borderRadius: '8px' }}
                    value={size}
                    onChange={(e) => onSizeChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SSNFormInputs;
