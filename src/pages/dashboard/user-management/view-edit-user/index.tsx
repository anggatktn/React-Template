import MenuLayout from "../../../../components/layout/top-bar-menu/menu-layout";
import React, { useMemo, useEffect } from 'react';
import { UserProfileModel } from "./user-profile-model";
import { useStateFlow } from "../../../../utils/StateFlow";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Typography, Spin, Button } from "antd";
import ProfileHeader from "../../../../components/dashboard/user-management/view-edit-user/profile-header";
import BusinessProfileTab from "../../../../components/dashboard/user-management/view-edit-user/business-profile-tab";
import DeliveryAddressesTab from "../../../../components/dashboard/user-management/view-edit-user/delivery-addresses-tab";
import classes from "./index.module.less";
import PageBreadcrumb from "../../../../components/dashboard/page-breadcrumb";
import { SuperAdminMenu } from "../../../../components/layout/top-bar-menu/super-admin-menu";

const { Title } = Typography;

const ViewEditUserPage: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const model = useMemo(() => new UserProfileModel(navigate), [navigate]);
    const state = useStateFlow(model.state);

    useEffect(() => {
        if (userId) {
            model.loadUser(userId);
        }
    }, [userId]);

    if (state.isLoading || !state.user) {
        return (
            <MenuLayout selectedMenu={undefined}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                    <Spin size="large" />
                </div>
            </MenuLayout>
        );
    }

    return (
        <MenuLayout selectedMenu={SuperAdminMenu.UserManagement}>
            <div className={classes["profile-container"]}>

                {/* <PageBreadcrumb
                    items={[
                        {
                            label: "User Management",
                            onClick: () => navigate('/dashboard/user-management'),
                        },
                        {
                            label: 'View/Edit User',
                            isActive: true,
                        },
                    ]}
                /> */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px'
                }}>

                    <span style={{ fontWeight: 600, fontSize: '28px' }}>
                        Profile
                    </span>
                    <Button
                        type="primary"
                        size="large"
                        onClick={model.handleAddDeliveryAddress}
                        disabled={state.activeTab !== 'delivery'}
                        style={{
                            borderRadius: '8px',
                            height: '40px',
                            padding: '0 24px',
                            fontSize: '14px',
                            fontWeight: 500,
                            opacity: state.activeTab === 'delivery' ? 1 : 0,
                            cursor: state.activeTab === 'delivery' ? 'pointer' : 'default',
                        }}
                    >
                        Add delivery address
                    </Button>
                </div>

                <div className={classes["profile-content"]}>
                    <ProfileHeader
                        activeTab={state.activeTab}
                        onTabChange={model.handleTabChange}
                        onAddDeliveryAddress={model.handleAddDeliveryAddress}
                    />

                    {state.activeTab === 'business' ? (
                        <BusinessProfileTab
                            user={state.user}
                            onEdit={model.handleEdit}
                        />
                    ) : (
                        <DeliveryAddressesTab
                            addresses={state.user.deliveryAddresses}
                            onEdit={(addressId) => console.log('Edit address:', addressId)}
                        />
                    )}
                </div>
            </div>
        </MenuLayout>
    );
}

export default ViewEditUserPage;
