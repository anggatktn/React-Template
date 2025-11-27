import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { type OrderDetailsState } from '../../../../pages/dashboard/order-tracking/details/order-details-state';

const { Text, Title } = Typography;

interface CustomerInfoCardProps {
    data: OrderDetailsState;
}

const CustomerInfoCard: React.FC<CustomerInfoCardProps> = ({ data }) => {
    return (
        <div style={{
            height: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
        }}>
            <span style={{
                fontSize: 16,
                fontWeight: 600
            }}>Customer Information</span>
            <Card style={{
                borderRadius: 8,
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                height: '100%',
                width: '100%'
            }}>
                <Row gutter={[16, 12]}>
                    <Col span={10}><Text strong>Vendor Code</Text></Col>
                    <Col span={14}><Text type="secondary">{data.vendorCode}</Text></Col>

                    <Col span={10}><Text strong>Customer Name</Text></Col>
                    <Col span={14}><Text type="secondary">{data.customerName}</Text></Col>

                    <Col span={10}><Text strong>Company Name</Text></Col>
                    <Col span={14}><Text type="secondary">{data.companyName}</Text></Col>

                    <Col span={10}><Text strong>Company UEN</Text></Col>
                    <Col span={14}><Text type="secondary">{data.companyUEN}</Text></Col>

                    <Col span={10}><Text strong>Company Email</Text></Col>
                    <Col span={14}><Text type="secondary">{data.companyEmail}</Text></Col>

                    <Col span={10}><Text strong>Customer Mobile</Text></Col>
                    <Col span={14}><Text type="secondary">{data.customerMobile}</Text></Col>

                    <Col span={10}><Text strong>Company Address</Text></Col>
                    <Col span={14}><Text type="secondary">{data.companyAddress}</Text></Col>
                </Row>
            </Card>
        </div>
    );
};

export default CustomerInfoCard;
