import React, { useState } from 'react';
import { Layout, Tabs, Input, Radio, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Navbar from '../../../components/layout/Navbar';
import OrdersTable from '../../components/orders/OrdersTable';
import { newOrdersData, readyToShipData, selfCollectionData } from './data';
import classes from './index.module.less';

const { Content } = Layout;
const { Title, Text } = Typography;

const OrdersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('2'); // Default to Ready to Ship as per image
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent');

    const parseDate = (dateStr: string) => {
        // Format: "Oct 25, 2025, 10:10am"
        // Remove commas and split
        const cleanStr = dateStr.replace(/,/g, '');
        const parts = cleanStr.split(' ');
        // parts: [Month, Day, Year, Time] -> ["Oct", "25", "2025", "10:10am"]

        if (parts.length < 4) return 0;

        const monthMap: { [key: string]: number } = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };

        const month = monthMap[parts[0]];
        const day = parseInt(parts[1]);
        const year = parseInt(parts[2]);

        // Parse time "10:10am"
        const timePart = parts[3];
        const isPM = timePart.toLowerCase().includes('pm');
        const timeStr = timePart.toLowerCase().replace('am', '').replace('pm', '');
        const [hoursStr, minutesStr] = timeStr.split(':');
        let hours = parseInt(hoursStr);
        const minutes = parseInt(minutesStr);

        if (isPM && hours < 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;

        return new Date(year, month, day, hours, minutes).getTime();
    };

    const processData = (data: any[]) => {
        let processed = [...data];

        // Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            processed = processed.filter(order =>
                order.orderId.toLowerCase().includes(query) ||
                order.totalSsn.toLowerCase().includes(query) ||
                order.deliverTo.toLowerCase().includes(query)
            );
        }

        // Sort
        processed.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
        });

        return processed;
    };

    const renderTabContent = (data: any[]) => {
        const processedData = processData(data);

        return (
            <>
                <div className={classes.controls}>
                    <div className={classes.sortControls}>
                        <Text strong>Sort by</Text>
                        <Radio.Group
                            value={sortOrder}
                            onChange={e => setSortOrder(e.target.value)}
                            buttonStyle="solid"
                        >
                            <Radio.Button value="recent">Recent</Radio.Button>
                            <Radio.Button value="oldest">Oldest</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className={classes.searchControls}>
                        <Text strong>Total items {processedData.length}</Text>
                        <Input
                            placeholder="Search SSN, Order ID..."
                            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                            style={{ width: 300, borderRadius: '6px' }}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <OrdersTable data={processedData} />
            </>
        );
    };

    const items = [
        {
            key: '1',
            label: 'New Orders',
            children: renderTabContent(newOrdersData),
        },
        {
            key: '2',
            label: 'Ready to Ship',
            children: renderTabContent(readyToShipData),
        },
        {
            key: '3',
            label: 'Self Collection',
            children: renderTabContent(selfCollectionData),
        },
    ];

    return (
        <Layout>
            <Navbar />
            <Content className={classes.pageContainer}>
                <div className={classes.header}>
                    <Title level={2} className={classes.title}>Orders</Title>
                </div>

                <Tabs
                    activeKey={activeTab}
                    items={items}
                    onChange={setActiveTab}
                    size="large"
                    tabBarStyle={{ marginBottom: 0, borderBottom: '1px solid #e8e8e8' }}
                />
            </Content>
        </Layout>
    );
};

export default OrdersPage;
