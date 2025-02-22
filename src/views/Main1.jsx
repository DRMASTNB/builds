import { useEffect, useState } from 'react';
import { Layout, Menu, Button, Badge, Space, message } from "antd";
import {  UserOutlined } from '@ant-design/icons';
import backgroundImage from '../assets/LoginBackground2.jpg';
import logo2 from "../assets/Dplogo.png";
import Scene3D from '../components/Scene3D.jsx'
import { LEVELS, TOP_MENU_ITEMS, TABLE_COLUMNS, TABLE_COLUMNS_DEVICE, TABLE_COLUMNS_DEVICESERIVE,ELECTRIC_SHUTTER_DATA } from '../constants/Consts';
import DraggableTable from '../components/DraggableTable';
import DraggableData from '../components/DraggableData';
import { useNavigate } from "react-router-dom";
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
    const electricShutterData = [
        { label: '变电所名称', value: '某民伴建变电所', isTitle: true },
        { label: '变电所位置', value: '某民伴建地下二层' },
        { label: '建设投运时间', value: '2003年6月' },
        { label: '变压器容量', value: '2*1600KVA' },
        { label: '变压器历史', value: '1号变：79% 2021年\n2号变：63% 2020年', highlight: true },
        { label: '主要元器件', value: '改造大修情况' },
        { label: '变电所下游站点', value: '某民伴建地下网层-地上27层合计29层' }
    ];
    

    // 处理菜单项选择
    const handleMenuSelect = async ({ key }) => {
        const [level, value] = key.split('-');
        let mockPlots, mockBuildings, mockFloors, mockRooms;

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
                        { id: 'building2', name: '楼二' }
                    ];
                    setMenuData(prev => ({ ...prev, buildings: mockBuildings, floors: [], rooms: [] }));
                    break;
                case 'building':
                    mockFloors = [
                        { id: 'floor1', name: '1F' },
                        { id: 'floor2', name: '2F' },
                        { id: 'floor3', name: '3F' }
                    ];
                    setMenuData(prev => ({ ...prev, floors: mockFloors, rooms: [] }));
                    break;
                case 'floor':
                    mockRooms = [
                        { id: 'room101', name: '101' },
                        { id: 'room102', name: '102' },
                        { id: 'room103', name: '103' }
                    ];
                    setMenuData(prev => ({ ...prev, rooms: mockRooms }));
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
        // requestGetLandInfo(selectedItems.building, 0).then(res => {
        //     console.log(res);
        // });
        const rawData = [
            {
                roomNumber: '1',
                roomUsage: '无',
                useDepartment: '无',
                useArea: '无',
                actualUsage: '无',
                buildingTime: '无',
                siteAudit: '无',
                
            },
            {
                roomNumber: '2',
                roomUsage: '无',
                useDepartment: '无',
                useArea: '无',
                actualUsage: '无',
                buildingTime: '无',
                siteAudit: '无',
            },
            {
                roomNumber: '3',
                roomUsage: '无',
                useDepartment: '无',
                useArea: '无',
                actualUsage: '无',
                buildingTime: '无',
                siteAudit: '无',
            }
        ];
        if (buildingachive.length === 0) {
            setBuildingachive(rawData);
        }
    };
    const fetchBuildingInfo = () => {
        // requestGetBuildingInfo(selectedItems.building, 0).then(res => {
        //     console.log(res);
        // });
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
        // requestGetDeviceInfo(selectedItems.building, 0).then(res => {
        //     console.log(res);
        // });
        const rawData = [
            {
                roomNumber: '1',
                electricShutter: '无',
                classroomLighting: '无',
                blackboardLight: '无'       
            },
            {
                roomNumber: '2',
                electricShutter: '无',
                classroomLighting: '无',
                blackboardLight: '无'
            }
        ];
        setDeviceInfo(rawData);
    
    }
    
    const MenuItemClick = ({ key }) => {
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

        switch (key) {
            // 档案信息
            case 'archive-1-1':
                fetchBuildingInfo();
                setDraggableTableControls(prev => ({
                    ...prev,
                    roomInfo: !prev.roomInfo
                }));
                break;
            case 'archive-1-2':
                fetchBuildingInfo();
                setDraggableTableControls(prev => ({
                    ...prev,
                    roomInfo: !prev.roomInfo
                }));
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
            case 'maintenance-2':
                break;

            default:
                break;

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

        setSelectedItems(newSelectedItems);
    }, [currentLevel]);


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

    return (
        <Layout>
            {/* 顶部区域 */}
            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'

            }}>
                {/* 上部分：Logo和用户信息 */}
                <div style={{
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 24px',
                    borderBottom: '1px solid rgba(255, 255, 255, 1)'
                }}>
                    {/* 左侧Logo区域 */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <img
                            src={logo2}
                            alt="南京大学"
                            style={{ height: '40px' }}
                        />
                        <span style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'rgba(255, 255, 255, 1)'
                        }}>
                            南京大学校园空间协同管理决策辅助系统
                        </span>
                    </div>

                    {/* 右侧用户信息区域 */}
                    <Space size={24}>
                        <Badge count={6}>
                        <Button
                            type="text"
                            icon={<UserOutlined />}
                            style={{ fontSize: '18px' }}
                            onClick={() => {
                                navigate('/user');
                            }}
                        >
                            用户界面管理界面
                        </Button>
                        </Badge>
                    </Space>
                </div>

                {/* 下部分：导航菜单 */}
                <div style={{
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0)',
                    backdropFilter: 'blur(8px)',
                }}>
                    <Menu
                        mode="horizontal"
                        items={TOP_MENU_ITEMS}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            background: 'transparent',
                            borderBottom: 'true',
                            height: '60px',
                            lineHeight: '60px',
                            padding: '0 50px',
                        }}
                        onClick={MenuItemClick}
                    >
                    </Menu>
                </div>
            </div>

            {/* 主要内容区域 */}
            <Layout style={{ minHeight: 'calc(100vh - 120px)' }}>
                <Sider width={300} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        onSelect={handleMenuSelect}
                        defaultOpenKeys={['campus']}
                        style={{ height: '100%' }}
                        items={generateMenuItems()}
                    />
                </Sider>
                {/* 建筑基本信息 */}
                {draggableTableControls.roomInfo && (
                    <div style={{ position: 'absolute', zIndex: 1000 }}>
                        <DraggableTable
                            dataSource={buildingInfo}
                            defaultPosition={{ x: 20, y: 20 }}
                            columnnumber={1}
                            style={{ minWidth: '600px' }}
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>建筑基本信息</span>
                                    <Button
                                        type="text"
                                        size="small"
                                        onClick={() => setDraggableTableControls(prevState => ({
                                            ...prevState,
                                            roomInfo: !prevState.roomInfo
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
                                // 可以在这里进行其他操作，如保存到后端
                            }}
                            defaultPosition={{ x: 700, y:300 }}  
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

                <Content style={{ padding: 24, background: '#fff' }}>
                    <Scene3D
                        currentLevel={currentLevel}
                        setCurrentLevel={setCurrentLevel}
                        selectedItems={selectedItems}
                    />
                </Content>
            </Layout>

        </Layout>
    );
};


export default Main1; 