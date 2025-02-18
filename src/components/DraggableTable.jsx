import { useState } from 'react';
import { Descriptions } from 'antd';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

const DraggableTable = ({ 
    dataSource, 
    title = "数据表格",
    defaultPosition = { x: 100, y: 100 }  
}) => {
    const [position, setPosition] = useState(defaultPosition);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    });

    // 开始拖拽时计算边界
    const onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = event.target.getBoundingClientRect();
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y)
        });
    };

    return (
        <Draggable
            defaultPosition={defaultPosition}
            position={position}
            onStart={onStart}
            onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
            bounds={bounds}
            handle=".drag-handle"
        >
            <div 
                style={{ 
                    position: 'absolute',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    width: 'auto',
                    minWidth: '400px',
                    
                }}
            >
                <div 
                    className="drag-handle" 
                    style={{
                        padding: '10px',
                        background: '#f0f0f0',
                        cursor: 'move',
                        borderRadius: '8px 8px 0 0',
                        marginBottom: '10px'
                    }}
                >
                    {title}
                </div>
                <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
                    <Descriptions bordered column={1}items={dataSource} >
                     
                    </Descriptions>
                </div>
            </div>
        </Draggable>
    );
};

DraggableTable.propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    defaultPosition: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    })
};

export default DraggableTable; 