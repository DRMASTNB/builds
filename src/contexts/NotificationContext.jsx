import React, { createContext, useContext, useState, useEffect } from 'react';
import { notification } from 'antd';
import { notificationService } from '../services/notificationService';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        // 初始加载通知
        fetchInitialNotifications();
        
        // 连接 WebSocket
        notificationService.connect();
        
        // 订阅新通知
        const unsubscribe = notificationService.subscribe(handleNewNotification);
        
        return () => {
            unsubscribe();
            notificationService.disconnect();
        };
    }, []);

    const fetchInitialNotifications = async () => {
        try {
            const response = await fetch('/api/notifications', {
                headers: {
                    [sessionStorage.getItem('tokenName')]: sessionStorage.getItem('tokenValue')
                }
            });
            const data = await response.json();
            setNotifications(data);
            updateUnreadCount(data);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const handleNewNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
        updateUnreadCount([notification, ...notifications]);
        
        // 显示通知提醒
        api.info({
            message: notification.title,
            description: notification.content,
            placement: 'topRight',
        });
    };

    const updateUnreadCount = (notificationsList) => {
        const count = notificationsList.filter(n => !n.read).length;
        setUnreadCount(count);
    };

    const markAsRead = async (notificationId) => {
        try {
            await fetch(`/api/notifications/${notificationId}/read`, {
                method: 'POST',
                headers: {
                    [sessionStorage.getItem('tokenName')]: sessionStorage.getItem('tokenValue')
                }
            });
            
            setNotifications(prev => 
                prev.map(n => 
                    n.id === notificationId ? { ...n, read: true } : n
                )
            );
            updateUnreadCount(notifications);
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch('/api/notifications/read-all', {
                method: 'POST',
                headers: {
                    [sessionStorage.getItem('tokenName')]: sessionStorage.getItem('tokenValue')
                }
            });
            
            setNotifications(prev => 
                prev.map(n => ({ ...n, read: true }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error);
        }
    };

    return (
        <NotificationContext.Provider 
            value={{
                notifications,
                unreadCount,
                markAsRead,
                markAllAsRead
            }}
        >
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => useContext(NotificationContext); 