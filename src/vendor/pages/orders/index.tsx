import React, { useState, useEffect } from 'react';
import { Tabs, Typography, Spin } from 'antd';
import OrdersTable from '../../components/orders/OrdersTable';
import OrdersControls from '../../components/orders/OrdersControls';
import classes from './index.module.less';
import { vendorOrderService, type Order } from '../../../services/vendor.service-base';
import MenuLayout from '../../../components/layout/top-bar-menu/MenuLayout';
import { VendorMenu } from '../../../components/layout/top-bar-menu/vendor-menu';
import { UserType } from '../../../services/models/user-type';

const { Title } = Typography;

const OrdersPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('2'); // Default to Pending Courier Pickup
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
            if (response.data) {
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
            label: 'Shipments',
            children: renderTabContent(),
        },
        {
            key: '3',
            label: 'Self Collection',
            children: renderTabContent(),
        },
    ];

    return (
        <MenuLayout selectedMenu={VendorMenu.Orders} activeUserType={UserType.Vendor}>
            <div className={classes.pageContainer}>
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
            </div>
        </MenuLayout>
    );
};

export default OrdersPage;
