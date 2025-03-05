import React, { useEffect, useRef, useState } from 'react';
import {  Button } from 'antd';

import campus2d from '../assets/campus-2d.jpg';
import plot2d from '../assets/plot-2d.jpg';
import building2d from '../assets/building-2d.jpg';
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


const Scene3D = ({ currentLevel, setCurrentLevel, selectedItems, onSelectedItemsChange, setMenuData }) => {
    const [showScene, setShowScene] = useState(false);
    const [is3DView, setIs3DView] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [isRoomLevel, setIsRoomLevel] = useState(false);
    const [showDraggableTable, setShowDraggableTable] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    // 添加一个标志来追踪是否是首次加载
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [animating, setAnimating] = useState(false);

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
        setAnimating(true);
        setZoomLevel(5);
        
        // 1秒后切换层级
        setTimeout(() => {
            setAnimating(false); // 禁用动画
            const currentIndex = LEVELS.indexOf(currentLevel);
            if (currentIndex < LEVELS.length - 1) {
                const nextLevel = LEVELS[currentIndex + 1];
                
                // 完全重置所有变换属性
                setZoomLevel(1);
                setZoomPosition({ x: 50, y: 50 });
                
                // 更新层级
                setCurrentLevel(nextLevel);
                
                // 根据当前层级更新选中状态和菜单数据
                switch (currentLevel) {
                    case 'campus':
                        onSelectedItemsChange({
                            ...selectedItems,
                            plot: 'plot1'
                        });
                        setMenuData(prev => ({
                            ...prev,
                            plots: [
                                { id: 'plot1', name: '蒙民伟楼地块' },
                                { id: 'plot2', name: '图书馆地块' }
                            ],
                            buildings: [],
                            floors: [],
                            rooms: []
                        }));
                        break;

                    case 'plot':
                        onSelectedItemsChange({
                            ...selectedItems,
                            building: 'building1'
                        });
                        setMenuData(prev => ({
                            ...prev,
                            buildings: [
                                { id: 'building1', name: '蒙民伟楼' },
                                { id: 'building2', name: '楼二' }
                            ],
                            floors: [],
                            rooms: []
                        }));
                        break;

                    case 'building':
                        onSelectedItemsChange({
                            ...selectedItems,
                            floor: 'L1'
                        });
                        setMenuData(prev => ({
                            ...prev,
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
                                { id: 'L14', name: '14F' },
                                { id: 'L15', name: '15F' },
                                { id: 'L16', name: '16F' },
                                { id: 'L17', name: '17F' },
                                { id: 'L18', name: '18F' },
                            ],
                            rooms: []
                        }));
                        break;

                    // 可以根据需要添加更多的情况
                }
            }
        }, 800);
    };

    // 修改处理导航栏切换的动画效果
    useEffect(() => {
        // 如果是首次加载，跳过动画
        if (isInitialLoad) {
            console.log("首次加载")
            setIsInitialLoad(false);
            return;
        }

        if (currentLevel !== 'floor' && currentLevel !== 'room') {
            setZoomPosition({ x: 50, y: 50 });
            setZoomLevel(8);
            
            setTimeout(() => {
                setZoomLevel(1);
            }, 2000);
        }
    }, [selectedItems, isInitialLoad]);

    // 添加消息处理函数
    useEffect(() => {
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
          
            if(parsedMessage.source === 'loadedComplete'){
                console.log("当前层级1：",currentLevel)
                if(currentLevel ===  'floor'){
                    var targetId = aIndex+'/'+bIndex+'_'+selectedItems.floor
                    sendMessageToIframe({
                        cmdCode:530,
                        targetCode:targetId,
                        params:{
                            targetIds:[targetId]
                          }
                    })
                }else if(currentLevel === 'building'){
                    sendMessageToIframe({
                        cmdCode:406,
                        targetCode:"MCYB_A02.01_C3_Z1",
                        params:{
                            targetIds:['MCYB_A02.01_C3_Z1']
                          }
                    })
                }
                
            }
            if(parsedMessage.source === 'Doublepick'){
                sendMessageToIframe({
                    cmdCode:406,
                    targetCode:parsedMessage.targetCode,
                    params:{
                        targetIds:[parsedMessage.targetCode]
                      }
                })
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [currentLevel]);

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
                targetCode:'MCYB_A00',
                params:{
                  targetIds:['MCYB_A00']
                }
              });
        }
        if(currentLevel === 'plot'){
            sendMessageToIframe({
                cmdCode:406,
                targetCode:'MCYB_A00',
                params:{
                  targetIds:['MCYB_A00']
                }
              });
        }   

        // 如果切换到楼层层级，显示3D场景并重置房间状态
        if (currentLevel === 'floor') {
            var targetId = aIndex+'/'+bIndex+'_'+selectedItems.floor
            setShowScene(true);
            setIsRoomLevel(false);
            sendMessageToIframe({
                cmdCode:530,
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
        console.log('当前层级：',currentLevel)
        console.log('是否3D：',is3DView)
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


    // 修改渲染逻辑
    if (currentLevel === 'floor'  || is3DView) {
        return (
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        position: 'absolute',
                        top: '20px',
                        left: '1300px',
                        zIndex: 1000
                    }}>
                        <Button onClick={toggleView}>
                            {is3DView ? '2D' : '3D'}
                        </Button>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex'
                    }}>
                        <iframe 
                            src="http://localhost:8081"
                            style={{
                                width: '80%',
                                height: '100%',
                                border: 'none'
                            }}
                        />
                    </div>
                   
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
                        transition: animating ? 'transform 1s ease-in-out' : 'none',
                        ...(animating ? {
                            transform: `scale(${zoomLevel})`,
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                        } : {
                            transform: 'none',
                            transformOrigin: 'center center'
                        })
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