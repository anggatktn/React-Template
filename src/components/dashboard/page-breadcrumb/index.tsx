import React from 'react';
import { Breadcrumb } from 'antd';
import { LeftCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    onClick?: () => void;
    isActive?: boolean;
}

interface PageBreadcrumbProps {
    items: BreadcrumbItem[];
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({ items }) => {
    const navigate = useNavigate();

    return (
        <Breadcrumb
            style={{
                marginBottom: '24px',
                alignItems: 'center',
            }}
            items={items.map((item, index) => ({
                title: index === 0 ? (
                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                            cursor: item.onClick ? 'pointer' : 'default'
                        }}
                        onClick={item.onClick || (() => navigate(-1))}
                    >
                        <LeftCircleFilled
                            style={{
                                marginRight: '8px',
                                color: '#1677ff',
                                fontSize: '20px',
                            }}
                        />
                        <span
                            style={{
                                color: '#1677ff',
                            }}
                        >
                            {item.label}
                        </span>
                    </div>
                ) : (
                    <span
                        style={{
                            fontWeight: item.isActive ? 700 : 400,
                            color: item.isActive ? '#1677ff' : '#595959',
                            cursor: item.onClick ? 'pointer' : 'default'
                        }}
                        onClick={item.onClick}
                    >
                        {item.label}
                    </span>
                ),
            }))}
        />
    );
};

export default PageBreadcrumb;
