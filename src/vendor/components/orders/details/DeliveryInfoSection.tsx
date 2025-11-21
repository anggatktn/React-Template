import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

interface DeliveryInfoProps {
    data: {
        deliverTo: string;
        contactPerson: string;
        contactMobile: string;
        deliveryNote: string;
    };
}

const DeliveryInfoSection: React.FC<DeliveryInfoProps> = ({ data }) => {
    const renderItem = (label: string, value: React.ReactNode) => (
        <Row style={{ marginBottom: 16 }}>
            <Col span={8}>
                <Text strong style={{ fontSize: '14px' }}>{label}</Text>
            </Col>
            <Col span={16}>
                {value}
            </Col>
        </Row>
    );

    return (
        <Card title="Delivery Information" bordered={false} style={{ borderRadius: 8, height: '100%' }}>
            {renderItem("Deliver to", <Text type="secondary">{data.deliverTo}</Text>)}
            {renderItem("Contact Person", <Text type="secondary">{data.contactPerson}</Text>)}
            {renderItem("Contact Mobile", <Text type="secondary">{data.contactMobile}</Text>)}
            {renderItem("Delivery Note", <Text style={{ color: '#1890ff', fontStyle: 'italic' }}>{data.deliveryNote}</Text>)}
        </Card>
    );
};

export default DeliveryInfoSection;