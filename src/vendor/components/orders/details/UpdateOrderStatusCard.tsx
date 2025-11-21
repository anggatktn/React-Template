import React, { useState } from 'react';
import { Card, Button, message, Typography } from 'antd';

interface UpdateOrderStatusCardProps {
    onAction: () => void;
    buttonText: string;
    successMessage: string;
}

const UpdateOrderStatusCard: React.FC<UpdateOrderStatusCardProps> = ({ onAction, buttonText, successMessage }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            onAction();
            setLoading(false);
            message.success(successMessage);
        }, 1000);
    };
    return (
        <div style={{ marginBottom: 24 }}>
            <Typography.Title level={4} style={{ marginBottom: 16, marginTop: 30 }}>Update Order Status</Typography.Title>
            <Card
                bordered={false}
                style={{ borderRadius: 8, width: '100%', background: 'transparent', boxShadow: 'none' }}
                bodyStyle={{ padding: 0 }}
            >
                <Button
                    type="primary"
                    size="large"
                    onClick={handleClick}
                    loading={loading}
                    style={{ fontWeight: 600, paddingLeft: 32, paddingRight: 32 }}
                >
                    {buttonText}
                </Button>
            </Card>
        </div>
    );
};

export default UpdateOrderStatusCard;
