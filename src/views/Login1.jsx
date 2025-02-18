import React from 'react';
import { Form, Input, Button, Layout, QRCode } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../state/state.jsx";
import backgroundImage from '../assets/LoginBackground2.jpg';
import logo from "../assets/Dplogo.png";

const Login1 = () => {
    const navigate = useNavigate();
    const setUsername = useUserStore((state) => state.setUsername);

    const onFinish = (values) => {
        console.log('Received values:', values);
        setUsername(values.username);
        sessionStorage.setItem('username', values.username);
        navigate('/home');
    };

    return (
        <Layout style={{ 
            minHeight: '100vh',
            background: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: 800,
                minHeight: 500,
                padding: '40px 60px',
                borderRadius: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ 
                    textAlign: 'center', 
                    marginBottom: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}>
                    <img src={logo} alt="南京大学" style={{ height: 40 }} />
                    <div style={{ 
                        color: 'white', 
                        fontSize: '24px',
                        borderLeft: '1px solid rgba(255,255,255,0.3)',
                        paddingLeft: '12px'
                    }}>
                        统一身份认证
                    </div>
                </div>

                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    flex: 1
                }}>
                    <div style={{ flex: 1, maxWidth: 460, marginRight: 40 }}>
                        <div style={{ color: 'white', fontSize: '18px', marginBottom: 24 }}>
                            账号登录
                        </div>
                        <Form
                            name="login"
                            onFinish={onFinish}
                            size="large"
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入账号' }]}
                            >
                                <Input placeholder="账号" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input.Password placeholder="密码" />
                            </Form.Item>

                            <Form.Item
                                name="verification"
                                rules={[{ required: true, message: '请输入验证码' }]}
                            >
                                <Input placeholder="验证码" suffix={
                                    <img src="验证码图片URL" alt="验证码" style={{ height: 30 }} />
                                } />
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    block 
                                    style={{
                                        height: '40px',
                                        backgroundColor: '#722ed1'
                                    }}
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>

                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginTop: 16
                        }}>
                            <Link to="/help" style={{ color: 'rgba(255,255,255,0.85)' }}>在线帮助</Link>
                            <Link to="/forgot" style={{ color: 'rgba(255,255,255,0.85)' }}>忘记密码</Link>
                        </div>
                    </div>

                    <div style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 20px',
                        borderLeft: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <QRCode 
                            value="https://example.com" 
                            size={180}
                            style={{ 
                                marginBottom: 16,
                                background: 'white',
                                padding: 8,
                                borderRadius: 4
                            }} 
                        />
                        <span style={{ 
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            微信或南京大学APP扫码登录
                        </span>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login1; 