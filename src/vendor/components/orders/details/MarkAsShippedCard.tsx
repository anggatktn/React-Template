import React, { useState } from 'react';
import { Card, Button, Input, Typography, Row, Col, message } from 'antd';

const { Title, Text } = Typography;

interface MarkAsShippedCardProps {
    onUpdate: (trackingId: string, trackingUrl: string, note: string) => void;
}

const MarkAsShippedCard: React.FC<MarkAsShippedCardProps> = ({ onUpdate }) => {
    const [trackingId, setTrackingId] = useState('');
    const [trackingUrl, setTrackingUrl] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = () => {
        if (!trackingId) {
            message.error('Please enter Tracking ID');
            return;
        }
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            onUpdate(trackingId, trackingUrl, note);
            setLoading(false);
        }, 1000);
    };

    return (
        <div style={{ marginBottom: 24 }}>
            <Title level={4} style={{ marginBottom: 16, marginTop: 30 }}>Update Status</Title>
            <Card
                bordered={false}
                style={{ borderRadius: 8, width: '100%' }}
                bodyStyle={{ padding: '24px' }}
            >
                <Row gutter={[24, 24]}>
                    <Col span={8}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Text strong style={{ fontSize: '14px', color: '#262626' }}>Tracking ID</Text>
                            <Input
                                placeholder="ID-AKDNJKDCN-983746718934"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                style={{ padding: '8px 12px' }}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Text strong style={{ fontSize: '14px', color: '#262626' }}>Tracking URL</Text>
                            <Input
                                placeholder="https://www.tracking.ID-19-13929&t=500zt..."
                                value={trackingUrl}
                                onChange={(e) => setTrackingUrl(e.target.value)}
                                style={{ padding: '8px 12px' }}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Text strong style={{ fontSize: '14px', color: '#262626' }}>Note to Customer <span style={{ color: '#8c8c8c', fontWeight: 400 }}>(Optional)</span></Text>
                            <Input
                                placeholder="Leave a note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                style={{ padding: '8px 12px' }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: 24 }}>
                    <Col>
                        <Button
                            type="primary"
                            onClick={handleUpdate}
                            loading={loading}
                            style={{
                                height: '40px',
                                backgroundColor: '#2563EB',
                                fontWeight: 600,
                                paddingLeft: 32,
                                paddingRight: 32
                            }}
                        >
                            Update Status as Shipped
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default MarkAsShippedCard;
