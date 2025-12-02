import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, message } from 'antd';
import ConfirmationDialog from './ConfirmationDialog';

const { Text, Title } = Typography;

interface SelfCollectionCardProps {
    onMarkReady?: () => void;
    statusText?: string;
    statusColor?: string;
    showAction?: boolean;
    proofOfCollection?: string;
    remarks?: string;
}

const SelfCollectionCard: React.FC<SelfCollectionCardProps> = ({
    onMarkReady,
    statusText = 'Update Self Collection Status',
    statusColor = '#1551A0',
    showAction = true,
    proofOfCollection,
    remarks
}) => {
    const [loading, setLoading] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const handleMarkReadyClick = () => {
        setIsConfirmationOpen(true);
    };

    const handleConfirmMarkReady = () => {
        if (onMarkReady) {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                onMarkReady();
                setLoading(false);
                setIsConfirmationOpen(false);
            }, 1000);
        } else {
            setIsConfirmationOpen(false);
        }
    };

    const handleCancelConfirmation = () => {
        setIsConfirmationOpen(false);
    };

    return (
        <div style={{ marginBottom: 24 }}>
            <Title level={4} style={{ marginBottom: 16, marginTop: 30 }}>Self Collection Detail</Title>
            <Card
                bordered={false}
                style={{ borderRadius: 8, width: '100%' }}
                bodyStyle={{ padding: '24px' }}
            >
                <Row gutter={[24, 16]}>
                    <Col span={12}>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={8}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Collect by</Text>
                            </Col>
                            <Col span={16}>
                                <Text style={{ color: '#595959' }}>-</Text>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={8}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Status</Text>
                            </Col>
                            <Col span={16}>
                                <Text strong style={{ color: statusColor }}>{statusText}</Text>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={8}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Self Collection at</Text>
                            </Col>
                            <Col span={16}>
                                <Text style={{ color: '#595959' }}>
                                    浙江省杭州市余杭区余杭街道菜鸟总部 310000.
                                    <br />
                                    <br />
                                    Building 1, No. 380 Fengxin Road, Yuhang District, Hangzhou, Zhejiang, 310000, China.
                                </Text>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={12}>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={8}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Remarks</Text>
                            </Col>
                            <Col span={16}>
                                <Text style={{ color: '#595959' }}>{remarks || '-'}</Text>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col span={8}>
                                <Text style={{ color: '#262626', fontWeight: 600 }}>Proof of Collection</Text>
                            </Col>
                            <Col span={16}>
                                {proofOfCollection ? (
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        border: '1px solid #d9d9d9',
                                        borderRadius: '8px',
                                        padding: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#fafafa'
                                    }}>
                                        <img
                                            src={proofOfCollection}
                                            alt="Proof of Collection"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <Text style={{ color: '#595959' }}>-</Text>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {showAction && (
                    <div style={{ marginTop: 24 }}>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleMarkReadyClick}
                            loading={loading}
                            style={{ width: '300px', height: '40px', fontWeight: 600, borderRadius: '6px' }}
                        >
                            Mark it Ready for Collection
                        </Button>
                    </div>
                )}
            </Card>

            <ConfirmationDialog
                open={isConfirmationOpen}
                onConfirm={handleConfirmMarkReady}
                onCancel={handleCancelConfirmation}
                title="Confirm Update Order Status?"
                loading={loading}
            />
        </div>
    );
};

export default SelfCollectionCard;
