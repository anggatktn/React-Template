import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Typography, Spin } from 'antd';
import Navbar from '../../../components/layout/Navbar';
import OrdersTable from '../../components/orders/OrdersTable';
import OrdersControls from '../../components/orders/OrdersControls';
import classes from './index.module.less';
import { vendorOrderService, type Order } from '../../../services/vendor.service-base';

const { Content } = Layout;
const { Title } = Typography;

const OrdersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('2'); // Default to Ready to Ship
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, [activeTab, searchQuery, sortOrder]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await vendorOrderService.getOrders({
                status: activeTab,
                search: searchQuery,
                sortBy: sortOrder
            });
            if (response.success) {
                setOrders(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    const renderTabContent = () => {
        if (loading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                    <Spin size="large" />
                </div>
            );
        }

        return (
            <>
                <OrdersControls
                    sortOrder={sortOrder}
                    searchQuery={searchQuery}
                    totalItems={orders.length}
                    onSortChange={(value) => setSortOrder(value as 'recent' | 'oldest')}
                    onSearchChange={setSearchQuery}
                />
                <OrdersTable data={orders} />
            </>
        );
    };

    const items = [
        {
            key: '1',
            label: 'New Orders',
            children: renderTabContent(),
        },
        {
            key: '2',
            label: 'Ready to Ship',
            children: renderTabContent(),
        },
        {
            key: '3',
            label: 'Self Collection',
            children: renderTabContent(),
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
                    tabBarStyle={{ marginBottom: 0 }}
                />
            </Content>
        </Layout>
    );
};

export default OrdersPage;
