import React, { useState } from 'react';
import { Typography, Tabs } from 'antd';
import MenuLayout, { TopBarMenu } from '../../../components/layout/menu-layout';
import FilterBar from '../../../components/dashboard/order-tracking/filter-bar';
import OrderList from '../../../components/dashboard/order-tracking/order-list';
import { type Order } from '../../../components/dashboard/order-tracking/order-card';

const { Title } = Typography;

// Mock Data
const mockOrders: Order[] = [
    {
        id: '#0020251001',
        date: 'Oct 25, 2025, 10:10am',
        itemsCount: 2,
        shippingMode: 'Door step delivery',
        status: 'Order Placed',
        deliverTo: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 576543.',
        contactPerson: 'John Doe',
        contactNumber: '+65 98765432',
        deliveryNote: 'Please attempt to delivery during weekdays.'
    },
    {
        id: '#0020251002',
        date: 'Oct 25, 2025, 10:10am',
        itemsCount: 2,
        shippingMode: 'Door step delivery',
        status: 'Order Placed',
        deliverTo: '94 Jalan Besar 31000 Batu Gajah Perak Malaysia',
        contactPerson: 'John Doe',
        contactNumber: '+65 98765432',
        deliveryNote: '-'
    },
    {
        id: '#0020251003',
        date: 'Oct 25, 2025, 10:10am',
        itemsCount: 2,
        shippingMode: 'Door step delivery',
        status: 'Pending Shipment Acceptance',
        deliverTo: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 576543.',
        contactPerson: 'John Doe',
        contactNumber: '+65 98765432',
        deliveryNote: 'Please attempt to delivery during weekdays.'
    },
    {
        id: '#0020251004',
        date: 'Oct 26, 2025, 10:10am',
        itemsCount: 2,
        shippingMode: 'Door step delivery',
        status: 'Packing Order',
        deliverTo: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 576543.',
        contactPerson: 'John Doe',
        contactNumber: '+65 98765432',
        deliveryNote: 'Please attempt to delivery during weekdays.'
    },
    {
        id: '#0020251005',
        date: 'Oct 25, 2025, 10:10am',
        itemsCount: 2,
        shippingMode: 'Door step delivery',
        status: 'Order Shipped',
        deliverTo: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 576543.',
        contactPerson: 'John Doe',
        contactNumber: '+65 98765432',
        deliveryNote: 'Please attempt to delivery during weekdays.'
    },
    {
        id: '#0020251006',
        date: 'Oct 26, 2025, 10:10am',
        itemsCount: 2,
        shippingMode: 'Door step delivery',
        status: 'Order Delivered',
        deliverTo: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 576543.',
        contactPerson: 'John Doe',
        contactNumber: '+65 98765432',
        deliveryNote: 'Please attempt to delivery during weekdays.'
    },
    {
        id: '#0020251007',
        date: 'Oct 26, 2025, 10:10am',
        itemsCount: 2,
        shippingMode: 'Door step delivery',
        status: 'Ready to Collect',
        deliverTo: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 576543.',
        contactPerson: 'John Doe',
        contactNumber: '+65 98765432',
        deliveryNote: 'Please attempt to delivery during weekdays.'
    },
    {
        id: '#0020251008',
        date: 'Oct 26, 2025, 10:10am',
        itemsCount: 2,
        shippingMode: 'Door step delivery',
        status: 'Collected',
        deliverTo: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 576543.',
        contactPerson: 'John Doe',
        contactNumber: '+65 98765432',
        deliveryNote: 'Please attempt to delivery during weekdays.'
    }
];

const OrderTrackingPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('live');
    const [, setSort] = useState('sn'); // Ignore unused sort value
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    // Filter logic (mock)
    const filteredOrders = mockOrders.filter(order => {
        // Tab filter
        if (activeTab === 'live' && ['Order Delivered', 'Collected'].includes(order.status)) return false;
        if (activeTab === 'history' && !['Order Delivered', 'Collected'].includes(order.status)) return false;

        // Status filter
        if (filter === 'payment_required' && order.status !== 'Pending Payment') return false;
        if (filter === 'self_collection' && order.shippingMode !== 'Self Collection') return false;

        // Search filter
        if (search && !order.id.toLowerCase().includes(search.toLowerCase())) return false;

        return true;
    });

    const items = [
        {
            key: 'live',
            label: 'Live Orders',
            children: (
                <>
                    <FilterBar
                        totalItems={filteredOrders.length}
                        onSortChange={setSort}
                        onFilterChange={setFilter}
                        onSearch={setSearch}
                    />
                    <OrderList orders={filteredOrders} />
                </>
            ),
        },
        {
            key: 'history',
            label: 'Orders History',
            children: (
                <>
                    <FilterBar
                        totalItems={filteredOrders.length}
                        onSortChange={setSort}
                        onFilterChange={setFilter}
                        onSearch={setSearch}
                    />
                    <OrderList orders={filteredOrders} />
                </>
            ),
        },
    ];

    return (
        <MenuLayout selectedMenu={TopBarMenu.OrderTracking}>
            <div style={{
                width: "100%",
                minHeight: '100vh',
                padding: "0px 10px 100px 10px",
                backgroundColor: '#f5f5f5', // Match background color
            }}>
                <Title level={2} style={{ margin: '0 0 24px 0', fontWeight: 600 }}>
                    Order Tracking
                </Title>

                <Tabs
                    defaultActiveKey="live"
                    items={items}
                    onChange={setActiveTab}
                    tabBarStyle={{ marginBottom: 24 }}
                />
            </div>
        </MenuLayout>
    );
};

export default OrderTrackingPage;
