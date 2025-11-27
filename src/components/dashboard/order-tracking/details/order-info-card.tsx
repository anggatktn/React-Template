import React from 'react';
import { Card, Row, Col, Typography, Space, Divider } from 'antd';
import { type OrderDetailsState } from '../../../../pages/dashboard/order-tracking/details/order-details-state';

const { Text, Title } = Typography;

interface OrderInfoCardProps {
    data: OrderDetailsState;
}

const OrderInfoCard: React.FC<OrderInfoCardProps> = ({ data }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16
        }}>
            <span style={{
                fontSize: 16,
                fontWeight: 600
            }}>Order Information</span>
            <Card style={{
                borderRadius: 8,
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                <Row gutter={[24, 24]}>
                    <Col span={24}>
                        <Row gutter={[48, 16]}>
                            <Col>
                                <Space direction="vertical" size={0}>
                                    <Text strong>Ordered On</Text>
                                    <Text type="secondary">{data.orderDate}</Text>
                                </Space>
                            </Col>
                            <Col>
                                <Space direction="vertical" size={0}>
                                    <Text strong>Order ID</Text>
                                    <Text type="secondary">{data.orderId}</Text>
                                </Space>
                            </Col>
                            <Col>
                                <Space direction="vertical" size={0}>
                                    <Text strong>No. of items</Text>
                                    <Text type="secondary">{data.itemsCount}</Text>
                                </Space>
                            </Col>
                            <Col>
                                <Space direction="vertical" size={0}>
                                    <Text strong>Amount Paid</Text>
                                    <Text style={{ color: '#1890ff' }}>{data.amountPaid}</Text>
                                </Space>
                            </Col>
                            <Col>
                                <Space direction="vertical" size={0}>
                                    <Text strong>Shipment Paid</Text>
                                    <Text type="secondary">{data.shipmentPaid}</Text>
                                </Space>
                            </Col>
                            <Col>
                                <Space direction="vertical" size={0}>
                                    <Text strong>Status</Text>
                                    <Text style={{ color: '#fa8c16' }}>{data.status}</Text>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Divider
                        style={{
                            margin: '0px 0px',
                            height: 1,
                            backgroundColor: '#d1d9e3'
                        }}
                    />
                    <Col span={24}>
                        <Row gutter={[16, 8]}>
                            <Col xs={24} sm={4}>
                                <Text strong>Deliver To</Text>
                            </Col>
                            <Col xs={24} sm={20}>
                                <Text type="secondary">{data.deliverTo}</Text>
                            </Col>

                            <Col xs={24} sm={4}>
                                <Text strong>Contact Person</Text>
                            </Col>
                            <Col xs={24} sm={20}>
                                <Text type="secondary">{data.contactPerson}, {data.contactNumber}, {data.contactEmail}</Text>
                            </Col>

                            <Col xs={24} sm={4}>
                                <Text strong>Delivery Note</Text>
                            </Col>
                            <Col xs={24} sm={20}>
                                <Text type="secondary">{data.deliveryNote}</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default OrderInfoCard;
