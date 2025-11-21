import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

interface CustomerInfoProps {
    data: {
        vendorCode: string;
        customerName: string;
        companyName: string;
        companyUEN: string;
        companyEmail: string;
        customerMobile: string;
        companyAddress: string;
    };
}

const CustomerInfoSection: React.FC<CustomerInfoProps> = ({ data }) => {
    const renderItem = (label: string, value: string) => (
        <Row style={{ marginBottom: 12 }}>
            <Col span={8}>
                <Text strong style={{ fontSize: '14px' }}>{label}</Text>
            </Col>
            <Col span={16}>
                <Text type="secondary">{value}</Text>
            </Col>
        </Row>
    );

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography.Title level={4} style={{ marginBottom: 16, marginTop: 30 }}>Customer Information</Typography.Title>
            <Card bordered={false} style={{ borderRadius: 8, flex: 1 }}>
                {renderItem("Vendor Code", data.vendorCode)}
                {renderItem("Customer Name", data.customerName)}
                {renderItem("Company Name", data.companyName)}
                {renderItem("Company UEN", data.companyUEN)}
                {renderItem("Company Email", data.companyEmail)}
                {renderItem("Customer Mobile", data.customerMobile)}
                {renderItem("Company Address", data.companyAddress)}
            </Card>
        </div>
    );
};

export default CustomerInfoSection;