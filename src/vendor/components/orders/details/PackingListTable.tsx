import React from 'react';
import { Table, Button, Card, Typography, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BarcodeOutlined } from '@ant-design/icons'; // Placeholder for barcode image

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
}

interface PackingListProps {
    items: PackingListItem[];
}

const PackingListTable: React.FC<PackingListProps> = ({ items }) => {
    const columns: ColumnsType<PackingListItem> = [
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
                // In a real app, use <img src={record.barcodeUrl} />
                // Using a visual placeholder to match the "strip" look in your design
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
            ellipsis: true, // Truncate long text
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
            render: (text) => <Text type="secondary" style={{ fontSize: '12px' }}>{text}</Text>,
        },
    ];

    // The buttons that appear on the top right of the card
    const headerActions = (
        <Space>
            <Button style={{ borderColor: '#1890ff', color: '#1890ff' }}>
                Download Shipping Label
            </Button>
            <Button style={{ borderColor: '#1890ff', color: '#1890ff', background: '#e6f7ff' }}>
                Download Packing List
            </Button>
        </Space>
    );

    return (
        <Card
            title="Packing List"
            bordered={false}
            extra={headerActions}
            style={{ borderRadius: 8, marginBottom: 24, width: '100%' }}
            bodyStyle={{ padding: 0 }} // Remove padding for edge-to-edge table
        >
            <Table
                columns={columns}
                dataSource={items}
                pagination={false}
                rowKey="key"
            />
        </Card>
    );
};

export default PackingListTable;