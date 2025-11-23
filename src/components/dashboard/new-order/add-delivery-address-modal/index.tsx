import React from 'react';
import { Modal, Form, Input, Select, Row, Col, Button } from 'antd';

const { TextArea } = Input;

interface AddDeliveryAddressModalProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: DeliveryAddressFormValues) => void;
}

export interface DeliveryAddressFormValues {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    contactPerson: string;
    contactPhone: string;
    deliveryNotes?: string;
}

const countryOptions = [
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Malaysia', label: 'Malaysia' },
    { value: 'Indonesia', label: 'Indonesia' },
    { value: 'Thailand', label: 'Thailand' },
];

const AddDeliveryAddressModal: React.FC<AddDeliveryAddressModalProps> = ({
    open,
    onCancel,
    onSubmit
}) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                onSubmit(values);
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title="Add delivery Address"
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="cancel"
                    size="large"
                    onClick={handleCancel}
                    style={{
                        minWidth: 120,
                        marginRight: 8
                    }}
                >
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    style={{
                        minWidth: 120
                    }}
                >
                    Add address
                </Button>
            ]}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ marginTop: 24 }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="addressLine1"
                            label="Address Line 1"
                            rules={[{ required: true, message: 'Please enter address line 1' }]}
                        >
                            <Input
                                placeholder="123 Orchard Road"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="addressLine2"
                            label="Address Line 2"
                        >
                            <Input
                                placeholder="#04-12 Lucky Plaza"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="city"
                            label="City/Town"
                            rules={[{ required: true, message: 'Please enter city/town' }]}
                        >
                            <Input
                                placeholder="Singapore"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="state"
                            label="State/Province/Region"
                            rules={[{ required: true, message: 'Please enter state/province/region' }]}
                        >
                            <Input
                                placeholder="Central Singapore"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="postalCode"
                            label="Postal / ZIP Code"
                            rules={[{ required: true, message: 'Please enter postal/ZIP code' }]}
                        >
                            <Input
                                placeholder="876543"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="country"
                            label="Country"
                            rules={[{ required: true, message: 'Please select country' }]}
                        >
                            <Select
                                placeholder="Select Country"
                                size="large"
                                options={countryOptions}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="contactPerson"
                            label="Delivery Contact Person"
                            rules={[{ required: true, message: 'Please enter contact person name' }]}
                        >
                            <Input
                                placeholder="John Doe"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="contactPhone"
                            label="Delivery Contact Phone"
                            rules={[
                                { required: true, message: 'Please enter contact phone' },
                                { pattern: /^\+?[\d\s-]+$/, message: 'Please enter a valid phone number' }
                            ]}
                        >
                            <Input
                                placeholder="+65 98765432"
                                size="large"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="deliveryNotes"
                    label={
                        <span>
                            Delivery Notes <span style={{ color: '#8c8c8c', fontWeight: 'normal' }}>(Optional)</span>
                        </span>
                    }
                >
                    <TextArea
                        placeholder="Leave a delivery note"
                        rows={3}
                        size="large"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddDeliveryAddressModal;
