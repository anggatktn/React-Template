import { apiClient, type ApiResponse } from '../utils/api/axios-client';
import { BaseService } from '../utils/base/BaseService';
import { newOrdersData, readyToShipData, selfCollectionData, type Order as MockOrder } from '../vendor/pages/orders/data';
import { getMockOrderData, mockPackingListItems, mockCustomerData } from '../vendor/pages/orders/details/data';

// Types
export interface Order extends MockOrder {
    // Extend or override if needed, but for now we use the mock order type
}

export interface OrderDetail extends Order {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    billingAddress: string;
    shippingAddress: string;
    paymentMethod: string;
    shippingCost: number;
    items: OrderItem[];
    tracking?: {
        status: string;
        updates: {
            date: string;
            status: string;
            location: string;
        }[];
    };
}

export interface OrderItem {
    key: string;
    sn: string;
    barcode?: string;
    ssn: string;
    tagType?: string;
    style?: string;
    color?: string;
    size: string;
    sku?: string;
    price?: number;
    layout?: string;
    description?: string;
    quantity?: number;
    epcStart?: string;
    epcEnd?: string;
}

export interface OrderFilter {
    status?: string;
    search?: string;
    sortBy?: 'recent' | 'oldest';
}

/**
 * Vendor Order Service
 */
export class VendorOrderService extends BaseService {
    private readonly basePath = '/vendor/orders';

    // Combine all mock data
    private allMockOrders: Order[] = [
        ...newOrdersData,
        ...readyToShipData,
        ...selfCollectionData
    ];

    /**
     * Get orders with filtering
     */
    async getOrders(filter: OrderFilter): Promise<ApiResponse<Order[]>> {
        // Fire real API call for visibility
        apiClient.get<Order[]>(this.basePath, { params: filter }).catch(() => { });

        // For now, return mock data
        return this.execute(async () => {
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay

            let filtered = [...this.allMockOrders];

            if (filter.status) {
                // Map tab keys to data source
                // 1: New Orders
                // 2: Ready to Ship
                // 3: Self Collection
                if (filter.status === '1') {
                    filtered = [...newOrdersData];
                } else if (filter.status === '2') {
                    filtered = [...readyToShipData];
                } else if (filter.status === '3') {
                    filtered = [...selfCollectionData];
                }
            }

            if (filter.search) {
                const query = filter.search.toLowerCase();
                filtered = filtered.filter(o =>
                    o.orderId.toLowerCase().includes(query) ||
                    o.deliverTo.toLowerCase().includes(query)
                );
            }

            return {
                data: filtered,
                success: true,
                statusCode: 200
            };
        });
    }

    /**
     * Get order details
     */
    async getOrderDetails(orderId: string): Promise<ApiResponse<OrderDetail>> {
        // Fire real API call for visibility
        apiClient.get<OrderDetail>(`${this.basePath}/${orderId}`).catch(() => { });

        return this.execute(async () => {
            await new Promise(resolve => setTimeout(resolve, 500));

            const mockDetail = getMockOrderData(orderId);
            const originalOrder = this.allMockOrders.find(o => o.orderId.includes(mockDetail.id)) || this.allMockOrders[0];

            // Construct full order detail from mock pieces
            const orderDetail: OrderDetail = {
                ...originalOrder,
                status: mockDetail.status, // Use status from detail logic
                customerName: mockCustomerData.customerName,
                customerEmail: mockCustomerData.companyEmail,
                customerPhone: mockCustomerData.customerMobile,
                billingAddress: mockCustomerData.companyAddress,
                shippingAddress: mockDetail.deliveryAddress,
                paymentMethod: 'Credit Card', // Mock default
                shippingCost: mockDetail.shipmentPaid || 0,
                items: mockPackingListItems.map(item => ({
                    key: item.key,
                    sn: item.sn,
                    ssn: item.ssn,
                    size: item.size,
                    layout: item.layout,
                    description: item.description,
                    quantity: item.quantity,
                    epcStart: item.epcStart,
                    epcEnd: item.epcEnd
                }))
            };

            return {
                data: orderDetail,
                success: true,
                statusCode: 200
            };
        });
    }

    /**
     * Update shipping cost
     */
    async updateShippingCost(orderId: string, cost: number): Promise<ApiResponse<void>> {
        // Fire real API call for visibility
        apiClient.post(`${this.basePath}/${orderId}/shipping-cost`, { cost }).catch(() => { });

        return this.execute(async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            return {
                data: undefined,
                success: true,
                statusCode: 200
            };
        });
    }

    /**
     * Mark as shipped
     */
    async markAsShipped(orderId: string): Promise<ApiResponse<void>> {
        // Fire real API call for visibility
        apiClient.post(`${this.basePath}/${orderId}/ship`).catch(() => { });

        return this.execute(async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            return {
                data: undefined,
                success: true,
                statusCode: 200
            };
        });
    }

    /**
     * Mark as collected
     */
    async markAsCollected(orderId: string): Promise<ApiResponse<void>> {
        // Fire real API call for visibility
        apiClient.post(`${this.basePath}/${orderId}/collect`).catch(() => { });

        return this.execute(async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            return {
                data: undefined,
                success: true,
                statusCode: 200
            };
        });
    }
}

export const vendorOrderService = new VendorOrderService();
