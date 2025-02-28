import {create} from 'zustand';
import dayjs from "dayjs";

const longAgo = dayjs("2000-01-01")
const now = dayjs();

export const useUserStore = create((set) => ({
    username: sessionStorage.getItem('username') || '',
    setUsername: (username) => {
        sessionStorage.setItem('username', username);
        set({username});
    },
    password: '',
    setPassword: (password) => set({password}),
    userRole: sessionStorage.getItem('userRole') || '',
    setUserRole: (userRole) => {
        sessionStorage.setItem('userRole', userRole);
        set({userRole});
    },
    clearUser: () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userRole');
        set({ username: '', password: '', userRole: '' });
    }
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
    setTokenName: (tokenName) => {
        sessionStorage.setItem('tokenName', tokenName);
        set({tokenName});
    },
    tokenValue: sessionStorage.getItem('tokenValue') || '',
    setTokenValue: (tokenValue) => {
        sessionStorage.setItem('tokenValue', tokenValue);
        set({tokenValue});
    },
    clearToken: () => {
        sessionStorage.removeItem('tokenName');
        sessionStorage.removeItem('tokenValue');
        set({ tokenName: '', tokenValue: '' });
    }
}));

// 用于判断是否登录
export const isLogin = () => {
    const tokenName = useTokenStore.getState().tokenName;
    const tokenValue = useTokenStore.getState().tokenValue;
    const username = useUserStore.getState().username;
    return Boolean(tokenName && tokenValue && username);
}

// 用于登出
export const logout = () => {
    useUserStore.getState().clearUser();
    useTokenStore.getState().clearToken();
}



