import React, { useState } from 'react';
import { Card, Button, message } from 'antd';

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
        <Card
            title="Update Order Status"
            bordered={false}
            style={{ borderRadius: 8, marginBottom: 24, width: '100%', background: 'transparent', boxShadow: 'none' }}
            bodyStyle={{ padding: '24px' }}
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
    );
};

export default UpdateOrderStatusCard;
