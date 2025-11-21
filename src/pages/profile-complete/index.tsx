import { useMemo } from "react";
import { ProfileCompleteModel } from "./profile-complete-model";
import { useStateFlow } from "../../utils/StateFlow";
import { Form, Input, Button, Select, Row, Col, Avatar, Typography } from "antd";
import classes from "./index.module.less";
import { UserOutlined } from "@ant-design/icons";
import Layout, { Header } from "antd/es/layout/layout";
import MenuLayout, { TopBarMenu } from "../../components/layout/menu-layout";

const { Title } = Typography;

const ProfileCompletePage: React.FC = () => {
    const model = useMemo(() => new ProfileCompleteModel(), []);
    const state = useStateFlow(model.state);
    const [form] = Form.useForm();

    return (
        <MenuLayout selectedMenu={undefined} onSelectMenu={() => { }} isMenuVisible={false}>
            <div className={classes.content}>
                <Title level={3} className={classes.pageTitle}>Complete profile</Title>
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
                                    <Input placeholder="0000567" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Customer Name" name="customerName">
                                    <Input placeholder="John Doe" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Company Name" name="companyName">
                                    <Input placeholder="Gear Turf Technology Pte Ltd" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Company UEN" name="companyUen">
                                    <Input placeholder="201525201Z" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Company Email" name="companyEmail">
                                    <Input placeholder="johndoe@gtt.org" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Customer Mobile" name="customerMobile">
                                    <Input placeholder="+65 98765432" size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    <div className={classes.section}>
                        <Title level={4} className={classes.sectionTitle}>Address</Title>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Address Line 1" name="addressLine1">
                                    <Input placeholder="123 Orchard Road" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Address Line 2" name="addressLine2">
                                    <Input placeholder="#04-12 Lucky Plaza" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="City/Town" name="city">
                                    <Input placeholder="Singapore" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="State/Province/Region" name="stateRegion">
                                    <Input placeholder="Central Singapore" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Postal / ZIP Code" name="postalCode">
                                    <Input placeholder="876543" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Country" name="country">
                                    <Select
                                        placeholder="Select Country"
                                        size="large"
                                        options={Object.entries(model.countries).map(([key, value]) => ({ value, label: value }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Delivery Contact Person" name="deliveryContactPerson">
                                    <Input placeholder="John Doe" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Delivery Contact Phone" name="deliveryContactPhone">
                                    <Input placeholder="+65 98765432" size="large" />
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
        </MenuLayout>
    );
};

export default ProfileCompletePage;
