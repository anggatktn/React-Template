import React, { useState } from 'react';
import { Card, Button, Typography, Upload, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface UploadPhotoCardProps {
    onUpdateStatus: (file: File | null) => void;
}

const UploadPhotoCard: React.FC<UploadPhotoCardProps> = ({ onUpdateStatus }) => {
    const [fileList, setFileList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        fileList,
        showUploadList: false, // Hide default list
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
                return Upload.LIST_IGNORE;
            }
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                message.error('Image must smaller than 10MB!');
                return Upload.LIST_IGNORE;
            }
            setFileList([file]);
            return false; // Prevent auto upload
        },
    };

    const handleRemove = () => {
        setFileList([]);
    };

    const handleUpdate = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const file = fileList.length > 0 ? fileList[0] : null;
            onUpdateStatus(file);
            setLoading(false);
            message.success('Status updated to Delivered');
        }, 1000);
    };

    const imagePreview = fileList.length > 0 ? (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
                width: '300px',
                height: '160px',
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fafafa'
            }}>
                <img
                    src={URL.createObjectURL(fileList[0])}
                    alt="preview"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                    }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px' }}>
                <Text style={{ color: '#262626', fontSize: '14px', maxWidth: '200px' }} ellipsis>
                    {fileList[0].name}
                </Text>
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={handleRemove}
                    style={{
                        padding: 0,
                        height: 'auto',
                        textAlign: 'left',
                        width: 'fit-content'
                    }}
                >
                    Delete
                </Button>
            </div>
        </div>
    ) : (
        <div style={{ width: '300px' }}>
            <Dragger {...props} style={{ background: '#F5F7FA', border: '1px dashed #D9D9D9', borderRadius: '8px' }}>
                <div style={{ padding: '20px 0' }}>
                    <p className="ant-upload-text" style={{ fontSize: '14px', color: '#262626', marginBottom: 8 }}>
                        Drag and drop image here
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
                        <UploadOutlined style={{ color: '#2563EB' }} />
                        <span style={{ color: '#2563EB', fontWeight: 500 }}>Upload Image</span>
                    </div>
                    <p className="ant-upload-hint" style={{ color: '#8c8c8c', fontSize: '12px' }}>
                        JPG or PNG, file size no more than 10MB
                    </p>
                </div>
            </Dragger>
        </div>
    );

    return (
        <div style={{ marginBottom: 24 }}>
            <Title level={4} style={{ marginBottom: 16, marginTop: 30 }}>Update Status</Title>
            <Card
                bordered={false}
                style={{ borderRadius: 8, width: '100%' }}
                bodyStyle={{ padding: '24px' }}
            >
                <div style={{ marginBottom: 24 }}>
                    <Text strong style={{ display: 'block', marginBottom: 8, fontSize: '14px', color: '#262626' }}>
                        Proof of Delivery <span style={{ color: '#8c8c8c', fontWeight: 400 }}>(Optional)</span>
                    </Text>
                    {imagePreview}
                </div>

                <Button
                    type="primary"
                    onClick={handleUpdate}
                    loading={loading}
                    style={{
                        height: '40px',
                        backgroundColor: '#2563EB',
                        fontWeight: 600,
                        width: '240px'
                    }}
                >
                    Update Status as Delivered
                </Button>
            </Card>
        </div>
    );
};

export default UploadPhotoCard;
