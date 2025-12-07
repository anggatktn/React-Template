import React, { useState } from 'react';
import { Button, Upload, Typography, Avatar, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Text } = Typography;

interface PhotoUploadProps {
    photo: string;
    onPhotoChange: (photoUrl: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ photo, onPhotoChange }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange = (info: any) => {
        setFileList(info.fileList);

        if (info.file.status === 'done' || info.file.originFileObj) {
            // In a real app, you would upload to a server and get a URL
            const reader = new FileReader();
            reader.onload = (e) => {
                onPhotoChange(e.target?.result as string);
            };
            reader.readAsDataURL(info.file.originFileObj);
        }
    };

    const beforeUpload = () => {
        // Prevent auto upload, we'll handle it manually
        return false;
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px'
        }}>
            <Avatar
                size={100}
                icon={<UserOutlined />}
                src={photo}
                style={{
                    backgroundColor: '#f0f0f0',
                    color: '#bfbfbf'
                }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '8px'
                }}
            >
                <Upload
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    maxCount={1}
                    accept="image/jpeg,image/png"
                    showUploadList={false}
                >
                    <Button
                        type="default"
                        style={{
                            fontSize: '14px',
                            padding: "0 12px",
                            border: "1px solid #265CD7",
                            borderRadius: "8px",
                            color: "#265CD7",
                        }}
                    >
                        Upload new photo
                    </Button>
                </Upload>
                <Text type="secondary" style={{ fontSize: '12px', textAlign: 'start' }}>
                    At least 800 x 800 px recommended<br />
                    JPG or PNG format
                </Text>
            </div>
        </div>
    );
};

export default PhotoUpload;
