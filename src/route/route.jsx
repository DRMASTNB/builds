/* eslint-disable react/jsx-key */
import {createBrowserRouter, createRoutesFromElements, Navigate, Route,} from "react-router-dom";
import {HomeWrapper} from "../components/HomeWrapper.jsx";
import User from "../views/User.jsx";
import Login1 from '../views/Login1';

// 添加这行导入语句
import { DepartmentSelect } from "../views/DepartmentSelect.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements([
        // 将根路径重定向到部门选择页面
        <Route path="/" element={<Navigate to="/select-department" replace/>}/>,
        
        // 添加部门选择路由
        <Route path="/select-department" element={<DepartmentSelect/>}/>,
        
        // 其他路由保持不变
        <Route path="/home" element={<HomeWrapper/>}/>,
        <Route path="/user" element={<User/>}/>,
        <Route path="/login1" element={<Login1/>}/>,
    ]),
);