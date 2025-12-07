import React from 'react';
import { Form, Input, Select, Typography } from 'antd';

const { Title } = Typography;
const { Option } = Select;

interface CompanyAddressFormProps {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    onFieldChange: (field: string, value: string) => void;
}

const CompanyAddressForm: React.FC<CompanyAddressFormProps> = ({
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    onFieldChange
}) => {
    return (
        <div style={{ marginBottom: '32px' }}>
            <Title level={4} style={{ marginBottom: '24px', fontWeight: 600 }}>
                Company Address
            </Title>
            <Form layout="vertical">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item label="Address Line 1" required>
                        <Input
                            placeholder="123 Orchard Road"
                            value={addressLine1}
                            onChange={(e) => onFieldChange('addressLine1', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                    <Form.Item label="Address Line 2">
                        <Input
                            placeholder="#04-12 Lucky Plaza"
                            value={addressLine2}
                            onChange={(e) => onFieldChange('addressLine2', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item label="City/Town" required>
                        <Input
                            placeholder="Singapore"
                            value={city}
                            onChange={(e) => onFieldChange('city', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                    <Form.Item label="State/Province/Region" required>
                        <Input
                            placeholder="Central Singapore"
                            value={state}
                            onChange={(e) => onFieldChange('state', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item label="Postal / ZIP Code" required>
                        <Input
                            placeholder="876543"
                            value={postalCode}
                            onChange={(e) => onFieldChange('postalCode', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                    <Form.Item label="Country" required>
                        <Select
                            placeholder="Select Country"
                            value={country || undefined}
                            onChange={(value) => onFieldChange('country', value)}
                            style={{ height: '40px' }}
                        >
                            <Option value="Singapore">Singapore</Option>
                            <Option value="Malaysia">Malaysia</Option>
                            <Option value="Indonesia">Indonesia</Option>
                            <Option value="Thailand">Thailand</Option>
                            <Option value="Philippines">Philippines</Option>
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default CompanyAddressForm;
