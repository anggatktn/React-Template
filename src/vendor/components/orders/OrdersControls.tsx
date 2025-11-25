import React from 'react';
import { Input, Segmented, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classes from './OrdersControls.module.less';

const { Text } = Typography;

interface OrdersControlsProps {
    sortOrder: string;
    searchQuery: string;
    totalItems: number;
    onSortChange: (value: string | number) => void;
    onSearchChange: (value: string) => void;
}

const OrdersControls: React.FC<OrdersControlsProps> = ({
    sortOrder,
    searchQuery,
    totalItems,
    onSortChange,
    onSearchChange
}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '20px',
            paddingBottom: '20px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Text
                    style={{
                        fontSize: '14px',
                        fontWeight: 600
                    }}
                >Sort by</Text>
                <Segmented
                    options={[
                        { label: 'Recent', value: 'recent' },
                        { label: 'Oldest', value: 'oldest' }
                    ]}
                    shape="round"
                    className={classes["custom-segmented"]}
                    onChange={onSortChange}
                    value={sortOrder}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Text
                    style={{
                        color: '#666',
                        fontSize: '14px',
                        fontWeight: 600
                    }}
                >
                    <Text strong>Total items:</Text> {totalItems}
                </Text>
                <Input
                    placeholder="Search SSN, Order ID..."
                    prefix={<SearchOutlined style={{
                        color: '#bfbfbf',
                        marginRight: '8px'
                    }} />}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        width: '280px',
                        borderRadius: '8px',
                        height: '40px'
                    }}
                />
            </div>
        </div>
    );
};

export default OrdersControls;
