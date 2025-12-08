import MenuLayout from "../../../../components/layout/top-bar-menu/MenuLayout";
import React, { useMemo } from 'react';
import { AddUserModel } from "./add-user-model";
import { useStateFlow } from "../../../../utils/StateFlow";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Divider, Typography } from "antd";
import BusinessInfoForm from "../../../../components/dashboard/user-management/add-user/business-info-form";
import CompanyAddressForm from "../../../../components/dashboard/user-management/add-user/company-address-form";
import PhotoUpload from "../../../../components/dashboard/user-management/add-user/photo-upload";
import classes from "./index.module.less";
import PageBreadcrumb from "../../../../components/dashboard/page-breadcrumb";
import { SuperAdminMenu } from "../../../../components/layout/top-bar-menu/super-admin-menu";

const { Title } = Typography;

const AddUserPage: React.FC = () => {
    const navigate = useNavigate();
    const model = useMemo(() => new AddUserModel(navigate), [navigate]);
    const state = useStateFlow(model.state);

    return (
        <MenuLayout selectedMenu={SuperAdminMenu.UserManagement}>
            <div className={classes["add-user-container"]}>
                <PageBreadcrumb
                    items={[
                        {
                            label: "User Management",
                            onClick: () => navigate('/dashboard/user-management/user-list'),
                        },
                        {
                            label: 'Add User',
                            isActive: true,
                        },
                    ]}
                />

                <span style={{
                    fontWeight: 600,
                    fontSize: '28px',
                }}>
                    Add User
                </span>

                <Divider style={{
                    backgroundColor: '#d1d9e3',
                    height: '1px',
                    margin: '0px 0'
                }} />

                <div className={classes["form-content"]}>
                    <div className={classes["form-layout"]}>
                        <div className={classes["forms-section"]}>
                            <BusinessInfoForm
                                vendorCode={state.vendorCode}
                                customerName={state.customerName}
                                companyName={state.companyName}
                                companyUEN={state.companyUEN}
                                companyEmail={state.companyEmail}
                                customerMobile={state.customerMobile}
                                onFieldChange={model.updateField}
                            />

                            <CompanyAddressForm
                                addressLine1={state.addressLine1}
                                addressLine2={state.addressLine2}
                                city={state.city}
                                state={state.state}
                                postalCode={state.postalCode}
                                country={state.country}
                                onFieldChange={model.updateField}
                            />

                            <Button
                                type="primary"
                                className={classes["submit-button"]}
                                onClick={model.handleSubmit}
                                loading={state.isSubmitting}
                            >
                                Add User
                            </Button>
                        </div>

                        <PhotoUpload
                            photo={state.photo || ""}
                            onPhotoChange={model.updatePhoto}
                        />
                    </div>
                </div>
            </div>
        </MenuLayout>
    );
}

export default AddUserPage;
