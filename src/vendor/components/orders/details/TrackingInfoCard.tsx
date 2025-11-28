import React from 'react';
import { Card, Typography, Row, Col, Button, message } from 'antd';
import { CopyOutlined, ExportOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface TrackingInfoCardProps {
    trackingId: string;
    trackingUrl: string;
    note?: string;
}

const TrackingInfoCard: React.FC<TrackingInfoCardProps> = ({ trackingId, trackingUrl, note }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(trackingId);
        message.success('Tracking ID copied to clipboard');
    };

    return (
        <div style={{ marginBottom: 24 }}>
            <Title level={4} style={{ marginBottom: 16, marginTop: 30 }}>Tracking Info</Title>
            <Card
                bordered={false}
                style={{ borderRadius: 8, width: '100%' }}
                bodyStyle={{ padding: '24px' }}
            >
                <Row gutter={[24, 24]} align="middle">
                    <Col span={24}>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={4}>
                                <Text strong style={{ fontSize: '14px', color: '#262626' }}>Tracking ID</Text>
                            </Col>
                            <Col span={20}>
                                <Text style={{ fontSize: '14px', color: '#262626', marginRight: 16 }}>{trackingId}</Text>
                                <Button
                                    type="link"
                                    icon={<CopyOutlined />}
                                    onClick={handleCopy}
                                    style={{ padding: 0, fontWeight: 600 }}
                                >
                                    Copy
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={4}>
                                <Text strong style={{ fontSize: '14px', color: '#262626' }}>Tracking URL</Text>
                            </Col>
                            <Col span={20}>
                                <a href={trackingUrl.startsWith('http') ? trackingUrl : `https://${trackingUrl}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                                    {trackingUrl} <ExportOutlined />
                                </a>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <Text strong style={{ fontSize: '14px', color: '#262626' }}>Note from Vendor</Text>
                            </Col>
                            <Col span={20}>
                                <Text style={{ fontSize: '14px', color: '#262626' }}>{note || '-'}</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default TrackingInfoCard;
