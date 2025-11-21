import type { PackingListItem } from '../../../components/orders/details/PackingListTable';
import { newOrdersData, readyToShipData, selfCollectionData } from '../data';

const allOrders = [
    ...newOrdersData,
    ...readyToShipData,
    ...selfCollectionData
];

export const getMockOrderData = (orderId?: string) => {
    const cleanId = orderId?.replace('#', '') || '0020251001';

    const order = allOrders.find(o => o.orderId.replace('#', '') === cleanId);

    if (!order) {
        return {
            id: cleanId,
            date: 'Oct 25, 2025, 10:10am',
            status: 'Update Shipping Cost',
            itemCount: 3,
            amountPaid: 1390.00,
            shipmentPaid: null,
            deliveryAddress: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 876543.',
            contactPerson: 'John Doe',
            contactPhone: '+65 98765432',
            deliveryNote: 'Please attempt to delivery during weekdays.'
        };
    }

    return {
        id: order.orderId.replace('#', ''),
        date: order.date,
        status: order.status,
        itemCount: Math.floor(order.totalQty / 100), // Estimate based on totalQty
        amountPaid: order.totalQty * 0.50, // Mock calculation
        shipmentPaid: order.status === 'Awaiting Shipment Payment' ? null : 50.00,
        deliveryAddress: `123 Main Street, ${order.deliverTo}`,
        contactPerson: 'John Doe',
        contactPhone: '+65 98765432',
        deliveryNote: `${order.deliveryType} - Please attempt delivery during weekdays.`
    };
};

export const mockPackingListItems: PackingListItem[] = [
    {
        key: '1',
        sn: '01',
        ssn: '1234567890',
        layout: 'Large Font',
        description: 'Morbi quis elit condimentum, faucibus eros non...',
        size: 'M',
        quantity: 300,
        epcStart: '5354250000000001000000104110',
        epcEnd: '5354250000000001000000104410'
    },
    {
        key: '2',
        sn: '02',
        ssn: '1234567890',
        layout: 'Standard',
        description: 'Morbi quis elit condimentum, faucibus eros non...',
        size: 'M',
        quantity: 300,
        epcStart: '5354250000000001000000104110',
        epcEnd: '5354250000000001000000104410'
    },
    {
        key: '3',
        sn: '03',
        ssn: '1234567890',
        layout: 'Standard',
        description: 'Morbi quis elit condimentum, faucibus eros non...',
        size: 'M',
        quantity: 300,
        epcStart: '5354250000000001000000104110',
        epcEnd: '5354250000000001000000104410'
    },
    {
        key: '4',
        sn: '04',
        ssn: '1234567890',
        layout: 'Large Font',
        description: 'Morbi quis elit condimentum, faucibus eros non...',
        size: 'M',
        quantity: 300,
        epcStart: '5354250000000001000000104110',
        epcEnd: '5354250000000001000000104410'
    },
];

export const mockCustomerData = {
    vendorCode: '0000567',
    customerName: 'John Doe',
    companyName: 'Gear Turf Technology Pte Ltd',
    companyUEN: '201525201Z',
    companyEmail: 'johndoe@gtt.org',
    customerMobile: '+65 98765432',
    companyAddress: '1 Beach road, Singapore 190001.'
};

export const mockDeliveryData = {
    deliverTo: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 876543.',
    contactPerson: 'John Doe',
    contactMobile: '+65 98765432',
    deliveryNote: 'Please attempt to delivery during weekdays.'
};
