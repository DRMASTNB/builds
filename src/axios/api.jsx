import axios from "axios";
import {isLogin, useTokenStore} from "../state/state.jsx";

const api = axios.create({
    // Don't change
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 30000,
});

// 请求拦截器
api.interceptors.request.use(function (config) {
    // 在发送请求之前添加 token 到请求头
    if (isLogin()) {
        const tokenName = useTokenStore.getState().tokenName;
        config.headers[`${tokenName}`] = useTokenStore.getState().tokenValue;
    }
    return config;
}, function (error) {
    // 请求错误时的处理
    return Promise.reject(error);
});

/**
 * 用户登录请求
 * @param {Object} params - 登录参数对象
 * @param {string} params.userAccount - 用户账号
 * @param {string} params.userPassword - 用户密码
 * @returns {Promise} 返回包含登录结果的Promise对象，成功时包含token信息
 */
export const requestLogin = ({userAccount, userPassword}) => {
    return api.post('/user/doLogin', {
        userAccount: userAccount,
        userPassword: userPassword,
    }).then(response => {
        // 拦截返回值，保存 tokenName 和 tokenValue
        const tokenName = response.data.data.tokenName;
        const tokenValue = response.data.data.tokenContent;
        console.log("tokenName: ", tokenName);
        console.log("tokenValue: ", tokenValue);

        const setTokenName = useTokenStore.getState().setTokenName;
        const setTokenValue = useTokenStore.getState().setTokenValue;

        setTokenName(tokenName);
        setTokenValue(tokenValue);
        sessionStorage.setItem('tokenName', tokenName);
        sessionStorage.setItem('tokenValue', tokenValue);

        console.log(response);
        return response;
    }).then(response => {
        const tokenName = useTokenStore.getState().tokenName;
        const tokenValue = useTokenStore.getState().tokenValue;
        console.log('tokenName: ', tokenName);
        console.log('tokenValue: ', tokenValue);
        return response;
    }).catch((error) => {
        // const {code, data, message} = error.response.data;
        // console.log("code data message is " , code, data, message);
        // console.log(error);
        return error.response;
    })
}

/**
 * 获取校区信息
 * @param {string|number} campusId - 校区ID
 * @returns {Promise} 返回包含校区信息的Promise对象
 */
export const requestGetCampusInfo = (campusId) => {
    return api.get(`/api/campus/?campusId=${campusId}`);
}

/**
 * 获取建筑信息
 * @param {string|number} buildingId - 建筑ID
 * @param {number} buildingType - 建筑信息类型：
 *   0: 基本信息
 *   1: 土地档案信息
 *   2: 地下室信息
 *   3: 用电负荷信息
 *   默认: 文物保护状态
 * @returns {Promise} 返回包含建筑相关信息的Promise对象
 */
export const requestGetBuildingInfo = (buildingId,buildingType) => {
    if(buildingType == 0){
        return api.get(`/api/building/?buildingId=${buildingId}/basicInfo`);
    }else if(buildingType == 1){
        return api.get(`/api/building/?buildingId=${buildingId}/landArchiesInfo`);
    }else if(buildingType == 2){
        return api.get(`/api/building/?buildingId=${buildingId}/basementInfo`);
    } else if (buildingType == 3) {
        return api.get(`/api/building/?buildingId=${buildingId}/electricalLoad`);
    }
    return api.get(`/api/building/?buildingId=${buildingId}/heritageStatus`);
}

/**
 * 获取房间信息
 * @param {string|number} roomId - 房间ID
 * @param {number} roomType - 房间信息类型：
 *   0: 基本信息
 *   1: 合规性信息
 *   2: 当前功能
 *   3: 消防设备合规性
 *   4: 布局和设备
 *   5: 维护记录
 *   6: 反馈和维修
 *   默认: 问题指导和评估
 * @returns {Promise} 返回包含房间相关信息的Promise对象
 */
export const requestGetRoomInfo = (roomId,roomType) => {
    if(roomType == 0){
        return api.get(`/api/room/?roomId=${roomId}/basicInfo`);
    }else if(roomType == 1){
        return api.get(`/api/room/?roomId=${roomId}/compliance`);
    } else if (roomType == 2) {
        return api.get(`/api/room/?roomId=${roomId}/currentFunction`);
    } else if (roomType == 3) {
        return api.get(`/api/room/?roomId=${roomId}/fireEquipmentCompliance`);
    } else if (roomType == 4) { 
        return api.get(`/api/room/?roomId=${roomId}/layoutAndDevices`);
    } else if (roomType == 5) { 
        return api.get(`/api/room/?roomId=${roomId}/maintenanceRecords`);
    } else if (roomType == 6) {
        return api.get(`/api/room/?roomId=${roomId}/feedbackAndRepair`);
    } 
    return api.get(`/api/room/?roomId=${roomId}/problemGuidanceAndEvaluation`);
}

/**
 * 获取变电站负荷状态信息
 * @param {string|number} substationId - 变电站ID
 * @returns {Promise} 返回包含变电站负荷状态信息的Promise对象
 */
export const requestGetSubstationInfo = (substationId) => {
        return api.get(`/api/substation/?substationId=${substationId}/loadStatus`); 
}

/**
 * 获取设备生命周期和维护信息
 * @param {string|number} deviceId - 设备ID
 * @returns {Promise} 返回包含设备生命周期和维护信息的Promise对象
 */
export const requestGetDeviceInfo = (deviceId) => {
        return api.get(`/api/device/?deviceId=${deviceId}/lifecycleAndMaintenance`); 
}







