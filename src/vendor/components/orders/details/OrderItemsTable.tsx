import React from 'react';
import { Table, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';



interface OrderItem {
    key: string;
    product: string;
    sku: string;
    qty: number;
    price: number;
    total: number;
}

interface OrderItemsTableProps {
    items: OrderItem[];
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ items }) => {
    const columns: ColumnsType<OrderItem> = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (text, record) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{text}</div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>SKU: {record.sku}</div>
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price.toFixed(2)}`,
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => <span style={{ fontWeight: 600 }}>${total.toFixed(2)}</span>,
        },
    ];

    return (
        <Card title="Order Items" bordered={false} style={{ marginBottom: 24, borderRadius: 8 }}>
            <Table
                columns={columns}
                dataSource={items}
                pagination={false}
                rowKey="key"
            />
        </Card>
    );
};

export default OrderItemsTable;
