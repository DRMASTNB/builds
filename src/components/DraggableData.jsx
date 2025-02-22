import { useState } from 'react';
import { Table, Input } from 'antd';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

const DraggableData = ({ 
    dataSource: initialDataSource, 
    title = "数据表格",
    columns = [],
    defaultPosition = { x: 100, y: 100 },
    onDataChange
}) => {
    const [dataSource, setDataSource] = useState(initialDataSource);
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

    // 处理单元格编辑
    const handleSiteAuditChange = (value, record) => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => item.roomNumber === record.roomNumber);
        if (index > -1) {
            newData[index] = { ...newData[index], siteAudit: value };
            setDataSource(newData);
            if (onDataChange) {
                onDataChange(newData);
            }
        }
    };

    // 扩展列配置
    const enhancedColumns = columns.map(col => {
        if (col.key === 'siteAudit') {
            return {
                ...col,
                render: (text, record) => (
                    <Input
                        value={text}
                        onChange={e => handleSiteAuditChange(e.target.value, record)}
                        style={{ width: '100%' }}
                    />
                )
            };
        }
        return col;
    });

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
                    minWidth: '800px',
                    
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
                    <Table 
                        dataSource={dataSource} 
                        columns={enhancedColumns}
                        pagination={false} 
                    />
                </div>
            </div>
        </Draggable>
    );
};

DraggableData.propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    defaultPosition: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDataChange: PropTypes.func
};

export default DraggableData; 