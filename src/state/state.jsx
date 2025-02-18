import {create} from 'zustand';
import dayjs from "dayjs";

const longAgo = dayjs("2000-01-01")
const now = dayjs();

export const useUserStore = create((set) => ({
    username: sessionStorage.getItem('username') || '',
    setUsername: (username) => set({username}),
    password: '',
    setPassword: (password) => set({password}),
    userRole: sessionStorage.getItem('userRole') || '',
    setUserRole: (userRole) => set({userRole}),
}));

export const useNewsSelectStore = create((set) => ({
    dates: [longAgo, now],
    setDates: (dates) => set({dates}),
    timeOrder: 1,
    setTimeOrder: (timeOrder) => set({timeOrder}),
    categories: [],
    setCategories: (categories) => set({categories}),
    source: '',
    setSource: (source) => set({source}),
}))


export const useTokenStore = create((set) => ({
    tokenName: sessionStorage.getItem('tokenName') || '',
    setTokenName: (tokenName) => set({tokenName}),
    tokenValue: sessionStorage.getItem('tokenValue') || '',
    setTokenValue: (tokenValue) => set({tokenValue}),
}));


// 用于判断是否登录
export const isLogin = () => {
    const tokenName = useTokenStore.getState().tokenName;
    const tokenValue = useTokenStore.getState().tokenValue;
    return true;
}



