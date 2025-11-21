export interface Order {
    key: string;
    date: string;
    orderId: string;
    totalSsn: string;
    totalQty: number;
    deliverTo: string;
    deliveryType: string;
    status: string;
}

export const newOrdersData: Order[] = [
    {
        key: '1',
        date: 'Oct 25, 2025, 10:10am',
        orderId: '#0020251001',
        totalSsn: '05',
        totalQty: 2000,
        deliverTo: 'Singapore',
        deliveryType: 'Door Step Delivery',
        status: 'Update Shipping Cost',
    },
    {
        key: '2',
        date: 'Oct 24, 2025, 02:30pm',
        orderId: '#0020251002',
        totalSsn: '12',
        totalQty: 500,
        deliverTo: 'Malaysia',
        deliveryType: 'Door Step Delivery',
        status: 'Awaiting Shipment Payment',
    },
];

export const readyToShipData: Order[] = [
    {
        key: '1',
        date: 'Oct 23, 2025, 09:15am',
        orderId: '#0020250998',
        totalSsn: '08',
        totalQty: 1200,
        deliverTo: 'Indonesia',
        deliveryType: 'Door Step Delivery',
        status: 'Ready to Ship',
    },
    {
        key: '2',
        date: 'Oct 22, 2025, 11:45am',
        orderId: '#0020250995',
        totalSsn: '03',
        totalQty: 150,
        deliverTo: 'Singapore',
        deliveryType: 'Door Step Delivery',
        status: 'Ready to Ship',
    },
    {
        key: '3',
        date: 'Oct 21, 2025, 04:20pm',
        orderId: '#0020250990',
        totalSsn: '15',
        totalQty: 3500,
        deliverTo: 'Thailand',
        deliveryType: 'Door Step Delivery',
        status: 'Order Shipped',
    },
    {
        key: '4',
        date: 'Oct 20, 2025, 01:00pm',
        orderId: '#0020250988',
        totalSsn: '02',
        totalQty: 80,
        deliverTo: 'Vietnam',
        deliveryType: 'Door Step Delivery',
        status: 'Order Shipped',
    },
    {
        key: '5',
        date: 'Oct 19, 2025, 10:00am',
        orderId: '#0020250985',
        totalSsn: '20',
        totalQty: 5000,
        deliverTo: 'Philippines',
        deliveryType: 'Door Step Delivery',
        status: 'Order Shipped',
    },
    {
        key: '6',
        date: 'Oct 18, 2025, 03:30pm',
        orderId: '#0020250980',
        totalSsn: '06',
        totalQty: 600,
        deliverTo: 'Singapore',
        deliveryType: 'Door Step Delivery',
        status: 'Order Delivered',
    },
    {
        key: '7',
        date: 'Oct 17, 2025, 09:00am',
        orderId: '#0020250975',
        totalSsn: '10',
        totalQty: 1000,
        deliverTo: 'Malaysia',
        deliveryType: 'Door Step Delivery',
        status: 'Order Delivered',
    },
];

export const selfCollectionData: Order[] = [
    {
        key: '1',
        date: 'Oct 25, 2025, 05:00pm',
        orderId: '#0020251005',
        totalSsn: '01',
        totalQty: 50,
        deliverTo: 'Warehouse A',
        deliveryType: 'Self Collection',
        status: 'Awaiting Collection',
    },
    {
        key: '2',
        date: 'Oct 24, 2025, 12:00pm',
        orderId: '#0020251000',
        totalSsn: '04',
        totalQty: 200,
        deliverTo: 'Warehouse B',
        deliveryType: 'Self Collection',
        status: 'Order Collected',
    },
    {
        key: '3',
        date: 'Oct 20, 2025, 02:00pm',
        orderId: '#0020250950',
        totalSsn: '02',
        totalQty: 100,
        deliverTo: 'Warehouse A',
        deliveryType: 'Self Collection',
        status: 'Not Collected',
    },
];
