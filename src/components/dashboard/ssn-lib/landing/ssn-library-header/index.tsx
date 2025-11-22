import React from 'react';
import { Button, Typography } from 'antd';

const { Title } = Typography;

interface SSNLibraryHeaderProps {
    onAddNew: () => void;
}

const SSNLibraryHeader: React.FC<SSNLibraryHeaderProps> = ({ onAddNew }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Title level={2} style={{ margin: 0, fontWeight: 600 }}>
                SSN Library
            </Title>
            <Button
                type="primary"
                size="large"
                onClick={onAddNew}
                style={{
                    borderRadius: '8px',
                    height: '40px',
                    padding: '0 32px',
                    fontSize: '15px',
                    fontWeight: 500
                }}
            >
                Add new SSN
            </Button>
        </div>
    );
};

export default SSNLibraryHeader;
