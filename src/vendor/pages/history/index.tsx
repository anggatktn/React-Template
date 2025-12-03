import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin } from 'antd';
import Navbar from '../../../components/layout/Navbar';
import OrdersTable from '../../components/orders/OrdersTable';
import OrdersControls from '../../components/orders/OrdersControls';
import classes from '../orders/index.module.less'; // Reusing styles
import { vendorOrderService, type Order } from '../../../services/vendor.service-base';

const { Content } = Layout;
const { Title } = Typography;

const VendorHistoryPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, [searchQuery, sortOrder]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await vendorOrderService.getOrders({
                status: 'history', // Use the new history filter
                search: searchQuery,
                sortBy: sortOrder
            });
            if (response.success) {
                setOrders(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch history orders', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Navbar />
            <Content className={classes.pageContainer}>
                <div className={classes.header}>
                    <Title level={2} className={classes.title}>Order History</Title>
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                        <Spin size="large" />
                    </div>
                ) : (
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
                )}
            </Content>
        </Layout>
    );
};

export default VendorHistoryPage;
