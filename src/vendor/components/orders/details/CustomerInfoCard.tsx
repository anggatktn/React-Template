import React from 'react';
import { Card, Descriptions, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface CustomerInfoProps {
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
}

const CustomerInfoCard: React.FC<CustomerInfoProps> = ({ customer }) => {
    return (
        <Card title="Customer" bordered={false} style={{ marginBottom: 24, borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <Avatar icon={<UserOutlined />} style={{ marginRight: 12 }} />
                <div>
                    <div style={{ fontWeight: 500 }}>{customer.name}</div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>2 previous orders</div>
                </div>
            </div>
            <Descriptions column={1} layout="vertical" size="small">
                <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
                <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
                <Descriptions.Item label="Shipping Address">{customer.address}</Descriptions.Item>
                <Descriptions.Item label="Billing Address">Same as shipping address</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default CustomerInfoCard;
