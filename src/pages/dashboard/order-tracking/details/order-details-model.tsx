import { useNavigate, useParams, type Params } from "react-router-dom";
import { initialOrderDetailsState, type OrderDetailsState } from "./order-details-state";
import { StateFlow } from "../../../../utils/StateFlow";

export class OrderDetailsModel {
    public readonly state = new StateFlow<OrderDetailsState>(initialOrderDetailsState);

    constructor(private navigate: ReturnType<typeof useNavigate>, private params: Readonly<Params<string>>) {
        this.loadOrderDetails();
    }

    private loadOrderDetails() {
        const { id } = this.params;
        // Mock data loading based on ID

        const mockData: OrderDetailsState = {
            orderId: id || '#0020251001',
            orderDate: 'Oct 25, 2025, 10:10am',
            itemsCount: 33,
            amountPaid: 'S$1380.00',
            shipmentPaid: '-',
            status: 'Pending Shipment Acceptance',
            deliverTo: '123 Orchard Road, #04-12 Lucky Plaza, Singapore, Central Singapore, Singapore 576543.',
            contactPerson: 'John Doe',
            contactNumber: '+65 98765432',
            contactEmail: 'johndoe@company.com',
            deliveryNote: 'Please attempt to delivery during weekdays.',

            logisticsProvider: 'Cainiao',
            weight: '4 KG',
            shippingCost: 'S$30.00',
            dutiesAndTaxes: 'S$10.00',
            totalCost: 'S$40.00',
            collectionAddress: '31000 Batu Gajah Perak Malaysia\nBuilding 1, No. 380 Fengxin Road, Yuhang District,\nHangzhou, Zhejiang, 310000, China',

            vendorCode: '0000567',
            customerName: 'John Doe',
            companyName: 'Gear Turf Technology Pte Ltd',
            companyUEN: '201525201Z',
            companyEmail: 'johndoe@gtt.org',
            customerMobile: '+65 98765432',
            companyAddress: '1 Beach road, Singapore 100001.',

            items: [
                {
                    id: '1',
                    name: 'Metallic RFID Tag',
                    ssn: '1234567890',
                    description: 'Morbi quis elit condimentum, faucibus eros non, dictum velit.',
                    size: 'M',
                    quantity: 3000,
                    deliverTo: 'Work Place 1 - Singapore',
                    subtotal: 'S$397.45',
                    type: 'Metallic RFID Tag',
                    barcode: '1234567890'
                },
                {
                    id: '2',
                    name: 'Normal',
                    ssn: '1234567890',
                    description: 'Morbi quis elit condimentum, faucibus eros non, dictum velit.',
                    size: 'M',
                    quantity: 3000,
                    deliverTo: 'Work Place 1 - Singapore',
                    subtotal: 'S$397.45',
                    type: 'Normal',
                    barcode: '1234567890'
                }
            ],

            timeline: [
                {
                    date: 'Oct 25, 2025, 10:10am',
                    status: 'Vendor updated the shipping costVendor updated the shipping costVendor updated the shipping costVendor updated the shipping cost',
                },
                {
                    date: 'Oct 25, 2025, 10:10am',
                    status: 'Order Placed - Door Step Delivery',
                }
            ]
        };

        this.state.setValue(mockData);
    }

    public handleAcceptCharges = () => {
        console.log("Accept Charges clicked");
    }

    public handleOptForSelfCollection = () => {
        console.log("Opt for Self Collection clicked");
    }

    public handleDownloadFiles = () => {
        console.log("Download Files clicked");
    }

    public handleBack = () => {
        this.navigate(-1);
    }
}
