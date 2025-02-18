import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {router} from "./route/route.jsx";
import {RouterProvider} from "react-router-dom";
import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { NotificationProvider } from './contexts/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={zhCN}>
        <NotificationProvider>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
        </NotificationProvider>
    </ConfigProvider>,
)
