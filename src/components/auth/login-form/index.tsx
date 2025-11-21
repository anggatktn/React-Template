import React, { useEffect, useState } from 'react';
// Assuming Ant Design components are available globally or imported via a build system.
import { Form, Input, Button, Checkbox, Typography, Alert, InputNumber } from 'antd';
import classes from './index.module.less';
import { AuthFormType } from '../../../pages/auth/auth-screen-state';

const { Link } = Typography;

export interface FormValues {
    email: string;
    password?: string;
    otp?: string;
    remember: boolean;
}

interface LoginFormArgs {
    onPrimaryButtonClicked: (values: FormValues) => void,
    onSecondaryButtonClicked: () => void,
    onRetypeEmail: () => void,
    formType: AuthFormType,
    isLoading: boolean
}

const ButtonSecondaryLabels: Record<AuthFormType, string> = {
    [AuthFormType.SignIn]: "Create Account",
    [AuthFormType.CreateAccount]: "Already have an account? Sign In",
    [AuthFormType.EnterOTP]: "Back",
};

const ButtonPrimaryLabels: Record<AuthFormType, string> = {
    [AuthFormType.SignIn]: "Log In",
    [AuthFormType.CreateAccount]: "Next",
    [AuthFormType.EnterOTP]: "Create Account",
};

const LoginForm: React.FC<LoginFormArgs> = ({
    onPrimaryButtonClicked,
    onSecondaryButtonClicked,
    onRetypeEmail,
    formType,
    isLoading
}) => {
    const [form] = Form.useForm<FormValues>();
    const formValues = Form.useWatch([], form)
    const [isValidated, setValidated] = useState(false)

    useEffect(() => {
        form.validateFields({
            validateOnly: true
        })
            .then(() => setValidated(true))
            .catch(() => setValidated(false))
    }, [formValues, form])

    // Explicitly type the state hooks

    // onFinishFailed uses a specific Ant Design type for error info
    const onFinishFailed = (errorInfo: any) => { // Using 'any' for brevity as Ant's type is complex
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={classes["form-container"]}>
            <div className={classes["sign-in-card"]}>

                {/* Title */}
                <h3 style={{ textAlign: 'center' }}>
                    {formType === AuthFormType.SignIn ? "Sign In" : "Create Account"}
                </h3>

                {/* OTP NOTICE */}
                {formType === AuthFormType.EnterOTP ? <div className={classes["otp-notice"]}>
                    <span>An OTP has been sent to your email,</span>
                    <span>{form.getFieldValue('email')}</span>
                    <span
                        style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#265CD7"
                        }}
                        onClick={() => {
                            onRetypeEmail()
                            form.resetFields()
                        }}
                    >Re-type email</span>
                </div> : <></>}

                <Form
                    form={form}
                    name="signin"
                    className={classes["form-main"]}
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onPrimaryButtonClicked}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    size="large"
                >
                    {formType === AuthFormType.EnterOTP ? <>
                        <Form.Item
                            label="Enter OTP"
                            name="otp"
                            className={classes["form-row"]}
                            colon={false}
                            rules={[
                                { required: true, message: 'Please input your OTP!' },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: 'Please enter only numbers!'
                                }
                            ]}
                            required
                        >
                            <Input
                                maxLength={6}
                                onKeyDown={(e) => {
                                    // Allow: backspace, delete, tab, escape, enter, arrows
                                    if (
                                        ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
                                        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                                        (e.key === 'a' && e.ctrlKey) ||
                                        (e.key === 'c' && e.ctrlKey) ||
                                        (e.key === 'v' && e.ctrlKey) ||
                                        (e.key === 'x' && e.ctrlKey)
                                    ) {
                                        return;
                                    }
                                    // Prevent if not a number
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder='Enter your OTP here!'
                            />
                        </Form.Item>
                    </> : <>
                        {/* Email Input */}
                        <Form.Item
                            label="Email"
                            name="email"
                            className={classes["form-row"]}
                            colon={false}
                            rules={[
                                { required: true, message: '' },
                                { type: 'email', message: '' }
                            ]}
                            required
                        >
                            <Input placeholder="johndoe@customer.com" />
                        </Form.Item>

                        {/* Password Input */}
                        <Form.Item
                            label={formType === AuthFormType.SignIn ? "Password" : "Set a Password"}
                            className={classes["form-row"]}
                            name="password"
                            rules={[{ required: true, message: '' }]}
                            required
                        >
                            <Input.Password placeholder="••••••" />
                        </Form.Item>
                    </>}

                    {formType === AuthFormType.SignIn ? <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Keep me signed in</Checkbox>
                            </Form.Item>
                            <Link
                                href="#"
                                style={{
                                    color: '#265CD7',
                                    fontWeight: 500
                                }}
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </Form.Item> : <></>}

                    {/* Log In Button */}
                    <Form.Item style={{ marginBottom: 12, marginTop: 32 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={isLoading}
                            style={{ height: 42, backgroundColor: `${isValidated ? '#265CD7' : '#c7c7c7ff'}`, fontWeight: 600 }}
                            disabled={!isValidated}
                        >
                            {ButtonPrimaryLabels[formType]}
                        </Button>
                    </Form.Item>

                    {/* Create Account Button */}
                    <Form.Item>
                        <Button
                            onClick={onSecondaryButtonClicked}
                            type="default"
                            block
                            loading={isLoading}
                            style={{ height: 42, borderColor: '#265CD7', color: '#265CD7', fontWeight: 600 }}
                        >
                            {ButtonSecondaryLabels[formType]}
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
};

export default LoginForm;