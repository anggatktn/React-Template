import React from 'react';
import { Button, Typography } from 'antd';

const { Title } = Typography;

interface UserListHeaderProps {
    onAddUser: () => void;
}

const UserListHeader: React.FC<UserListHeaderProps> = ({ onAddUser }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Title level={2} style={{ margin: 0, fontWeight: 600 }}>
                User Management
            </Title>
            <Button
                type="primary"
                size="large"
                onClick={onAddUser}
                style={{
                    borderRadius: '8px',
                    height: '40px',
                    padding: '0 32px',
                    fontSize: '15px',
                    fontWeight: 500
                }}
            >
                Add User
            </Button>
        </div>
    );
};

export default UserListHeader;
