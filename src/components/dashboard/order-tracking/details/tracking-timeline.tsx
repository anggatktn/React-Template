import React from 'react';
import { Card, Row, Col, Typography, Steps } from 'antd';
import { type OrderDetailsState } from '../../../../pages/dashboard/order-tracking/details/order-details-state';

const { Title } = Typography;

interface TrackingTimelineProps {
    data: OrderDetailsState;
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ data }) => {
    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            height: 'auto'
        }}>
            <span
                style={{
                    fontSize: 16,
                    fontWeight: 600
                }}
            >Order tracking</span>
            <Card style={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: '100%' }}>
                <Steps
                    direction="vertical"
                    iconPrefix=""
                    items={data.timeline.map((item) => ({
                        title: (
                            <Row style={{ width: '100%' }}>
                                <Col flex="0 0 190px" style={{ color: '#999', fontSize: '14px' }}>
                                    {item.date}
                                </Col>
                                <Col flex="1" style={{ fontSize: '14px', fontWeight: '500' }}>
                                    {item.status}
                                </Col>
                            </Row>
                        ),
                        description: item.description,
                        icon: <></>
                    }))}
                />
            </Card>
        </div>
    );
};

export default TrackingTimeline;
