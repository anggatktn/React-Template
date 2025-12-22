import React, { useState, useEffect } from 'react';
import { Typography, Spin } from 'antd';
import OrdersTable from '../../components/orders/OrdersTable';
import OrdersControls from '../../components/orders/OrdersControls';
import classes from '../orders/index.module.less';
import { vendorOrderService, type Order } from '../../../services/vendor.service-base';
import MenuLayout from '../../../components/layout/top-bar-menu/MenuLayout';
import { VendorMenu } from '../../../components/layout/top-bar-menu/vendor-menu';
import { UserType } from '../../../services/models/user-type';

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
            if (response.data) {
                setOrders(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch history orders', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MenuLayout selectedMenu={VendorMenu.History} activeUserType={UserType.Vendor}>
            <div className={classes.pageContainer}>
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
            </div>
        </MenuLayout>
    );
};

export default VendorHistoryPage;
