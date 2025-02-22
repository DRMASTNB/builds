import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Table } from 'antd';
import { sceneConfig, spaceLabel } from "../util/scene";
import { systemConfig } from "../util/systemConfig";
import campus2d from '../assets/campus-2d.jpg';
import campus3d from '../assets/campus-3d.jpg';
import plot2d from '../assets/plot-2d.jpg';
import plot3d from '../assets/plot-3d.jpg';
import building2d from '../assets/building-2d.jpg';
import building3d from '../assets/building-3d.jpg';
import { LEVELS } from '../constants/Consts';
import DraggableTable from './DraggableTable';
// 图片映射配置
const IMAGES = {
    campus: {
        '2d': campus2d,
        '3d': campus3d,
    },
    plot: {
        '2d': plot2d,
        '3d': plot3d,
    },
    building: {
        '2d': building2d,
        '3d': building3d,
    }
};



const Scene3D = ({ currentLevel, setCurrentLevel, selectedItems}) => {
    const sceneRef = useRef(null);
    const web3dRef = useRef(null);
    const [showScene, setShowScene] = useState(false);
    const [is3DView, setIs3DView] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [isRoomLevel, setIsRoomLevel] = useState(false);
    const [showDraggableTable, setShowDraggableTable] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1); // 添加缩放级别状态
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

    // 获取当前应该显示的图片
    const getCurrentImage = () => {
        if (currentLevel === 'floor' || currentLevel === 'room') {
            return null;
        }
        return IMAGES[currentLevel][is3DView ? '3d' : '2d'];
    };

    // 修改处理双击事件
    const handleDoubleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setZoomPosition({ x, y });
        setIsTransitioning(true);
        
        // 第一次缩放
        setZoomLevel(3);
        
        // 第二次缩放
        setTimeout(() => {
            setZoomLevel(5);
        }, 500);

        // 在动画结束后切换层级
        setTimeout(() => {
            const currentIndex = LEVELS.indexOf(currentLevel);
            if (currentIndex < LEVELS.length - 1) {
                setCurrentLevel(LEVELS[currentIndex + 1]);
            }
            setIsTransitioning(false);
            setZoomLevel(1); // 重置缩放级别
        }, 1500); // 延长总动画时间
    };

    // 清空标签
    const clearLabelHandler = () => {
        if (web3dRef.current) {
            web3dRef.current.clear3DLabel();
        }
    };

    // 批量添加标签
    const addLabelHandler = () => {
        if (web3dRef.current) {
            web3dRef.current.addLabels(spaceLabel);
        }
    };

    // 返回主视角（楼层层级）
    const switchDefaultView = () => {
        if (web3dRef.current) {
            clearLabelHandler();
            web3dRef.current.switchDefaultView();
            setIsRoomLevel(false);
            setCurrentLevel('floor');
        }
    };

    // 处理标签点击事件
    const handleLabelClick = (e) => {
        setIsRoomLevel(true);
        setCurrentLevel('room');
        const roomName = e.name;
        fetchTableData(roomName);
        setShowDraggableTable(true);
    };

    // 监听 currentLevel 的变化
    useEffect(() => {
        // 如果切换到非楼层和房间层级，关闭3D场景
        if (!['floor', 'room'].includes(currentLevel)) {
            setShowScene(false);
            setIsRoomLevel(false);
            if (web3dRef.current) {
                clearLabelHandler();
            }
        }

        // 如果切换到楼层层级，显示3D场景并重置房间状态
        if (currentLevel === 'floor') {
            setShowScene(true);
            setIsRoomLevel(false);
            if (web3dRef.current) {
                clearLabelHandler();  // 清空标签
                web3dRef.current.switchDefaultView();
                // 不再自动添加标签
            }
        }

        // 如果直接通过侧边栏选择房间
        if (currentLevel === 'room' && selectedItems.room) {
            setShowScene(true);
            setIsRoomLevel(true);
            if (web3dRef.current) {
                const roomLabel = spaceLabel.find(label =>
                    label.name === selectedItems.room ||
                    label.label.text === selectedItems.room
                );

                if (roomLabel) {
                    web3dRef.current.performAction([{ id: roomLabel.id }], 'focus', {
                        focusView: roomLabel.cameraPosition
                    }, () => {
                        clearLabelHandler();
                        addLabelHandler();  // 只在聚焦房间时添加标签
                        handleLabelClick({ label: roomLabel.name });
                    });
                }
            }
        }
    }, [currentLevel, selectedItems]);

    // 处理3D场景初始化
    useEffect(() => {
        if (showScene && window.Web3D && window.jQuery) {
            web3dRef.current = new window.Web3D('yb-park-scene', {
                scene: sceneConfig,
                systemConfig: systemConfig,
                pickLabelAction: handleLabelClick,
                pickAction: (e) => {
                    if (e?.modelId) {
                        web3dRef.current.performAction([{ id: e.modelId }], 'focus', {
                            focusView: {
                                position: {
                                    x: 19.245192603628176,
                                    y: 90.00000021917313,
                                    z: 208.7808538821296
                                },
                                target: {
                                    x: 19.245192603628176,
                                    y: 36.00000021920013,
                                    z: 208.7807998821296
                                }
                            }
                        }, () => {
                            clearLabelHandler();
                            addLabelHandler();  // 只在点击模型时添加标签
                        });
                    }
                },
                loadedAction: () => {
                    console.log('场景加载完成');
                    clearLabelHandler();  // 确保初始化时没有标签
                }
            });
            window.web3d = web3dRef.current;
        }

        // 组件卸载时清理
        return () => {
            if (web3dRef.current) {
                clearLabelHandler();
            }
        };
    }, [showScene]);

    const toggleView = () => {
        setIs3DView(!is3DView);
    };
    
    const fetchTableData = (roomName) => {
        // requestGetRoomInfo(roomName).then(res => {
        //     console.log(res)
        // })
        var  data = [
            {
                key: '1',
                label: '建筑',
                children: '蒙民伟楼',
            },
            {
                key: '2',
                label: '楼层',
                children: '13',
            },
            {
                key: '3',
                label: '房间号',
                children: roomName,
            },
            {
                key: '4',
                label: '类型',
                children: '普通实验室',
            },
            {
                key: '5',
                label: '使用部门',
                children: '电子科学与工程学院',
            }
        ];
        console.log(roomName)
        data[0].room_number = roomName
        setTableData(data)
    };


    // 如果是楼层或房间层级，显示3D场景
    if (currentLevel === 'floor' || currentLevel === 'room' || showScene) {
        return (
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <div
                        id="yb-park-scene"
                        ref={sceneRef}
                        style={{ width: '100%', height: '100%' }}
                    />
                    {isRoomLevel && (
                        <Button
                            style={{
                                position: 'absolute',
                                top: '20px',
                                left: '20px',
                                zIndex: 1000
                            }}
                            onClick={switchDefaultView}
                        >
                            返回楼层视图
                        </Button>
                    )}
                    {showDraggableTable && (
                        <DraggableTable
                            dataSource={tableData}
                            defaultPosition={{ x: 0, y: -800}}
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>房间信息</span>
                                    <Button 
                                        type="text" 
                                        size="small" 
                                        onClick={() => setShowDraggableTable(false)}
                                        style={{ padding: '4px' }}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            }
                        />
                    )}
                 
                </div>
            </div>
        );
    }

    // 修改返回图片视图的部分
    return (
        <div style={{ display: 'flex', height: '100%', position: 'relative', justifyContent: 'center'}}>
            <div style={{ 
                flex: 1, 
                position: 'relative', 
                overflow: 'hidden',
                display: 'flex',  // 添加 flex 布局
                justifyContent: 'center',  // 水平居中
                alignItems: 'center'  // 垂直居中
            }}>
                <img
                    src={getCurrentImage()}
                    alt={`${currentLevel} view`}
                    style={{
                        width: '80%',
                        height: '80%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        transition: 'all 0.8s ease-in-out',
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        opacity: isTransitioning ? 0 : 1
                        // 移除了多余的 justifyContent
                    }}
                    onDoubleClick={handleDoubleClick}
                />
            </div>
            <div style={{ width: '200px', padding: '10px' }}>
                <Button onClick={toggleView}>
                    {is3DView ? '2D' : '3D'}
                </Button>
            </div>
        </div>
    );
};

export default Scene3D;