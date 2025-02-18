import { Avatar, Button, Layout, notification, Modal, Form, Input, List, Badge } from "antd";
import { ProCard } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { UserOutlined, BellOutlined, LockOutlined } from "@ant-design/icons";
import src from "../assets/loginBackground1.jpg";
import { useNavigate } from "react-router-dom";
import { useNotifications } from '../contexts/NotificationContext';


const User = () => {
    const navigate = useNavigate();

    const userName = sessionStorage.getItem('username');
    useEffect(() => {
        console.log("login token", sessionStorage.getItem('tokenName'), sessionStorage.getItem('tokenValue'),
            "\nuser", sessionStorage.getItem('username'), sessionStorage.getItem('userRole'));
        if (userName === null) {
            navigate("/login1");
        }
    }, []);
    const [notice, contextHolder] = notification.useNotification();
    const openNotification = (status, descrption) => {
        notice['success']({
            message: status,
            description:
                descrption,
            placement: 'top',
        });
    };
    const onClickLogout = async () => {

        // 清空 sessionStorage 中的数据
        sessionStorage.removeItem('tokenName');
        sessionStorage.removeItem('tokenValue');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userRole');
        console.log("logout token", sessionStorage.getItem('tokenName'), sessionStorage.getItem('tokenValue'),
            "\nuser", sessionStorage.getItem('username'), sessionStorage.getItem('userRole'));
        openNotification('退出成功: ', '已返回登录界面')
        navigate("/login1");
    }
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
    const { 
        notifications, 
        unreadCount, 
        markAsRead, 
        markAllAsRead 
    } = useNotifications();
    const [form] = Form.useForm();

    // 修改密码
    const handlePasswordChange = async (values) => {
        try {
            // TODO: 替换为实际的API调用
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    [sessionStorage.getItem('tokenName')]: sessionStorage.getItem('tokenValue')
                },
                body: JSON.stringify({
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword
                })
            });

            if (response.ok) {
                openNotification('成功', '密码修改成功');
                setIsPasswordModalVisible(false);
                form.resetFields();
            } else {
                openNotification('错误', '密码修改失败');
            }
        } catch (error) {
            openNotification('错误', '请求失败');
        }
    };

    // 在ProCard中添加按钮组
    const renderUserActions = () => (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button 
                type="primary" 
                icon={<LockOutlined />}
                onClick={() => setIsPasswordModalVisible(true)}
            >
                修改密码
            </Button>
            <Badge count={unreadCount}>
                <Button 
                    icon={<BellOutlined />}
                    onClick={() => setIsNotificationModalVisible(true)}
                >
                    通知中心
                </Button>
            </Badge>
            <Button 
                type="primary"
                danger
                ghost
                onClick={onClickLogout}
            >
                退出登录
            </Button>
        </div>
    );

    // 修改通知列表渲染
    const renderNotificationList = () => (
        <List
            itemLayout="horizontal"
            dataSource={notifications}
            header={
                unreadCount > 0 && (
                    <Button type="link" onClick={markAllAsRead}>
                        全部标记为已读
                    </Button>
                )
            }
            renderItem={item => (
                <List.Item
                    onClick={() => markAsRead(item.id)}
                    style={{ 
                        cursor: 'pointer',
                        backgroundColor: item.read ? 'transparent' : '#f0f2f5'
                    }}
                >
                    <List.Item.Meta
                        title={item.title}
                        description={item.content}
                    />
                    <div>
                        {new Date(item.time).toLocaleDateString()}
                    </div>
                </List.Item>
            )}
        />
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <ProCard
                boxShadow={true}
                style={{
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                    height: "200px",
                    backgroundImage: `url(${src})`,
                }}

                split={"vertical"}
            >
                <ProCard style={{
                    // backgroundColor:"red",
                    marginTop: "100px",
                    height: "100px",
                    backgroundColor: "transparent",
                }}
                    colSpan="10%"
                >
                    <Avatar size={64}
                        style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </ProCard>
                <ProCard
                    title={
                        <div
                            style={{
                                fontSize: "18px",
                            }}
                        >
                            用户昵称 : {userName}
                        </div>
                    }
                    style={{
                        // backgroundColor:"yellow",
                        height: "100px",
                        marginTop: "100px",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                    }}

                    headerBordered
                >
                </ProCard>
                <ProCard style={{
                    // backgroundColor:"red",
                    flexGrow: 1,
                    marginTop: "118px",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    alignItems: "center", // 添加这行代码来实现垂直居中
                }}
                    colSpan={"10%"}
                >
                </ProCard>
            </ProCard>
            <ProCard
                style={{
                    marginTop: "20px",
                    width: "80%",
                    marginLeft: "10%",
                    marginRight: "10%",
                    height: "100%",
                }}
                title="用户信息"
                headerBordered
                extra={renderUserActions()}
            >
                {/* 用户基本信息展示 */}
            </ProCard>

            {/* 修改密码弹窗 */}
            <Modal
                title="修改密码"
                open={isPasswordModalVisible}
                onCancel={() => setIsPasswordModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handlePasswordChange}
                    layout="vertical"
                >
                    <Form.Item
                        name="oldPassword"
                        label="当前密码"
                        rules={[{ required: true, message: '请输入当前密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="新密码"
                        rules={[
                            { required: true, message: '请输入新密码' },
                            { min: 6, message: '密码长度至少6位' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="确认新密码"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: '请确认新密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            确认修改
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* 通知中心弹窗 */}
            <Modal
                title="通知中心"
                open={isNotificationModalVisible}
                onCancel={() => setIsNotificationModalVisible(false)}
                footer={null}
                width={600}
            >
                {renderNotificationList()}
            </Modal>
            {contextHolder}
        </Layout>
    );
};

export default User;