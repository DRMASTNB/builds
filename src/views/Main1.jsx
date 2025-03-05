import { useEffect, useState, useMemo } from 'react';
import { Layout, Menu, Button, Badge, Space, message } from "antd";
import {  UserOutlined } from '@ant-design/icons';
import backgroundImage from '../assets/LoginBackground2.jpg';
import logo2 from "../assets/Dplogo.png";
import Scene3D from '../components/Scene3D.jsx'
import { LEVELS, TOP_MENU_ITEMS, TABLE_COLUMNS, TABLE_COLUMNS_DEVICE, ELECTRIC_SHUTTER_DATA,SAMPLE_EQUIPMENT_DATA  } from '../constants/Consts';
import DraggableTable from '../components/DraggableTable';
import DraggableData from '../components/DraggableData';
import { useNavigate } from "react-router-dom";
import { requestGetBuildingInfo, requestGetRoomInfo, requestFloorInfo, requestGetDeviceInfo } from '../axios/api.jsx';
const { Sider, Content } = Layout;

const Main1 = () => {
    const navigate = useNavigate();
    const [buildingInfo, setBuildingInfo] = useState([]);
    const [buildingachive, setBuildingachive] = useState([]);
    const [currentLevel, setCurrentLevel] = useState('campus');
    const [deviceInfo, setDeviceInfo] = useState([]);
    const [draggableTableControls, setDraggableTableControls] = useState({
        roomInfo: false,
        buildingachive: false,
        deviceInfo: false,
        electricShutter: false,
        assetInfo: false
    });
    const [selectedItems, setSelectedItems] = useState({
        campus: 'gulou',
        plot: null,
        building: null,
        floor: null,
        room: null
    });
    const [menuData, setMenuData] = useState({
        plots: [],      // 地块列表
        buildings: [],  // 楼栋列表
        floors: [],     // 楼层列表
        rooms: []       // 房间列表
    });
    const sendMessageToIframe = (message) => {
        const iframe = document.querySelector('iframe');
        if (iframe) {
            iframe.contentWindow.postMessage(message, '*'); // 生产环境建议指定具体域名
        }
    };

    // 处理菜单项选择
    const handleMenuSelect = async ({ key }) => {
        console.log(key);
        const [level, value] = key.split('-');
        let mockPlots, mockBuildings, mockFloors;

        setSelectedItems(prev => ({
            ...prev,
            [level]: value
        }));

        // Update menu data based on selection
        try {
            switch (level) {
                case 'campus':
                    mockPlots = value === 'gulou' ? [
                        { id: 'plot1', name: '蒙民伟楼地块' },
                        { id: 'plot2', name: '图书馆地块' }
                    ] : [
                        { id: 'plot3', name: '仙林教学楼地块' },
                        { id: 'plot4', name: '仙林图书馆地块' }
                    ];
                    setMenuData(prev => ({ ...prev, plots: mockPlots, buildings: [], floors: [], rooms: [] }));
                    break;
                case 'plot':
                    mockBuildings = [
                        { id: 'building1', name: '蒙民伟楼' },
                    ];
                    setMenuData(prev => ({ ...prev, buildings: mockBuildings, floors: [], rooms: [] }));
                    break;
                case 'building':
                    mockFloors = [
                        { id: 'L1', name: '1F' },
                        { id: 'L2', name: '2F' },
                        { id: 'L3', name: '3F' },
                        { id: 'L4', name: '4F' },
                        { id: 'L5', name: '5F' },
                        { id: 'L6', name: '6F' },
                        { id: 'L7', name: '7F' },
                        { id: 'L8', name: '8F' },
                        { id: 'L9', name: '9F' },
                        { id: 'L10', name: '10F' }
                    ];
                    var response=await requestGetBuildingInfo(2,4)
                    console.log(response)
                    // 模拟数据了，这边需要修改
                    setMenuData(prev => ({ ...prev, floors: mockFloors, rooms: [] }));
                    break;
                case 'floor':
                    break;
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }

        setCurrentLevel(level);
    };

    // 更新获取菜单项样式的逻辑
    const getMenuItemStyle = (level) => {

        const currentIndex = LEVELS.indexOf(currentLevel);
        const itemIndex = LEVELS.indexOf(level);
        const isActive = itemIndex <= currentIndex;

        return {
            backgroundColor: isActive ? '#f0f0f0' : 'transparent',
            fontWeight: isActive ? 'bold' : 'normal'
        };
    };
    const fetchBuildingachive = () => {
        var roomInfos=[];
        const rooms= requestFloorInfo(1);
        // 遍历rooms，获取每个房间的房间信息
        // rooms.map(room=>{
        //     const response= requestGetRoomInfo(room.id,0);
        //     roomInfos.push(response);
        // });
        // console.log(roomInfos);
        const response= requestGetRoomInfo(1,0);
        console.log(response);
        const rawData = [
            {
                roomNumber: '103/104',
                roomUsage: '教室',
                useDepartment: '教务处',
                useArea: '50',
                actualUsage: '教学',
                buildingTime: '2001~2003年',
                fireFacilityCompliance: '合格',
                siteAudit: '无',
                
            },
            {
                roomNumber: '102',
                roomUsage: '实验室',
                useDepartment: '教务处',
                useArea: '50',
                actualUsage: '科研',
                buildingTime: '2001~2003年',
                fireFacilityCompliance: '合格',
                siteAudit: '无',
            },
            {
                roomNumber: '106',
                roomUsage: '教室',
                useDepartment: '教务处',
                useArea: '50',
                actualUsage: '教学',
                buildingTime: '2001~2003年',
                fireFacilityCompliance: '合格',
                siteAudit: '无',
            }
        ];
        if (buildingachive.length === 0) {
            setBuildingachive(rawData);
        }
    };
    const fetchBuildingInfo = async () => {
       const response= await requestGetBuildingInfo(2, 0);
       console.log(response);
        const rawData = [
            {
                buildingName: '蒙民维楼',
                projectName: '南京大学科技楼二期',
                projectTime: '2001~2003年',
                projectCompletionTime: '2003年11月21日',
                buildingUsage: '科研与教学',
                buildingScale: '地上',
                buildingScale2: '30000',
                buildingFloor: '地上28层，地下2层',
                projectInitialDesignTime: '2000年',
                landachive: '无',
                protect:"否",
                buildingachive: '无'
            }
        ];

        // 定义字段映射和显示顺序
        const fieldOrder = [
            'buildingName',
            'projectName',
            'buildingUsage',
            'buildingScale',
            'buildingFloor',
            'projectTime',
            'projectCompletionTime',
            'projectInitialDesignTime',
            'landachive',
            'protect',
            'buildingachive'
        ];

        const fieldMapping = {
            buildingName: '建筑名称',
            projectName: '项目名称',
            projectTime: '项目时间',
            projectCompletionTime: '竣工时间',
            buildingUsage: '建筑用途',
            buildingFloor: '建筑楼层',
            projectInitialDesignTime: '初始设计时间',
            landachive: '土地档案',
            protect: '是否文保建筑',
            buildingachive: '房屋档案'
        };

        // 按照指定顺序转换数据
        const formattedData = fieldOrder.map((key, index) => {
            if (key === 'buildingScale') {
                return {
                    key: String(index + 1),
                    label: '建筑规模',
                    children: <span style={{ whiteSpace: 'normal' }}>{`${rawData[0].buildingScale}${rawData[0].buildingScale2}平方米`}</span>
                };
            }
            if (key === 'buildingScale2') return null;

            return {
                key: String(index + 1),
                label: fieldMapping[key] || key,
                children: <span style={{ whiteSpace: 'normal' }}>{rawData[0][key]}</span>
            };
        }).filter(Boolean);

        setBuildingInfo(formattedData);
    };
    const fetchDeviceInfo = () => {
        // 获取设备信息
        const response= requestGetDeviceInfo(1);
        console.log(response);
        setDeviceInfo(SAMPLE_EQUIPMENT_DATA);
    
    }
    
    const MenuItemClick = async ({ key }) => {
        // Check current level before processing menu clicks
        if (key.startsWith('archive-') || key.startsWith('power-')) {
            if (!selectedItems.building) {
                message.warning('请先选择楼栋');
                return;
            }
        }

        if (key.startsWith('function-') || key.startsWith('construction-') || key.startsWith('maintenance-')) {
            if (!selectedItems.floor) {
                message.warning('请先选择楼层');
                return;
            }
        }

        try {
            switch (key) {
                // 档案信息
                case 'archive-1-1':
                    await fetchBuildingInfo();
                    setDraggableTableControls(prev => ({
                        ...prev,
                        roomInfo: !prev.roomInfo
                    }));
                    console.log(selectedItems)
                    if(selectedItems.building!=null){
                        sendMessageToIframe({
                            cmdCode:406,
                            targetCode:"MCYB_A02.01_C3_Z1",
                            params:{
                              targetIds:["MCYB_A02.01_C3_Z1"]
                            }
                        });
                    }
                    break;
                case 'archive-1-2':
                    await fetchBuildingInfo();
                    setDraggableTableControls(prev => ({
                        ...prev,
                        roomInfo: !prev.roomInfo
                    }));
                    if(selectedItems.building!=null){
                        sendMessageToIframe({
                            cmdCode:406,
                            targetCode:"MCYB_A02.01_C3_Z1",
                            params:{
                              targetIds:["MCYB_A02.01_C3_Z1"]
                            }
                        });
                    }
                    break;
                case 'archive-1-3':
                    fetchBuildingachive();
                    setDraggableTableControls(prev => ({
                        ...prev,
                        buildingachive: !prev.buildingachive
                    }));
                    break;

                case 'function-1':
                    break;
                case 'function-2-2':
                    fetchBuildingachive();
                    setDraggableTableControls(prev => ({
                        ...prev,
                        buildingachive: !prev.buildingachive
                    }));
                    if(selectedItems.floor!=null){
                        sendMessageToIframe({
                            cmdCode:530,
                            targetCode:"MCYB_A02.01_C3_Z1/MCYB_A02.03_C3_"+selectedItems.floor,
                            params:{
                              targetIds:["MCYB_A02.01_C3_Z1/MCYB_A02.03_C3_"+selectedItems.floor]
                            }
                        });
                    }
                        break;
                // ... 其他功能用途子项
                case 'function-2-3':
                    fetchBuildingachive();
                    setDraggableTableControls(prev => ({
                        ...prev,
                        buildingachive: !prev.buildingachive
                    }));
                    break;
                // 配电信息
                case 'power-1':
                case 'power-2':
                    setDraggableTableControls(prev => ({
                        ...prev,
                        electricShutter: !prev.electricShutter
                    }));
                    break;

                // 建设信息
                case 'construction-3-1':
                    fetchBuildingachive();
                    setDraggableTableControls(prev => ({
                        ...prev,
                        buildingachive: !prev.buildingachive
                    }));
                    break;
                case 'construction-3-3':fetchDeviceInfo();
                    setDraggableTableControls(prev => ({
                        ...prev,
                       deviceInfo: !prev.deviceInfo
                    }));
                    break;
                case 'construction-3-4':fetchDeviceInfo();
                    setDraggableTableControls(prev => ({
                        ...prev,
                        deviceInfo: !prev.deviceInfo
                    }));
                    break;
                // 运维信息
                case 'maintenance-1':
                case 'maintenance-2-2':
                    fetchBuildingachive();
                    setDraggableTableControls(prev => ({
                        ...prev,
                        buildingachive: !prev.buildingachive
                    }));

                    break;

                default:
                    break;

            }
        } catch (error) {
            console.error('Error in MenuItemClick:', error);
            message.error('获取数据失败，请稍后重试');
        }
    };
    // 添加处理层级变化的副作用
    useEffect(() => {
        const currentIndex = LEVELS.indexOf(currentLevel);
        const newSelectedItems = { ...selectedItems };

        // 清除当前层级之后的选择
        LEVELS.forEach((level, index) => {
            if (index > currentIndex) {
                newSelectedItems[level] = null;
            }
        });
        const handleMessage = (event) => {

            // 处理来自 iframe 的消息
            const message = event.data;
            var parsedMessage = null
            try {
                // 如果消息是字符串，尝试解析为 JSON
                parsedMessage = typeof message === 'string' ? JSON.parse(message) : message;
            } catch (error) {
                console.error('消息解析失败:', error);
                return;
            }
            console.log('解析后的消息：', parsedMessage);

            // 根据消息类型处理不同的场景
          
            if(parsedMessage.source === 'Doublepick'){
               if(parsedMessage.targetCode === 'MCYB_A02.01_C3_Z1'){
                    setCurrentLevel('building');
                    setSelectedItems(prev => ({
                        ...prev,
                        campus: 'gulou',
                        plot: 'plot1',
                        building: 'building1'
                    }));
                    setMenuData(prev => ({
                        ...prev,
                        plots: [
                            { id: 'plot1', name: '蒙民伟楼地块' },
                            { id: 'plot2', name: '图书馆地块' }
                        ],
                        buildings: [
                            { id: 'building1', name: '蒙民伟楼' },
                            { id: 'building2', name: '楼二' }
                        ],
                        floors: [
                            { id: 'L1', name: '1F' },
                            { id: 'L2', name: '2F' },
                            { id: 'L3', name: '3F' },
                            { id: 'L4', name: '4F' },
                            { id: 'L5', name: '5F' },
                            { id: 'L6', name: '6F' },
                            { id: 'L7', name: '7F' },
                            { id: 'L8', name: '8F' },
                            { id: 'L9', name: '9F' },
                            { id: 'L10', name: '10F' },
                            { id: 'L11', name: '11F' },
                            { id: 'L12', name: '12F' },
                            { id: 'L13', name: '13F' },

                        ],
                        rooms: []

                    }));
                   
                }else if(parsedMessage.targetCode.startsWith('MCYB_A02.01_C3_Z1/')){
                    
                    setCurrentLevel('floor');
                    setSelectedItems(prev => ({
                        ...prev,
                        floor: parsedMessage.targetCode.slice(-2)
                    }));
                    console.log(selectedItems)
                }
            }
        };

        setSelectedItems(newSelectedItems);
        
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [currentLevel]);
    const handleSelectedItemsChange = (newItems) => {
        setSelectedItems(newItems);
    };

    // 修改generateMenuItems函数以包含所有层级
    const generateMenuItems = () => {
        const baseItems = [
            {
                key: 'campus',
                label: '校区',
                style: getMenuItemStyle('campus'),
                children: [
                    {
                        key: 'campus-gulou',
                        label: '鼓楼校区',
                        style: {
                            backgroundColor: selectedItems.campus === 'gulou' ? '#f0f0f0' : 'transparent',
                            fontWeight: selectedItems.campus === 'gulou' ? 'bold' : 'normal'
                        }
                    },
                    {
                        key: 'campus-xianlin',
                        label: '仙林校区',
                        style: {
                            backgroundColor: selectedItems.campus === 'xianlin' ? '#f0f0f0' : 'transparent',
                            fontWeight: selectedItems.campus === 'xianlin' ? 'bold' : 'normal'
                        }
                    }
                ]
            }
        ];

        // 地块层级
        if (selectedItems.campus && menuData.plots.length > 0) {
            baseItems.push({
                key: 'plot',
                label: '地块',
                style: getMenuItemStyle('plot'),
                children: menuData.plots.map(plot => ({
                    key: `plot-${plot.id}`,
                    label: plot.name,
                    style: {
                        backgroundColor: selectedItems.plot === plot.id ? '#f0f0f0' : 'transparent',
                        fontWeight: selectedItems.plot === plot.id ? 'bold' : 'normal'
                    }
                }))
            });
        }

        // 楼栋层级
        if (selectedItems.plot && menuData.buildings.length > 0) {
            baseItems.push({
                key: 'building',
                label: '楼栋',
                style: getMenuItemStyle('building'),
                children: menuData.buildings.map(building => ({
                    key: `building-${building.id}`,
                    label: building.name,
                    style: {
                        backgroundColor: selectedItems.building === building.id ? '#f0f0f0' : 'transparent',
                        fontWeight: selectedItems.building === building.id ? 'bold' : 'normal'
                    }
                }))
            });
        }

        // 楼层层级
        if (selectedItems.building && menuData.floors.length > 0) {
            baseItems.push({
                key: 'floor',
                label: '楼层',
                style: getMenuItemStyle('floor'),
                children: menuData.floors.map(floor => ({
                    key: `floor-${floor.id}`,
                    label: floor.name,
                    style: {
                        backgroundColor: selectedItems.floor === floor.id ? '#f0f0f0' : 'transparent',
                        fontWeight: selectedItems.floor === floor.id ? 'bold' : 'normal'
                    }
                }))
            });
        }

        // 房间层级
        if (selectedItems.floor && menuData.rooms.length > 0) {
            baseItems.push({
                key: 'room',
                label: '房间',
                style: getMenuItemStyle('room'),
                children: menuData.rooms.map(room => ({
                    key: `room-${room.id}`,
                    label: room.name,
                    style: {
                        backgroundColor: selectedItems.room === room.id ? '#f0f0f0' : 'transparent',
                        fontWeight: selectedItems.room === room.id ? 'bold' : 'normal'
                    }
                }))
            });
        }

        return baseItems;
    };

    // 使用 useMemo 缓存菜单项
    const menuItems = useMemo(() => generateMenuItems(), [
        selectedItems,
        menuData,
        currentLevel
    ]);

    const handleMenuClick = ({ key }) => {
        const [level, value] = key.split('-');

        // 检查是否点击当前选中的项
        if (selectedItems[level] === value) {
            
            // 获取当前层级的索引
            const currentIndex = LEVELS.indexOf(level);

            if (currentIndex >= 0) {
                // 返回上一层级
                const previousLevel = LEVELS[currentIndex];
                setCurrentLevel(previousLevel);
                
                // 清除当前层级及之后的选择
                const newSelectedItems = { ...selectedItems };
                LEVELS.forEach((l, index) => {
                    if (index > currentIndex) {
                        newSelectedItems[l] = null;
                    }
                });
                setSelectedItems(newSelectedItems);
                
                // 清除相应的菜单数据
                setMenuData(prev => {
                    const newMenuData = { ...prev };
                    switch (level) {
                        case 'floor':
                            break;
                        case 'building':
                            newMenuData.rooms = [];
                            break;
                        case 'plot':
                            newMenuData.floors = [];
                            newMenuData.rooms = [];
                            break;
                    }
                    return newMenuData;
                });
            }
        } else {
            // 如果不是当前选中项，调用原有的选择逻辑
            handleMenuSelect({ key });
        }
    };

    return (
        <Layout>
            {/* 顶部区域 */}
            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}>
                {/* Logo和用户信息区域 */}
                <div style={{
                    height: '70px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 32px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                    {/* Logo区域 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <img
                            src={logo2}
                            alt="南京大学"
                            style={{ height: '45px' }}
                        />
                        <span style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            color: 'rgba(255, 255, 255, 0.95)',
                            letterSpacing: '1px'
                        }}>
                            南京大学校园空间协同管理决策辅助系统
                        </span>
                    </div>

                    {/* 用户信息区域 */}
                    <Space size={28}>
                        <Badge count={6} style={{ backgroundColor: '#ff4d4f' }}>
                            <Button
                                type="text"
                                icon={<UserOutlined style={{ fontSize: '20px' }} />}
                                style={{ 
                                    fontSize: '18px',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    padding: '8px 16px'
                                }}
                                onClick={() => navigate('/user')}
                            >
                                用户界面管理界面
                            </Button>
                        </Badge>
                    </Space>
                </div>

                {/* 导航菜单 */}
                <div style={{
                    height: '64px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                    <Menu
                        mode="horizontal"
                        items={TOP_MENU_ITEMS}
                        style={{
                            background: 'transparent',
                            height: '64px',
                            lineHeight: '64px',
                            fontSize: '16px',
                            fontWeight: '500',
                            width: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            border: 'none'
                        }}
                        className="custom-top-menu"
                        onClick={MenuItemClick}
                    />
                </div>
            </div>

            {/* 主要内容区域 */}
            <Layout style={{ 
                minHeight: 'calc(100vh - 134px)',
                background: 'rgba(255, 255, 255, 0.8)',  // 调整背景色为半透明
            }}>
                <Sider 
                    width={320} 
                    style={{ 
                        background: 'rgba(255, 255, 255, 0.9)',  // 调整为半透明背景
                        backdropFilter: 'blur(10px)',  // 添加毛玻璃效果
                        borderRight: '1px solid rgba(0, 0, 0, 0.06)',  // 更柔和的边框
                        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.03)',  // 更柔和的阴影
                        marginRight: '16px',  // 添加右侧间距
                        marginTop: '16px',    // 添加顶部间距
                        borderRadius: '0 8px 8px 0',  // 添加右侧圆角
                    }}
                >
                    <Menu
                        mode="inline"
                        onSelect={handleMenuSelect}
                        onClick={handleMenuClick}
                        defaultOpenKeys={['campus']}
                        selectedKeys={[
                            selectedItems.campus ? `campus-${selectedItems.campus}` : '',
                            selectedItems.plot ? `plot-${selectedItems.plot}` : '',
                            selectedItems.building ? `building-${selectedItems.building}` : '',
                            selectedItems.floor ? `floor-${selectedItems.floor}` : '',
                            selectedItems.room ? `room-${selectedItems.room}` : '',
                        ].filter(Boolean)}
                        style={{ 
                            height: '100%',
                            maxHeight: 'calc(100vh - 134px)',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            fontSize: '15px',
                            padding: '12px 0',
                            background: 'transparent',  // 透明背景
                            border: 'none',  // 移除边框
                        }}
                        // 添加 Menu 组件的主题定制
                        theme="light"
                        // 添加自定义类名以便覆盖默认样式
                        className="custom-side-menu"
                        items={menuItems}
                    />
                </Sider>
                {/* 建筑基本信息 */}
                {draggableTableControls.roomInfo && (
                    <div style={{ position: 'absolute', zIndex: 1000 }}>
                        <DraggableTable
                            dataSource={buildingInfo}
                            defaultPosition={{ x: 24, y: 24 }}
                            columnnumber={1}
                            style={{ 
                                minWidth: '650px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                                borderRadius: '8px'
                            }}
                            title={
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    borderBottom: '1px solid #f0f0f0',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}>
                                    <span>建筑基本信息</span>
                                    <Button
                                        type="text"
                                        size="small"
                                        onClick={() => setDraggableTableControls(prev => ({
                                            ...prev,
                                            roomInfo: !prev.roomInfo
                                        }))}
                                        style={{ padding: '4px' }}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            }
                        />
                   
                    </div>
                )}
                {draggableTableControls.buildingachive && (
                    <div style={{ position: 'absolute', zIndex: 1000 }}>
                        <DraggableData
                            dataSource={buildingachive}
                            columns={TABLE_COLUMNS}
                            onDataChange={(newData) => {
                                console.log(newData);
                                setBuildingachive(newData);
                                
                            }}
                            defaultPosition={{ x: 100, y:100 }}  
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>房屋档案</span>
                                    <Button
                                        type="text"
                                        size="small"
                                        onClick={() => setDraggableTableControls(prevState => ({
                                            ...prevState,
                                           buildingachive: !prevState.buildingachive    
                                        }))}
                                        style={{ padding: '4px' }}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            }
                        />
                    </div>
                )}
                {draggableTableControls.deviceInfo && (
                    <div style={{ position: 'absolute', zIndex: 1000 }}>
                        <DraggableData
                            dataSource={deviceInfo}
                            columns={TABLE_COLUMNS_DEVICE}  
                            defaultPosition={{ x: 20, y: 20 }}
                            style={{ minWidth: '600px' }}
                            
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>设备信息</span>
                                <Button
                                    type="text"
                                    size="small"
                                    onClick={() => setDraggableTableControls(prevState => ({
                                        ...prevState,
                                       deviceInfo: !prevState.deviceInfo    
                                    }))}
                                    style={{ padding: '4px' }}
                                >
                                    ✕
                                </Button>
                            </div>
                            }   
                        />
                    </div>
                )}
                {draggableTableControls.electricShutter && (
                    <div style={{ position: 'absolute', zIndex: 1000 }}>
                      <DraggableTable
                        dataSource={ELECTRIC_SHUTTER_DATA}
                        defaultPosition={{ x: 20, y: 20 }}
                        style={{ minWidth: '1000px' }}
                        columnnumber={2}
                        title={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>配电信息</span>
                                <Button
                                    type="text"
                                    size="small"
                                    onClick={() => setDraggableTableControls(prevState => ({
                                        ...prevState,
                                      electricShutter: !prevState.electricShutter    
                                    }))}
                                    style={{ padding: '4px' }}
                                >
                                    ✕
                                </Button>
                            </div>
                        }></DraggableTable>
                    </div>
                )}

                <Content style={{ 
                    padding: 28,
                    background: 'rgba(255, 255, 255, 0.9)',  // 调整为半透明背景
                    backdropFilter: 'blur(10px)',  // 添加毛玻璃效果
                    margin: '16px 16px 16px 0',  // 调整边距
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}>
                    <Scene3D
                        currentLevel={currentLevel}
                        setCurrentLevel={setCurrentLevel}
                        selectedItems={selectedItems}
                        onSelectedItemsChange={handleSelectedItemsChange}
                        setMenuData={setMenuData}
                    />
                </Content>
            </Layout>

        </Layout>
    );
};


export default Main1; 