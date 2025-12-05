import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Divider, Spin, message, Button } from 'antd';
import { ArrowLeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../../components/layout/Navbar';
import OrderInfoCard from '../../../components/orders/details/OrderInfoCard';
import ShippingUpdateCard from '../../../components/orders/details/ShippingUpdateCard';
import ShippingInfoCard from '../../../components/orders/details/ShippingInfoCard';
import UpdateOrderStatusCard from '../../../components/orders/details/UpdateOrderStatusCard';
import MarkAsShippedCard from '../../../components/orders/details/MarkAsShippedCard';
import PackingListTable from '../../../components/orders/details/PackingListTable';
import classes from './OrderDetails.module.less';
import CustomerInfoSection from '../../../components/orders/details/CustomerInfoCard';
import DeliveryInfoSection from '../../../components/orders/details/DeliveryInfoSection';
import OrderTrackingCard from '../../../components/orders/details/OrderTrackingCard';
import UploadPhotoCard from '../../../components/orders/details/UploadPhotoCard';
import TrackingInfoCard from '../../../components/orders/details/TrackingInfoCard';
import SelfCollectionCard from '../../../components/orders/details/SelfCollectionCard';
import { vendorOrderService, type OrderDetail } from '../../../../services/vendor.service-base';
import DraggableWidget from '../../../components/orders/details/DraggableWidget';

const { Content } = Layout;
const { Title } = Typography;

const OrderDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<string>('');
    const [podUrl, setPodUrl] = useState<string | null>(null);
    const [remarks, setRemarks] = useState<string>('');
    const [trackingInfo, setTrackingInfo] = useState<{ id: string; url: string; note: string } | null>(null);

    useEffect(() => {
        if (id) {
            fetchOrderDetails(id);
        }
    }, [id]);

    const fetchOrderDetails = async (orderId: string) => {
        setLoading(true);
        try {
            const response = await vendorOrderService.getOrderDetails(orderId);
            if (response.success) {
                setOrderDetail(response.data);
                setCurrentStatus(response.data.status);
            }
        } catch (error) {
            console.error('Failed to fetch order details', error);
            message.error('Failed to load order details');
        } finally {
            setLoading(false);
        }
    };

    const handleShippingUpdate = async (newWeight: number, newCost: number, newDuties: number) => {
        if (!id) return;
        try {
            // TODO: Pass newDuties to backend when supported
            const response = await vendorOrderService.updateShippingCost(id, newCost);
            if (response.success) {
                message.success('Shipping cost updated');
                setCurrentStatus('Awaiting Shipment Acceptance');
            }
        } catch (error) {
            message.error('Failed to update shipping cost');
        }
    };

    const handleEditShipping = () => {
        setCurrentStatus('Update Shipping Cost');
    };

    const handleMarkAsShipped = async (trackingId: string, trackingUrl: string, note: string) => {
        if (!id) return;
        try {
            // TODO: Pass tracking info to backend when supported
            const response = await vendorOrderService.markAsShipped(id);
            if (response.success) {
                message.success('Order marked as shipped');
                setCurrentStatus('Order Shipped');
                setTrackingInfo({ id: trackingId, url: trackingUrl, note });
            }
        } catch (error) {
            message.error('Failed to mark as shipped');
        }
    };

    const handleMarkAsCollected = async (file: File | null, remarks?: string) => {
        if (!id) return;
        try {
            const response = await vendorOrderService.markAsCollected(id);
            if (response.success) {
                if (file) {
                    const url = URL.createObjectURL(file);
                    setPodUrl(url);
                }
                if (remarks) {
                    setRemarks(remarks);
                }
                // message.success('Order marked as collected'); // Handled by UploadPhotoCard
                setCurrentStatus('Order Collected');
            }
        } catch (error) {
            message.error('Failed to mark as collected');
        }
    };

    const handleMarkAsReadyForCollection = async () => {
        if (!id) return;
        try {
            const response = await vendorOrderService.markAsReadyToCollect(id);
            if (response.success) {
                message.success('Order marked as ready for self collection');
                setCurrentStatus('Awaiting Customer Collection');
            }

        } catch (error) {
            message.error('Failed to mark as ready for collection');
        }
    };

    const handleUpdateStatusAsDelivered = async (file: File | null, remarks?: string) => {
        if (!id) return;
        try {
            // TODO: Implement API call for marking as delivered with file and remarks
            // const response = await vendorOrderService.markAsDelivered(id, file, remarks);
            // if (response.success) {
            if (file) {
                const url = URL.createObjectURL(file);
                setPodUrl(url);
            }
            if (remarks) {
                console.log('Remarks:', remarks);
            }
            message.success('Order marked as delivered');
            setCurrentStatus('Order Delivered');
            // }
        } catch (error) {
            message.error('Failed to mark as delivered');
        }
    };

    if (loading || !orderDetail) {
        return (
            <Layout>
                <Navbar />
                <Content className={classes.pageContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin size="large" />
                </Content>
            </Layout>
        );
    }

    // Map OrderDetail to component props
    const orderInfoProps = {
        id: orderDetail.orderId,
        date: orderDetail.date,
        itemCount: orderDetail.totalQty,
        amountPaid: orderDetail.items.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0),
        shipmentPaid: orderDetail.shippingCost,
        status: currentStatus,
        deliveryAddress: orderDetail.deliverTo,
        contactPerson: orderDetail.customerName,
        contactPhone: orderDetail.customerPhone,
        deliveryNote: 'Leave at front door' // Mock note
    };

    const customerData = {
        vendorCode: '0000567', // Mock
        customerName: orderDetail.customerName,
        companyName: 'Gear Turf Technology Pte Ltd', // Mock
        companyUEN: '201525201Z', // Mock
        companyEmail: orderDetail.customerEmail,
        customerMobile: orderDetail.customerPhone,
        companyAddress: orderDetail.billingAddress
    };

    return (
        <Layout>
            <Navbar />
            <Content className={classes.pageContainer}>
                {/* Header */}
                <div className={classes.header}>
                    <div className={classes.breadcrumb}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', marginTop: '23px' }}>
                            <div
                                onClick={() => navigate('/vendor/orders')}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: '#E6F7FF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    marginRight: '12px'
                                }}
                            >
                                <ArrowLeftOutlined style={{ color: '#265CD7', fontSize: '14px' }} />
                            </div>
                            <span style={{ color: '#265CD7', fontSize: '14px', cursor: 'pointer' }} onClick={() => navigate('/vendor/orders')}>Order Tracking</span>
                            <RightOutlined style={{ fontSize: '10px', color: '#265CD7', margin: '0 12px' }} />
                            <span style={{ color: '#265CD7', fontWeight: 600, fontSize: '14px' }}>Order #{orderDetail.orderId}</span>
                        </div>
                    </div>
                    <div className={classes.titleRow}>
                        <Title level={2} style={{ margin: 0 }}>Order details</Title>
                        <Button type="primary" size="large" style={{ fontWeight: 600, padding: '15px 25px', }}>Download Files</Button>
                    </div>
                    <Divider style={{ margin: '16px 0', borderColor: '#D2DAE5' }} />
                </div>

                <div className={classes.content}>

                    <OrderInfoCard order={orderInfoProps} />

                    {currentStatus === 'Update Shipping Cost' && (
                        <ShippingUpdateCard
                            initialWeight={4}
                            initialCost={orderDetail.shippingCost}
                            onUpdate={handleShippingUpdate}
                        />
                    )}

                    {currentStatus === 'Pending Courier Pickup' && (
                        <MarkAsShippedCard
                            onUpdate={handleMarkAsShipped}
                        />
                    )}

                    {currentStatus === 'Order Shipped' && (
                        <>
                            <UploadPhotoCard
                                onUpdateStatus={handleUpdateStatusAsDelivered}
                            />
                            <TrackingInfoCard
                                trackingId={trackingInfo?.id || 'TRK123456789'}
                                trackingUrl={trackingInfo?.url || 'https://www.dhl.com/track/TRK123456789'}
                                note={trackingInfo?.note}
                            />
                        </>
                    )}

                    {(currentStatus === 'Awaiting Shipment Acceptance' ||
                        currentStatus === 'Pending Courier Pickup' ||
                        currentStatus === 'Order Shipped' ||
                        currentStatus === 'Order Delivered') && (
                            <ShippingInfoCard
                                weight={4}
                                shippingCost={orderDetail.shippingCost}
                                duties={10.00}
                                status={currentStatus}
                                proofOfDelivery={podUrl || '-'}
                            />
                        )}

                    {currentStatus === 'Order Collected' && (
                        <SelfCollectionCard
                            statusText="Order Collected"
                            statusColor="#3A9448"
                            showAction={false}
                            proofOfCollection={podUrl || undefined}
                            remarks={remarks}
                        />
                    )}

                    {currentStatus === 'Updated Self Collection Status' && (
                        <SelfCollectionCard
                            onMarkReady={handleMarkAsReadyForCollection}
                        />
                    )}

                    {currentStatus === 'Awaiting Customer Collection' && (
                        <>
                            <UploadPhotoCard
                                onUpdateStatus={handleMarkAsCollected}
                                cardTitle="Update Order Status"
                                buttonText="Mark Order as Collected"
                                modalTitle="Confirm Order Collection"
                                successMessage="Order marked as collected"
                            />
                            <SelfCollectionCard
                                statusText="Ready to Collect"
                                statusColor="#3A9448"
                                showAction={false}
                            />

                        </>
                    )}

                    <PackingListTable items={orderDetail.items.map(item => ({
                        key: item.key,
                        sn: item.sn,
                        barcode: item.barcode,
                        ssn: item.ssn,
                        tagType: item.tagType,
                        style: item.style,
                        color: item.color,
                        size: item.size,
                        sku: item.sku,
                        price: item.price,
                        layout: item.layout || '-',
                        description: item.description || '-',
                        quantity: item.quantity || 0,
                        epcStart: item.epcStart || '-',
                        epcEnd: item.epcEnd
                    }))} />

                    <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                        <Col xs={24} lg={12}>
                            <CustomerInfoSection data={customerData} />
                        </Col>
                        <Col xs={24} lg={12}>
                            <DeliveryInfoSection data={{
                                deliverTo: orderDetail.deliverTo,
                                contactPerson: orderDetail.customerName,
                                contactMobile: orderDetail.customerPhone,
                                deliveryNote: 'Leave at front door'
                            }} />
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                        <Col xs={24} lg={12}>
                            <OrderTrackingCard style={{ minHeight: '300px' }} />
                        </Col>
                    </Row>
                </div>
            </Content>
            <DraggableWidget />
        </Layout>
    );
};

export default OrderDetails;