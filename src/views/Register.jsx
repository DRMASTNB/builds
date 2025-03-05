import React from 'react';
import { Form, Input, Button, Layout, message, Select } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../assets/LoginBackground2.jpg';
import logo from "../assets/Dplogo.png";
import { requestRegister } from '../axios/api.jsx';

const Register = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const departmentName = localStorage.getItem('selectedDepartment')
    console.log(departmentName);
    const roleOptions = [
        { value: 7, label: '管理员' },
        { value: 2, label: '普通教师' },
        { value: 3, label: '专业学生' },
    ];

    const onFinish = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.error('两次输入的密码不一致！');
            return;
        }
        try {
            const response = await requestRegister({
                userAccount: values.username,
                userPassword: values.password,
                roleIds: values.roles
            });
            console.log(response);
            
            if (response.status === 201) {  
                message.success('注册成功！');
                navigate('/login1');  // 注册成功后跳转到登录页
            } else {
                message.error(response.message || '注册失败，请重试');
            }
        } catch (error) {
            console.error('注册失败:', error);
            message.error('注册失败，请检查网络连接后重试');
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
                width: 500,
                padding: '40px 60px',
                borderRadius: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(4px)',
            }}>
                <div style={{ 
                    textAlign: 'center', 
                    marginBottom: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
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
                            用户注册
                        </div>
                    </div>
                    
                        <div style={{ 
                            color: 'rgba(255,255,255,0.85)', 
                            fontSize: '16px' 
                        }}>
                          {departmentName}
                        </div>
               
                </div>

                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名' },
                            { min: 3, message: '用户名至少3个字符' }
                        ]}
                    >
                        <Input placeholder="用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码' },
                            { min: 6, message: '密码至少6个字符' }
                        ]}
                    >
                        <Input.Password placeholder="密码" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            { required: true, message: '请确认密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致！'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="确认密码" />
                    </Form.Item>

                    <Form.Item
                        name="roles"
                        rules={[
                            { required: true, message: '请选择角色' },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="请选择角色"
                            options={roleOptions}
                            style={{ width: '100%' }}
                        />
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
                            注册
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <Link to="/login1" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        已有账号？返回登录
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default Register; 