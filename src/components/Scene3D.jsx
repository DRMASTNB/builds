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
    campus: campus2d,
    plot: plot2d,
    building: building2d,
};
const aIndex='MCYB_A02.01_C3_Z1'
const bIndex='MCYB_A02.03_C3'
const cIndex='MCYB_A02.04'


const Scene3D = ({ currentLevel, setCurrentLevel, selectedItems}) => {
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
        return IMAGES[currentLevel];
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
    

    // 添加消息处理函数
    useEffect(() => {
        const handleMessage = (event) => {
            // 验证消息来源
            // if (event.origin !== "允许的域名") return;
            
            // 处理来自 iframe 的消息
            const message = event.data;
            console.log('收到消息：', message);

            // 根据消息类型处理不同的场景
            if (message.type === 'ROOM_SELECTED') {
                setIsRoomLevel(true);
                setCurrentLevel('room');
                fetchTableData(message.roomName);
                setShowDraggableTable(true);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // 向 iframe 发送消息的函数
    const sendMessageToIframe = (message) => {
        const iframe = document.querySelector('iframe');
        if (iframe) {
            iframe.contentWindow.postMessage(message, '*'); // 生产环境建议指定具体域名
        }
    };



    // 监听 currentLevel 的变化
    useEffect(() => {
        console.log(selectedItems)

        // 如果切换到非楼层和房间层级，关闭3D场景
        if (!['floor', 'room'].includes(currentLevel)) {
            setShowScene(false);
            setIsRoomLevel(false);
        }
        if(currentLevel === 'campus'){
            sendMessageToIframe({
                cmdCode:406,
                targetCode:'MCYB_A00_Z1',
                params:{
                  targetIds:['MCYB_A00_Z1']
                }
              });
            setIs3DView(true)
        }

        // 如果切换到楼层层级，显示3D场景并重置房间状态
        if (currentLevel === 'floor') {
            var targetId = aIndex+'/'+bIndex+'_'+selectedItems.floor
            setShowScene(true);
            setIsRoomLevel(false);
            sendMessageToIframe({
                cmdCode:406,
                targetCode:targetId,
                params:{
                  targetIds:[targetId]
                }
              });
        }
        if(currentLevel === 'building'){
            sendMessageToIframe({
                cmdCode:406,
                targetCode:'MCYB_A02.01_C3_Z1',
                params:{
                  targetIds:['MCYB_A02.01_C3_Z1']
                }
              });
            setShowScene(true);
            setIsRoomLevel(true);
        }

        // 如果直接通过侧边栏选择房间
        if (currentLevel === 'room' && selectedItems.room) {
            setShowScene(true);
            setIsRoomLevel(true);
            var targetRoomId = aIndex+'/'+bIndex+'_'+selectedItems.floor+'/'+cIndex+'_'+selectedItems.room
            sendMessageToIframe({
                cmdCode:406,
                targetCode:targetRoomId,
                params:{
                  targetIds:[targetId]
                }
              });
        }
    }, [currentLevel, selectedItems]);

    const toggleView = () => {
        setIs3DView(!is3DView);
        if(currentLevel === 'building'){
            console.log('已发送')
            sendMessageToIframe({
                cmdCode:406,
                targetCode:'MCYB_A02.01_C3_Z1',
                params:{
                  targetIds:['MCYB_A02.01_C3_Z1']
                }
              });
        }

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


    // 如果是楼层或房间层级，或者是3D视图，显示3D场景
    if (currentLevel === 'floor' || currentLevel === 'room' || is3DView) {
        return (
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        zIndex: 1000
                    }}>
                        <Button onClick={toggleView}>
                            {is3DView ? '2D' : '3D'}
                        </Button>
                    </div>
                    <iframe 
                        src="http://localhost:8080"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none'
                        }}
                    />
                   
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

    // 2D图片视图
    return (
        <div style={{ display: 'flex', height: '100%', position: 'relative', justifyContent: 'center'}}>
            <div style={{ 
                flex: 1, 
                position: 'relative', 
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
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