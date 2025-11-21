import { useMemo } from "react";
import { ProfileCompleteModel } from "./profile-complete-model";
import { useStateFlow } from "../../utils/StateFlow";
import { Form, Input, Button, Select, Row, Col, Avatar, Typography } from "antd";
import classes from "./index.module.less";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

export interface ProfileCompleteForms {
    vendorCode: string;
    customerName: string;
    companyName: string;
    companyUen: string;
    companyEmail: string;
    customerMobile: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateRegion: string;
    postalCode: string;
    country: string;
    deliveryContactPerson: string;
    deliveryContactPhone: string;
}

const ProfileCompletePage: React.FC = () => {
    const model = useMemo(() => new ProfileCompleteModel(), []);
    const state = useStateFlow(model.state);
    const [form] = Form.useForm();

    return (
        <div className={classes["complete-profile-container"]}>
            <div className={classes.header}>
                <div className={classes.headerContent}>
                    <img src="/images/rfid-logo.svg" alt="Logo" style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: "100%",
                        height: "auto"
                    }} />
                    <Avatar icon={<UserOutlined />} src="/images/avatar-placeholder.png" />
                </div>
            </div>

            <div className={classes.content}>
                <Title level={2} className={classes.pageTitle}>Complete profile</Title>
                <div className={classes.divider} />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={model.onCompleteSignUpPressed}
                    initialValues={state.formValues}
                    className={classes.form}
                    requiredMark={false}
                >
                    <div className={classes.section}>
                        <Title level={4} className={classes.sectionTitle}>Business Information</Title>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label={<span className={classes.label}>Vendor Code. <span className={classes.subLabel}>7 digits</span></span>}
                                    name="vendorCode"
                                    extra={<span className={classes.helperText}>Must be exactly 7 digits for EPC encoding (disregard any "V" prefix).</span>}
                                >
                                    <Input placeholder="0000567" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Customer Name" name="customerName">
                                    <Input placeholder="John Doe" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Company Name" name="companyName">
                                    <Input placeholder="Gear Turf Technology Pte Ltd" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Company UEN" name="companyUen">
                                    <Input placeholder="201525201Z" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Company Email" name="companyEmail">
                                    <Input placeholder="johndoe@gtt.org" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Customer Mobile" name="customerMobile">
                                    <Input placeholder="+65 98765432" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    <div className={classes.section}>
                        <Title level={4} className={classes.sectionTitle}>Address</Title>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Address Line 1" name="addressLine1">
                                    <Input placeholder="123 Orchard Road" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Address Line 2" name="addressLine2">
                                    <Input placeholder="#04-12 Lucky Plaza" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="City/Town" name="city">
                                    <Input placeholder="Singapore" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="State/Province/Region" name="stateRegion">
                                    <Input placeholder="Central Singapore" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Postal / ZIP Code" name="postalCode">
                                    <Input placeholder="876543" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Country" name="country">
                                    <Select
                                        placeholder="Select Country"
                                        options={[
                                            { value: "singapore", label: "Singapore" },
                                            { value: "malaysia", label: "Malaysia" },
                                            { value: "indonesia", label: "Indonesia" },
                                            { value: "brunei", label: "Brunei" },
                                            { value: "thailand", label: "Thailand" },
                                            { value: "vietnam", label: "Vietnam" },
                                            { value: "myanmar", label: "Myanmar" },
                                            { value: "philippines", label: "Philippines" },
                                            { value: "laos", label: "Laos" },
                                            { value: "cambodia", label: "Cambodia" },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Delivery Contact Person" name="deliveryContactPerson">
                                    <Input placeholder="John Doe" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Delivery Contact Phone" name="deliveryContactPhone">
                                    <Input placeholder="+65 98765432" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={classes.submitButton}>
                            Complete Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ProfileCompletePage;
