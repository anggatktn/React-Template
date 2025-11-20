import React, { useState } from 'react';
// Assuming Ant Design components are available globally or imported via a build system.
import { Form, Input, Button, Checkbox, Typography, Alert } from 'antd';
import classes from './index.module.less';

const { Title, Link } = Typography;

// 2. Define the types for the form fields
export interface FormValues {
    email: string;
    password?: string; // Optional since it's sensitive and might not be initialised
    remember: boolean;
}

interface LoginFormArgs {
    onFinish: (values: FormValues) => void,
}

// 3. Define the type for the custom message state
interface MessageState {
    type: 'success' | 'error' | 'info' | 'warning';
    text: string;
}

const LoginForm: React.FC<LoginFormArgs> = ({ onFinish }) => {
    const [form] = Form.useForm<FormValues>();

    // Explicitly type the state hooks
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageState | null>(null);



    // Ant Design Form uses the onFinish event handler
    // const formFinish = (values: FormValues) => {
    //     setMessage(null);
    //     setIsSubmitting(true);

    //     // Simulate an API call with the form data
    //     setTimeout(() => {
    //         console.log('Attempting login with:', values);
    //         setMessage({
    //             type: 'success',
    //             text: `Successfully simulated login for ${values.email}! Welcome back.`,
    //         });
    //         setIsSubmitting(false);
    //     }, 1500);
    // };


    // onFinishFailed uses a specific Ant Design type for error info
    const onFinishFailed = (errorInfo: any) => { // Using 'any' for brevity as Ant's type is complex
        console.log('Failed:', errorInfo);
        setMessage({
            type: 'error',
            text: 'Please correct the errors in the form.',
        });
    };



    const handleCreateAccount = () => {
        setMessage({
            type: 'info',
            text: 'Redirecting to account creation...',
        });
        console.log('Navigating to Create Account page.');
    };

    return (
        <div className={classes["form-container"]}>
            <div className={classes["sign-in-card"]}>

                {/* Title */}
                <h3 style={{ textAlign: 'center' }}>
                    Sign In
                </h3>

                {/* Status Message Display */}
                {message && (
                    <Alert
                        message={message.text}
                        type={message.type}
                        showIcon
                        style={{ marginBottom: 24 }}
                    />
                )}

                <Form
                    form={form}
                    name="signin"
                    className={classes["form-main"]}
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onFinish}
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
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'The input is not valid E-mail!' }
                        ]}
                        required
                    >
                        <Input placeholder="johndoe@customer.com" />
                    </Form.Item>

                    {/* Password Input */}
                    <Form.Item
                        label="Password"
                        className={classes["form-row"]}
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        required
                    >
                        <Input.Password placeholder="••••••" />
                    </Form.Item>

                    {/* Checkbox and Forgot Password Link */}
                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Keep me signed in</Checkbox>
                            </Form.Item>
                            <Link href="#" style={{
                                color: '#265CD7',
                                fontWeight: 500
                            }}>
                                Forgot Password?
                            </Link>
                        </div>
                    </Form.Item>

                    {/* Log In Button */}
                    <Form.Item style={{ marginBottom: 12 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={isSubmitting}
                            style={{ height: 42, backgroundColor: '#265CD7', fontWeight: 600 }}
                        >
                            Log In
                        </Button>
                    </Form.Item>

                    {/* Create Account Button */}
                    <Form.Item>
                        <Button
                            onClick={handleCreateAccount}
                            type="default"
                            block
                            style={{ height: 42, borderColor: '#265CD7', color: '#265CD7', fontWeight: 600 }}
                        >
                            Create Account
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
};

export default LoginForm;