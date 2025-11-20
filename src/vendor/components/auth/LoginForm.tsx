import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import classes from './LoginForm.module.less';

interface LoginFormProps {
    onLogin: () => void;
    onRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
    return (
        <div className={classes.loginCard}>
            <h2 className={classes.cardTitle}>Sign In</h2>
            <Form
                layout="vertical"
                onFinish={onLogin}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input placeholder="johndoe@customer.com" className={classes.input} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="••••••" className={classes.input} />
                </Form.Item>

                <div className={classes.formActions}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Keep my signed in</Checkbox>
                    </Form.Item>
                    <a className={classes.forgotPassword} href="">
                        Forgot Password?
                    </a>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block className={classes.loginButton}>
                        Log In
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button block className={classes.createAccountButton} onClick={onRegister}>
                        Create Account
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
