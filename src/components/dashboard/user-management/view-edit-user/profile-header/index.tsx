import React from 'react';
import { Button, Tabs } from 'antd';

interface ProfileHeaderProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    onAddDeliveryAddress: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    activeTab,
    onTabChange,
    onAddDeliveryAddress
}) => {
    const items = [
        {
            key: 'business',
            label: 'Business Profile',
        },
        {
            key: 'delivery',
            label: 'Delivery Addresses',
        },
    ];

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
        }}>
            <Tabs
                activeKey={activeTab}
                items={items}
                onChange={onTabChange}
                tabBarStyle={{
                    width: '100%',
                    marginBottom: 0,
                }}
                style={{
                    width: '100%',
                }}
            />
        </div>
    );
};

export default ProfileHeader;
