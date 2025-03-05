import axios from "axios";
import {isLogin, useTokenStore} from "../state/state.jsx";

const api = axios.create({
    // Don't change
    baseURL: 'http://localhost:8080',
    timeout: 30000,
});

// 请求拦截器
api.interceptors.request.use(function (config) {
    // 在发送请求之前添加 token 到请求头
    if (isLogin()) {
        const tokenName = useTokenStore.getState().tokenName;
        // 添加判断，确保 tokenName 不为空
        if (tokenName && tokenName.trim()) {
            config.headers[tokenName] = useTokenStore.getState().tokenValue;
        }
    }
    return config;
}, function (error) {
    console.log('请求拦截器错误:', error);
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
    console.log('开始执行登录请求函数');
    console.log('请求参数:', {userAccount, userPassword});
    
    try {
        console.log('即将发送请求...');
        return api.post('/api/users/login', {
            username: userAccount,
            password: userPassword,
        }).then(response => {
            console.log('收到响应:', response.data);
            const token = response.data.data.token; 
            console.log("token: ", token);
            const setTokenName = useTokenStore.getState().setTokenName;
            const setTokenValue = useTokenStore.getState().setTokenValue;

            // 使用固定的 tokenName
            setTokenName('Authorization');
            setTokenValue(`Bearer ${token}`); 
            sessionStorage.setItem('tokenName', 'Authorization');
            sessionStorage.setItem('tokenValue', `Bearer ${token}`);
            sessionStorage.setItem('username', userAccount);
            sessionStorage.setItem('userRole', response.data.data.userRole);

            return response;
        }).catch((error) => {
            console.error('请求错误:', error);
            // 打印更完整的错误信息
            if (error.response) {
                console.error('错误响应数据:', error.response.data);
                console.error('错误状态码:', error.response.status);
            } else if (error.request) {
                console.error('请求已发送但没有收到响应');
                console.error(error.request);
            } else {
                console.error('请求配置错误:', error.message);
            }
            return error.response;
        });
    } catch (error) {
        console.error('请求执行异常:', error);
        return Promise.reject(error);
    }
}
export const requestRegister = ({userAccount, userPassword, roleIds}) => {
    console.log(userAccount, userPassword, roleIds);
    return api.post('/api/users/register', {
        username: userAccount,
        password: userPassword,
        roleIds: roleIds
    }).then(response => {
        return response;
    }).catch(error => {
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
 *   4: 楼层数
 *   默认: 文物保护状态
 * @returns {Promise} 返回包含建筑相关信息的Promise对象
 */
export const requestGetBuildingInfo = (buildingId,buildingType) => {
    if(buildingType == 0){
        return api.get(`/api/building/${buildingId}/basicInfo`).then(response=>{
            return response.data
        }).catch(error=>{
            return error;
        })  ;
    }else if(buildingType == 1){
        return api.get(`/api/building/?buildingId=${buildingId}/landArchiesInfo`).then(response=>{
            return response.data;
        }).catch(error=>{
            return error.response;
        });
    }else if(buildingType == 2){
        return api.get(`/api/building/?buildingId=${buildingId}/basementInfo`);
    } else if (buildingType == 3) {
        return api.get(`/api/building/?buildingId=${buildingId}/electricalLoad`);
    } else if (buildingType == 4) {
        return api.get(`/api/floor/building/${buildingId}`).then(response=>{
            return response.data;
        }).catch(error=>{
            return error.response;
        })  ;
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
        return api.get(`/api/room/${roomId}/details`).then(response=>{
            return response.data;
        }).catch(error=>{
            return error.response;
        });
    }else if(roomType == 1){
        return api.get(`/api/room/${roomId}/compliance`).then(response=>{
            return response.data;
        }).catch(error=>{
            return error.response;
        });
    } else if (roomType == 2) {
        return api.get(`/api/room/${roomId}/currentFunction`).then(response=>{
            return response.data;
        }).catch(error=>{
            return error.response;
        });
    } else if (roomType == 3) {
        return api.get(`/api/room/${roomId}/fireEquipmentCompliance`).then(response=>{
            return response.data;
        }).catch(error=>{
            return error.response;
        });
    } else if (roomType == 4) { 
        return api.get(`/api/room/${roomId}/layoutAndDevices`).then(response=>{
            return response.data;
        }).catch(error=>{
            return error.response;
        });
    } else if (roomType == 5) { 
                return api.get(`/api/room/${roomId}/maintenanceRecords`).then(response=>{
            return response.data;
        }).catch(error=>{
            return error.response;
        });
    } else if (roomType == 6) {
        return api.get(`/api/room/${roomId}/feedbackAndRepair`).then(response=>{
            return response.data;
        }).catch(error=>{
            return error.response;
        });
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
        return api.get(`/api/construction-info/floor/${deviceId}/materials`); 
}


export const requestFloorInfo = (floorId) => {
    return api.get(`/api/floor/${floorId}/rooms`).then(response=>{
        return response.data;
    }).catch(error=>{
        return error.response;
    });
}

