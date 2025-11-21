import React from 'react';
import { Table, Button, Card, Typography, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

export interface PackingListItem {
    key: string;
    sn: string;
    ssn: string;
    layout: string;
    description: string;
    size: string;
    quantity: number;
    epcStart: string;
    epcEnd?: string;
}

interface PackingListProps {
    items: PackingListItem[];
}

const PackingListTable: React.FC<PackingListProps> = ({ items }) => {
    const baseColumns: ColumnsType<PackingListItem> = [
        {
            title: 'S/N',
            dataIndex: 'sn',
            key: 'sn',
            width: 60,
            render: (text) => <Text type="secondary">{text}</Text>,
        },
        {
            title: 'Barcode',
            key: 'barcode',
            width: 100,
            render: () => (
                <div style={{
                    width: '60px',
                    height: '20px',
                    background: `repeating-linear-gradient(
                        90deg,
                        #000,
                        #000 2px,
                        #fff 2px,
                        #fff 4px
                    )`,
                    opacity: 0.6
                }} />
            ),
        },
        {
            title: 'SSN',
            dataIndex: 'ssn',
            key: 'ssn',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Layout',
            dataIndex: 'layout',
            key: 'layout',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            width: 60,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
        },
        {
            title: 'EPC-Start',
            dataIndex: 'epcStart',
            key: 'epcStart',
            render: (text) => <Text type="secondary" style={{ fontSize: '14px' }}>{text}</Text>,
        },
        {
            title: 'EPC-End',
            dataIndex: 'epcEnd',
            key: 'epcEnd',
            render: (text) => <Text type="secondary" style={{ fontSize: '14px' }}>{text || '-'}</Text>,
        },
    ];

    const columns = baseColumns.map((col) => ({
        ...col,
        onHeaderCell: () => ({
            style: {
                backgroundColor: '#E5EAF0',
                borderBottom: '1px solid #d9d9d9',
                fontWeight: 600
            },
        }),
    }));

    const headerActions = (
        <Space size={12}>
            <Button style={{
                borderColor: '#265CD7',
                borderWidth: '1px',
                color: '#265CD7',
                background: '#ECF2FF',
                borderRadius: '6px',
                padding: '15px 25px',
                height: 'auto',
                fontSize: '15px',
                fontWeight: '700',
                boxShadow: '0px 0px 4px 0px rgba(106, 77, 187, 0.12)'
            }}>
                Download Shipping Label
            </Button>
            <Button style={{
                borderColor: '#265CD7',
                borderWidth: '1px',
                color: '#265CD7',
                background: '#ECF2FF',
                borderRadius: '6px',
                padding: '15px 25px',
                height: 'auto',
                fontSize: '15px',
                fontWeight: '700',
                boxShadow: '0px 0px 4px 0px rgba(106, 77, 187, 0.12)'
            }}>
                Download Packing List
            </Button>
        </Space>
    );

    return (
        <div style={{ marginBottom: 24, marginTop: 50 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Packing List</Typography.Title>
                {headerActions}
            </div>
            <Card
                bordered={false}
                style={{ borderRadius: 8, width: '100%' }}
                bodyStyle={{ padding: 0 }}
            >
                <Table
                    columns={columns}
                    dataSource={items}
                    pagination={false}
                    rowKey="key"
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    );
};

export default PackingListTable;