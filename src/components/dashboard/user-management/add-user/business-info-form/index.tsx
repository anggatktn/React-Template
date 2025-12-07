import React from 'react';
import { Form, Input, Typography } from 'antd';

const { Title } = Typography;

interface BusinessInfoFormProps {
    vendorCode: string;
    customerName: string;
    companyName: string;
    companyUEN: string;
    companyEmail: string;
    customerMobile: string;
    onFieldChange: (field: string, value: string) => void;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({
    vendorCode,
    customerName,
    companyName,
    companyUEN,
    companyEmail,
    customerMobile,
    onFieldChange
}) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
        }}>
            <span style={{
                fontWeight: 600,
                fontSize: '20px',
            }}>
                Business Information
            </span>
            <Form layout="vertical">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item
                        label="Vendor Code"
                        required
                        help="Must be exactly 7 digits for UPC encoding (disregarding any '/' prefix)"
                    >
                        <Input
                            placeholder="0000567"
                            value={vendorCode}
                            onChange={(e) => onFieldChange('vendorCode', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                    <Form.Item label="Customer Name" required>
                        <Input
                            placeholder="John Doe"
                            value={customerName}
                            onChange={(e) => onFieldChange('customerName', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item label="Company Name" required>
                        <Input
                            placeholder="Gear Turf Technology Pte Ltd"
                            value={companyName}
                            onChange={(e) => onFieldChange('companyName', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                    <Form.Item label="Company UEN" required>
                        <Input
                            placeholder="201525201Z"
                            value={companyUEN}
                            onChange={(e) => onFieldChange('companyUEN', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item label="Company Email" required>
                        <Input
                            type="email"
                            placeholder="johndoe@customer.com"
                            value={companyEmail}
                            onChange={(e) => onFieldChange('companyEmail', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                    <Form.Item label="Customer Mobile" required>
                        <Input
                            placeholder="+65 98765432"
                            value={customerMobile}
                            onChange={(e) => onFieldChange('customerMobile', e.target.value)}
                            style={{ height: '40px' }}
                        />
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default BusinessInfoForm;
