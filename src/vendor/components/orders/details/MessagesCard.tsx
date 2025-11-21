import React from 'react';
import { Card, Input, Button, Avatar, Typography } from 'antd';
import { SendOutlined, ExpandAltOutlined } from '@ant-design/icons';

const { Text } = Typography;

const MessagesCard: React.FC = () => {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', marginTop: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Messages</Typography.Title>
                <ExpandAltOutlined style={{ color: '#1890ff', cursor: 'pointer' }} />
            </div>
            <Card
                bordered={false}
                style={{ borderRadius: 8, flex: 1 }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}
            >

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>Oct 25, 2025, 10:10am</Text>
                    </div>


                    <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                        <div style={{ background: '#f5f7fa', padding: '12px 16px', borderRadius: '0 12px 12px 12px', maxWidth: '85%' }}>
                            <Text>How long will you take to ship the product?</Text>
                            <div style={{ marginTop: 4 }}>
                                <Text type="secondary" style={{ fontSize: '10px' }}>10:10am</Text>
                            </div>
                        </div>
                    </div>


                    <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                        <div style={{ background: '#f5f7fa', padding: '12px 16px', borderRadius: '12px 0 12px 12px', maxWidth: '85%', position: 'relative' }}>
                            <Text>We will ship it as soon as we receive the shipment payment.</Text>
                            <div style={{ position: 'absolute', right: -4, top: -8, background: '#e6f7ff', color: '#1890ff', padding: '1px 6px', borderRadius: 4, fontSize: '10px', border: '1px solid #91d5ff' }}>CN</div>
                            <div style={{ marginTop: 4, textAlign: 'right' }}>
                                <Text type="secondary" style={{ fontSize: '10px' }}>10:12am</Text>
                            </div>
                        </div>
                    </div>
                </div>


                <div style={{
                    background: '#f5f7fa',
                    borderRadius: '8px',
                    padding: '4px 4px 4px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 'auto'
                }}>
                    <Input
                        placeholder="Type your message..."
                        bordered={false}
                        style={{ padding: 0, background: 'transparent' }}
                    />
                    <Button type="primary" icon={<SendOutlined />} style={{ borderRadius: '6px' }}>
                        Send
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default MessagesCard;