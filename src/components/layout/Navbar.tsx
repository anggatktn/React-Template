import React from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const Navbar: React.FC = () => {
    const items = [
        { key: 'orders', label: 'Orders' },
        { key: 'history', label: 'History' },
        { key: 'faq', label: 'FAQ' },
        { key: 'contact', label: 'Contact' },
    ];

    return (
        <Header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white',
            padding: '0 20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            height: '64px',
            position: 'sticky',
            top: 20,
            zIndex: 1000,
            margin: '0 auto',
            borderRadius: '50px',
            width: '90%',
            left: 0,
            right: 0
        }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
                <Title level={4} style={{ margin: 0, textTransform: 'uppercase', fontSize: '16px', fontWeight: 800 }}>
                    GEAR TURF TECHNOLOGY
                </Title>
            </div>

            <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['orders']}
                    items={items}
                    style={{
                        minWidth: '300px',
                        justifyContent: 'center',
                        borderBottom: 'none',
                        fontSize: '14px',
                        fontWeight: 500,
                        background: 'transparent'
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar size="large" icon={<UserOutlined />} src="https://joesch.moe/api/v1/random" />
            </div>
        </Header>
    );
};

export default Navbar;
