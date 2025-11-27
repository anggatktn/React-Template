import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Row, Col, Button, Divider } from 'antd';
import MenuLayout, { TopBarMenu } from '../../../../components/layout/menu-layout';
import PageBreadcrumb from '../../../../components/dashboard/page-breadcrumb';
import { OrderDetailsModel } from './order-details-model';
import { useStateFlow } from '../../../../utils/StateFlow';
import OrderInfoCard from '../../../../components/dashboard/order-tracking/details/order-info-card';
import ShipmentConfirmation from '../../../../components/dashboard/order-tracking/details/shipment-confirmation';
import TrackingTimeline from '../../../../components/dashboard/order-tracking/details/tracking-timeline';
import CustomerInfoCard from '../../../../components/dashboard/order-tracking/details/customer-info-card';
import OrderItemsSummary from '../../../../components/dashboard/order-tracking/details/order-items-summary';

const { Title } = Typography;

const OrderDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const model = useMemo(() => new OrderDetailsModel(navigate, params), [navigate, params]);
    const state = useStateFlow(model.state);

    const breadcrumbItems = [
        { label: 'Order Tracking', onClick: model.handleBack },
        { label: `Order ${state.orderId}`, isActive: true }
    ];

    return (
        <MenuLayout selectedMenu={TopBarMenu.OrderTracking}>
            <div style={{
                width: "100%",
                minHeight: '100vh',
                padding: "0px 10px 100px 10px",
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
            }}>
                <PageBreadcrumb items={breadcrumbItems} />

                <Row
                    justify="space-between"
                    align="middle"
                >
                    <Col>
                        <Title level={2} style={{ margin: 0, fontWeight: 600 }}>
                            Order details
                        </Title>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={model.handleDownloadFiles} style={{ backgroundColor: '#265CD7' }}>
                            Download Files
                        </Button>
                    </Col>
                </Row>
                <Divider
                    style={{
                        backgroundColor: '#d1d9e3',
                        margin: '0px 0px',
                    }}
                />
                <OrderInfoCard data={state} />

                <ShipmentConfirmation
                    data={state}
                    onAcceptCharges={model.handleAcceptCharges}
                    onOptForSelfCollection={model.handleOptForSelfCollection}
                />
                <div style={{
                    display: 'flex',
                    gap: '24px',
                    flexDirection: 'row',
                    height: "max-content",
                }}>
                    <TrackingTimeline data={state} />
                    <CustomerInfoCard data={state} />
                </div>

                <OrderItemsSummary data={state} />
            </div>
        </MenuLayout>
    );
};

export default OrderDetailsPage;
