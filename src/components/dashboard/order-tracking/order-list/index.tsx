import React from 'react';
import OrderCard, { type Order } from '../order-card';
import { Empty } from 'antd';

interface OrderListProps {
    orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
    if (orders.length === 0) {
        return <Empty description="No orders found" />;
    }

    return (
        <div style={{ width: '100%' }}>
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
};

export default OrderList;
