import React from 'react';
import { Form, Input, Button, Layout, QRCode } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../state/state.jsx";
import backgroundImage from '../assets/LoginBackground2.jpg';
import logo from "../assets/Dplogo.png";
import { requestLogin } from '../axios/api.jsx';
const Login1 = () => {
    const navigate = useNavigate();
    const setUsername = useUserStore((state) => state.setUsername);

    const onFinish = async (values) => {
        console.log('Received values:', values);
        setUsername(values.username);
        var username = values.username;
        var password = values.password;

        try {
            const response = await requestLogin({userAccount: username, userPassword: password});
            console.log(response);
            if (response.status === 200) {  // 假设 0 是成功状态码，请根据实际 API 调整
                navigate('/home');
            } 
        } catch (error) {
            console.error('登录失败:', error);
            // 这里可以添加错误提示，比如使用 antd 的 message 组件
        }
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
                            <Link to="/" style={{ color: 'rgba(255,255,255,0.85)' }}>返回部门选择</Link>
                            <Link to="/register" style={{ color: 'rgba(255,255,255,0.85)' }}>注册账号</Link>
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