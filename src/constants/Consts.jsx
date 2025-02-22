import {  AppstoreOutlined } from '@ant-design/icons';
import { Table,Button } from 'antd';
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
        title: '房间号',
        dataIndex: 'roomNumber',
        key: 'roomNumber',
    },
    {
        title: '房间用途',
        dataIndex: 'roomUsage',
        key: 'roomUsage',
    },
    {
        title: '使用部门',
        dataIndex: 'useDepartment',
        key: 'useDepartment',
    },
    {
        title: '使用面积',
        dataIndex: 'useArea',
        key: 'useArea',
    },
    {
        title: '实际用途',
        dataIndex: 'actualUsage',
        key: 'actualUsage',
    },
    {
        title: '建设时间',
        dataIndex: 'buildingTime',  
        key: 'buildingTime',
    },
    {
        title: '消防设施合规性',
        dataIndex: 'fireFacilityCompliance',
        key: 'fireFacilityCompliance',
    },
    {
        title: '消防风险提示',
        dataIndex: 'fireRiskTips',
        key: 'fireRiskTips',
    },
    {
        title: '运维标准状态',
        dataIndex: 'maintenanceStandardStatus',
        key: 'maintenanceStandardStatus',
    },
    {
        title: '现场审核',
        dataIndex: 'siteAudit',
        key: 'siteAudit',
        width: 150,
    },
    
    
]
export const TABLE_COLUMNS_DEVICE = [
    {
        title: '房间号',
        dataIndex: 'roomNumber',
        key: 'roomNumber',
    },
    {
        title: '电动遮阳页',
        dataIndex: 'electricShutter',
        key: 'electricShutter',
    },
    {
        title: '教室照明灯',
        dataIndex: 'classroomLighting',
        key: 'classroomLighting',
    },
    {
        title: '黑板灯',
        dataIndex: 'blackboardLight',
        key: 'blackboardLight',
    }
    
]
export const TABLE_COLUMNS_DEVICESERIVE = [
    {
        title: '列项',
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: '电动遮阳页',
        dataIndex: 'electricShutter',
        key: 'electricShutter',
    },
    {
        title: '教室照明灯',
        dataIndex: 'classroomLighting',
        key: 'classroomLighting',
    },
    {
        title: '黑板灯',
        dataIndex: 'blackboardLight',
        key: 'blackboardLight',
    }
    
]
const type = [
    {
        label: '变电所名称',
        children: '蒙民伟楼变电所',
    },

]
const columns = [
    {
        title: '变压器名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '负载率',
        dataIndex: 'loadRate',
        key: 'loadRate',
    },
    {
        title: '年份',
        dataIndex: 'year',
        key: 'year',
    },
    
]
const dataSource = [
    { name: '变压器1', year: '2020',loadRate: '10%' },
    { name: '变压器2', year: '2021',loadRate: '20%' },
    { name: '变压器3', year: '2022',loadRate: '30%' },
]
export const ELECTRIC_SHUTTER_DATA = [
    { label: '变电所名称', children: '蒙民伟楼变电所',span:2 },
    { label: '变电所位置', children: '蒙民伟楼地下二层',span:2 },
    { label: '建设投运时间', children: '2003年6月',span:2 },
    { label: '总装机容量', children: '2*1600KVA',span:2 },
    { label: '变压器历史最高负载率', children: <Table columns={columns} dataSource={dataSource} pagination={false}></Table>},
    {label:'溯源表格',children: <Button  type="link"> 无权限查看</Button>},
    { label: '主要元器件大修情况', children: '无'},
    { label: '改造大修时间', children: '无'},
    { label: '变电所下级配电间', children: '蒙民伟楼地下两层~地上27层合计29间',span:2},
]


