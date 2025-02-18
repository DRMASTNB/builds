import {  AppstoreOutlined } from '@ant-design/icons';
export const LEVELS = ['campus', 'plot', 'building', 'floor', 'room']; 

export const TOP_MENU_ITEMS = [
    {
        key: 'archive',
        label: <div style={{ width: '120px', textAlign: 'center' }}>
                 <p style={{ fontSize: "24px", margin: "10px", color: "white" }}>档案信息</p>
               </div>,
               children: [
                { 
                    key: 'archive-1', 
                    label: '档案信息查询',
                    popupClassName:"vertical",
                    children: [
                        { key: 'archive-1-1', label: '楼栋基础信息' },
                        { key: 'archive-1-2', label: '土地档案' },
                        { key: 'archive-1-3', label: '房屋档案' },
                        { key: 'archive-1-4', label: '规划许可证' },
                        { key: 'archive-1-5', label: '是否为文保建筑' },
                    ]
                },
                { 
                    key: 'archive-2', 
                    label: '变更查询',
                }
            ]
    },
    {
        key: 'function',
        label: <div style={{ width: '120px', textAlign: 'center' }}>
                 <p style={{ fontSize: "24px", margin: "10px", color: "white" }}>功能用途</p>
               </div>,
        children: [
            { key: 'function-1', label: '建筑合规使用性质' },
            { key: 'function-2', label: '现状功能描述' ,children:[
                { key: 'function-2-1', label: '房间编号一览表' },
                { key: 'function-2-2', label: '房间用途' },
                { key: 'function-2-3', label: '消防设施合规性' },
                { key: 'function-2-4', label: '消防风险提示' },
            ]},
            { key: 'function-3', label: '稀缺功能区' },
            { key: 'function-4', label: '人防区域' },
            { key: 'function-5', label: '现状防火分区' },
        ]
    },

    {
        key: 'power',
        label: <div style={{ width: '120px', textAlign: 'center' }}>
                 <p style={{ fontSize: "24px", margin: "10px", color: "white" }}>配电信息</p>
               </div>,
        children: [
            { key: 'power-1', label: '供给接入端' },
            { key: 'power-2', label: '变电所位置及最大负荷' },
            { key: 'power-3', label: '输出分配' },
        ]
    },
    {
        key: 'construction',
        label: <div style={{ width: '120px', textAlign: 'center' }}>
                 <p style={{ fontSize: "24px", margin: "10px", color: "white" }}>建设信息</p>
               </div>,
        children: [
            { key: 'construction-1', label: '立项信息' },
            { key: 'construction-2', label: '基本建设信息' },
            { key: 'construction-3', label: '归档信息',children:[
                { key: 'construction-3-1', label: '运维标准状态' },
                { key: 'construction-3-2', label: '房屋基本信息' },
                { key: 'construction-3-3', label: '关键设备分布' },
                { key: 'construction-3-4', label: '关键设备维保讯息' },
                { key: 'construction-3-5', label: '网络设备' },
                { key: 'construction-3-6', label: '其他智能化设备' },
            ] },
        ]
    },
    {
        key: 'maintenance',
        label: <div style={{ width: '120px', textAlign: 'center' }}>
                 <p style={{ fontSize: "24px", margin: "10px", color: "white" }}>运维信息</p>
               </div>,
        children: [
            { key: 'maintenance-1', label: '基本运维信息' },
            { key: 'maintenance-2', label: '后期运维' ,children:[
                { key: 'maintenance-2-1', label: '定期反馈检查' },
                { key: 'maintenance-2-2', label: '维修记录' },
                { key: 'maintenance-2-3', label: '问题判断与指引' },
            ]},
            { key: 'maintenance-3', label: '使用方评价' },
        ]
    },
];
export const SIDE_MENU_ITEMS = [
    {
        key: 'campus',
        label: '校区',
        children: [
            { key: 'gulou', label: '鼓楼校区' },
            { key: 'xianlin', label: '仙林校区' },
        ]
    },
    {
        key: 'plot',
        label: '地块',
        icon: <AppstoreOutlined />,
        children: [
            { key: 'plot1', label: '蒙明伟楼地块' },
            { key: 'plot2', label: '图书馆地块' },
        ]
    },
    {
        key: 'building',
        label: '楼栋',
        icon: <AppstoreOutlined />,
        children: [
            { key: 'plot1', label: '蒙明伟楼' },
            { key: 'plot2', label: '楼二' },
        ]
    },
    {
        key: 'floor',
        label: '楼层',
        icon: <AppstoreOutlined />,
        children: [
            { key: 'plot1', label: '1F' },
            { key: 'plot2', label: '2F' },
        ]
    },
    {
        key: 'room',
        label: '房间',
        icon: <AppstoreOutlined />,
        children: [
            { key: 'plot1', label: '101' },
            { key: 'plot2', label: '102' },
        ]
    },
];
export const TABLE_COLUMNS = [
    {
        title: '楼宇名称',
        dataIndex: 'buildingName',
        key: 'buildingName',
    },
    {
        title: '建设项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
    },
    {
        title: '项目建设时间',
        dataIndex: 'projectTime',
        key: 'projectTime',
    },
    {
        title: '项目竣工时间',
        dataIndex: 'projectCompletionTime',
        key: 'projectCompletionTime',
    },
    {
        title: '建筑用途',
        dataIndex: 'buildingUsage',
        key: 'buildingUsage',
    },
    {
        title: '规模',
        dataIndex: 'buildingScale   ',
        key: 'buildingScale',
        colSpan: 2,
    },
    {
        title: '层数',
        dataIndex: 'buildingFloor',
        key: 'buildingFloor',
    },
    {
        title: '项目初始设计时间',
        dataIndex: 'projectInitialDesignTime',
        key: 'projectInitialDesignTime',
    },
    
]
