import React, { useEffect, useState, useRef } from 'react';
// Assuming Ant Design components are available globally or imported via a build system.
import { Form, Input, Button, Typography, message, Spin } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';
import classes from './index.module.less';
import { AuthFormType } from '../../../pages/auth/auth-screen-state';
import GoogleIcon from '../../../assets/google_icon.svg?react';
import { signInWithGoogle } from '../../../services/google-auth';

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
    onRequestOtpViaEmail: (email: string) => void,
    formType: AuthFormType,
    isLoading: boolean
}

const ButtonSecondaryLabels: Record<AuthFormType, string> = {
    [AuthFormType.SignIn]: "Create Account",
    [AuthFormType.CreateAccount]: "Already have an account? Sign In",
    [AuthFormType.EnterOTP]: "Back",
};

const ButtonPrimaryLabels: Record<AuthFormType, string> = {
    [AuthFormType.SignIn]: "Sign In",
    [AuthFormType.CreateAccount]: "Next",
    [AuthFormType.EnterOTP]: "Create Account",
};

const LoginForm: React.FC<LoginFormArgs> = ({
    onPrimaryButtonClicked,
    onSecondaryButtonClicked,
    onRetypeEmail,
    onRequestOtpViaEmail,
    formType,
    isLoading
}) => {
    const [form] = Form.useForm<FormValues>();
    const formValues = Form.useWatch([], form)
    const [isValidated, setValidated] = useState(false)
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)

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

    // Handle Google Sign-In
    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            const result = await signInWithGoogle();
            message.success(`Welcome, ${result.user.displayName || result.user.email}!`);

            // You can handle the successful sign-in here
            // For example, redirect to dashboard or call a callback
            console.log('User signed in:', result.user);

            // If you need to pass the user data to parent component,
            // you can add a callback prop like onGoogleSignIn
        } catch (error: any) {
            console.error('Google Sign-In failed:', error);

            // Handle specific error codes
            if (error.code === 'auth/popup-closed-by-user') {
                message.warning('Sign-in cancelled');
            } else if (error.code === 'auth/popup-blocked') {
                message.error('Popup blocked. Please allow popups for this site.');
            } else {
                message.error('Failed to sign in with Google. Please try again.');
            }
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className={classes["form-container"]}>
            <div className={classes["sign-in-card"]}>

                {/* Title */}
                <span style={{
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 600,
                    width: '100%'
                }}>
                    {formType === AuthFormType.SignIn ? "Sign In" : "Create Account"}
                </span>

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
                        <Input
                            size="large"
                            placeholder="johndoe@customer.com"
                            suffix={
                                isLoading ? <Spin size="small" /> : <span
                                    style={{
                                        color: '#265CD7',
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        fontSize: 14
                                    }}
                                    onClick={() => {
                                        onRequestOtpViaEmail(form.getFieldValue('email'))
                                    }}
                                >Send OTP</span>
                            }
                        />
                    </Form.Item>
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
                            size="large"
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
                    {/* Password Input */}
                    {/* <Form.Item
                        label={formType === AuthFormType.SignIn ? "Password" : "Set a Password"}
                        className={classes["form-row"]}
                        name="password"
                        rules={[{ required: true, message: '' }]}
                        required
                    >
                        <Input.Password placeholder="••••••" />
                    </Form.Item> */}

                    {/* {formType === AuthFormType.SignIn ? <Form.Item>
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
                    </Form.Item> : <></>} */}

                    {/* Google reCAPTCHA */}
                    <Form.Item style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''}
                            onChange={(token) => setRecaptchaToken(token)}
                            onExpired={() => setRecaptchaToken(null)}
                        />
                    </Form.Item>

                    {/* Log In Button */}
                    <Form.Item style={{ marginBottom: 12, marginTop: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size='large'
                            loading={isLoading}
                            style={{ height: 42, backgroundColor: `${isValidated && recaptchaToken ? '#265CD7' : '#c7c7c7ff'}`, fontWeight: 600 }}
                            disabled={!isValidated || !recaptchaToken}
                        >
                            {ButtonPrimaryLabels[formType]}
                        </Button>
                    </Form.Item>

                    {/* Create Account Button */}
                    {/* <Form.Item>
                        <Button
                            onClick={onSecondaryButtonClicked}
                            type="default"
                            block
                            loading={isLoading}
                            style={{ height: 42, borderColor: '#265CD7', color: '#265CD7', fontWeight: 600 }}
                        >
                            {ButtonSecondaryLabels[formType]}
                        </Button>
                    </Form.Item> */}

                    {/* TODO: Google Sign In wait until the api ready */}

                    {/* <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '16px 32px' }}>
                        <div style={{ flex: 1, height: 1, backgroundColor: '#c7c7c7' }} />
                        <span style={{ color: '#76879D', fontWeight: 500 }}>OR</span>
                        <div style={{ flex: 1, height: 1, backgroundColor: '#c7c7c7' }} />
                    </div>

                    <Form.Item style={{}}>
                        <Button
                            type="default"
                            onClick={handleGoogleSignIn}
                            block
                            loading={isGoogleLoading}
                            disabled={isGoogleLoading}
                            size="large"
                            style={{
                                height: 42,
                                backgroundColor: 'white',
                                fontWeight: 600,
                                borderColor: '#265CD7',
                                color: '#265CD7',
                                border: '1px solid #265CD7',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8
                            }}
                            icon={
                                <div style={{ width: 24, height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <GoogleIcon />
                                </div>
                            }
                        >
                            Sign in with Google
                        </Button>
                    </Form.Item> */}
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;