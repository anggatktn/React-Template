import { useMemo, useState } from "react";
import { ProfileCompleteModel } from "./profile-complete-model";
import { useStateFlow } from "../../../utils/StateFlow";
import { Form, Input, Button, Select, Row, Col, Typography } from "antd";
import classes from "./index.module.less";
import MenuLayout from "../../../components/layout/top-bar-menu/MenuLayout";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ProfileCompletePage: React.FC = () => {
    const navigate = useNavigate();
    const model = useMemo(() => new ProfileCompleteModel(navigate), []);
    const state = useStateFlow(model.state);
    const [form] = Form.useForm();
    const [isFormValidated, setIsFormValidated] = useState(false);

    const handleFieldsChange = () => {
        // List of required field names
        // Ant Design somehow needed you to click on the form to validate it, this makes google auto fill not working
        const requiredFields = [
            'vendorCode', 'customerName', 'companyName', 'companyUen',
            'companyEmail', 'customerMobile', 'addressLine1', 'city',
            'stateRegion', 'postalCode', 'country', 'deliveryContactPerson',
            'deliveryContactPhone'
        ];

        // Check if there are any errors
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);

        // Check if all required fields have values
        const formValues = form.getFieldsValue();
        const allRequiredFieldsFilled = requiredFields.every(field => {
            const value = formValues[field];
            return value !== undefined && value !== null && value !== '';
        });

        setIsFormValidated(!hasErrors && allRequiredFieldsFilled);
    };

    return (
        <MenuLayout selectedMenu={undefined} onSelectMenu={() => { }} isMenuVisible={false}>
            <div className={classes.content}>
                <Title level={3} className={classes.pageTitle}>Complete profile</Title>
                <div className={classes.divider} />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={
                        (values: any) => {
                            console.log(values);
                            model.onCompleteSignUpPressed(values);
                        }
                    }
                    onFieldsChange={handleFieldsChange}
                    initialValues={state.formValues}
                    className={classes.form}
                    requiredMark={true}
                    disabled={state.isLoading}
                >
                    <div className={classes.section}>
                        <Title level={4} className={classes.sectionTitle}>Business Information</Title>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label={<span className={classes.label}>Vendor Code. <span className={classes.subLabel}>7 digits</span></span>}
                                    name="vendorCode"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                        {
                                            pattern: /^[0-9]{7}$/, // Only allow numbers
                                            message: "Vendor code must be exactly 7 digits",
                                        },
                                    ]}
                                    extra={<span className={classes.helperText}>Must be exactly 7 digits for EPC encoding (disregard any "V" prefix).</span>}
                                >
                                    <Input placeholder="0000567" size="large" type="number" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Customer Name" name="customerName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="John Doe" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Company Name" name="companyName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Gear Turf Technology Pte Ltd" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Company UEN" name="companyUen"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="201525201Z" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Company Email" name="companyEmail"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="johndoe@gtt.org" size="large" type="email" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Customer Mobile" name="customerMobile"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="+65 98765432" size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    <div className={classes.section}>
                        <Title level={4} className={classes.sectionTitle}>Address</Title>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Address Line 1" name="addressLine1"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="123 Orchard Road" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Address Line 2" name="addressLine2"
                                    rules={[
                                        {
                                            required: false,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="#04-12 Lucky Plaza" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="City/Town" name="city"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Singapore" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="State/Province/Region" name="stateRegion"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Central Singapore" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Postal / ZIP Code" name="postalCode"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="876543" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Country" name="country"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select Country"
                                        size="large"
                                        options={Object.entries(model.countries).map(([key, value]) => ({ value, label: value }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Delivery Contact Person" name="deliveryContactPerson"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <Input placeholder="John Doe" size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Delivery Contact Phone" name="deliveryContactPhone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "",
                                        },
                                    ]}>
                                    <Input placeholder="+65 98765432" size="large" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className={classes.submitButton}
                                        style={{
                                            width: "100%"
                                        }}
                                        loading={state.isLoading}
                                        disabled={state.isLoading || !isFormValidated}
                                    >
                                        Complete Sign Up
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        </MenuLayout>
    );
};

export default ProfileCompletePage;
