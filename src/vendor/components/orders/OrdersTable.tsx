import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Order } from '../../pages/orders/data';
import { FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import classes from './OrdersTable.module.less';

interface OrdersTableProps {
    data: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ data }) => {
    const navigate = useNavigate();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Update Shipping Cost': return '#DF7021';
            case 'Awaiting Shipment Payment': return '#1590A0';
            case 'Ready to Ship': return '#DF7021';
            case 'Order Shipped': return '#672DB7';
            case 'Order Delivered': return '#3A9448';
            case 'Awaiting Collection': return '#1590A0';
            case 'Order Collected': return '#3A9448';
            case 'Not Collected': return '#CF3030';
            default: return 'default';
        }
    };

    const columns: ColumnsType<Order> = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => <span style={{ color: '#515B6D' }}>{text}</span>,
        },
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Total SSN',
            dataIndex: 'totalSsn',
            key: 'totalSsn',
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
        },
        {
            title: 'Total Qty',
            dataIndex: 'totalQty',
            key: 'totalQty',
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
        },
        {
            title: 'Deliver to',
            dataIndex: 'deliverTo',
            key: 'deliverTo',
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
        },
        {
            title: 'Delivery Type',
            dataIndex: 'deliveryType',
            key: 'deliveryType',
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span style={{
                    color: getStatusColor(status) === 'default' ? 'black' : getStatusColor(status),
                    fontWeight: 600
                }}>
                    {status}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {record.status === 'Order Shipped' && (
                        <FileTextOutlined style={{ color: '#1890ff', fontSize: '18px', cursor: 'pointer' }} />
                    )}
                    <Button
                        type="link"
                        size="small"
                        style={{ fontWeight: 600 }}
                        onClick={() => {
                            const cleanId = String(record.orderId).replace(/#/g, '');
                            navigate(`/vendor/orders/${cleanId}`);
                        }}
                    >
                        View Order
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            style={{ marginTop: '20px', background: 'white', borderRadius: '8px' }}
            className={classes.table}
            rowClassName={(_, index) => index % 2 !== 0 ? classes.stripedRow : ''}
        />
    );
};

export default OrdersTable;
