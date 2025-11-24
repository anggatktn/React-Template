import React from 'react';
import { Layout, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { key: 'orders', label: 'Orders', path: '/vendor/orders' },
        { key: 'history', label: 'History', path: '/vendor/history' },
        { key: 'faq', label: 'FAQ', path: '/vendor/faq' },
        { key: 'contact', label: 'Contact', path: '/vendor/contact' },
    ];

    return (
        <Header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white',
            padding: '8px 24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            height: '50px',
            position: 'sticky',
            top: 20,
            zIndex: 1000,
            margin: '0 auto',
            borderRadius: '40px',
            width: '100%',
            maxWidth: '1200px',
            left: 0,
            right: 0
        }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
                <img src="/images/rfid-logo.svg" alt="Logo" />
            </div>

            <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                justifyContent: 'center',
                gap: '32px'
            }}>
                {items.map(item => {
                    const isActive = location.pathname.startsWith(item.path) || (item.key === 'orders' && location.pathname === '/vendor');
                    return (
                        <div
                            key={item.key}
                            onClick={() => navigate(item.path)}
                            style={{
                                color: isActive ? '#265CD7' : '#000',
                                fontWeight: 500,
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar size="large" icon={<UserOutlined />} src="https://joesch.moe/api/v1/random" />
            </div>
        </Header>
    );
};

export default Navbar;