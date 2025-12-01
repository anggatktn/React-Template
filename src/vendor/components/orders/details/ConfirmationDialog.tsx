import React from 'react';
import { Modal, Button, Typography } from 'antd';

const { Title } = Typography;

interface ConfirmationDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    loading?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    onConfirm,
    onCancel,
    title,
    loading = false,
}) => {
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            width={400}
            closable={false}
            bodyStyle={{ padding: '5px', textAlign: 'center' }}
        >
            <Title level={4} style={{ marginBottom: 32, marginTop: 8 }}>
                {title}
            </Title>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Button
                    onClick={onCancel}
                    disabled={loading}
                    style={{
                        flex: 1,
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #2563EB',
                        color: '#2563EB',
                        fontWeight: 600,
                        backgroundColor: '#EFF6FF'
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="primary"
                    onClick={onConfirm}
                    loading={loading}
                    style={{
                        flex: 1,
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: '#2563EB',
                        fontWeight: 600
                    }}
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmationDialog;
