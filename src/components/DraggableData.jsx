import { useState } from 'react';
import { Table, Input, Upload, Image, Button, Space } from 'antd';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

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

    // 修改处理单元格数据的结构
    const handleCellChange = (value, record, fieldName, type = 'text') => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => item.roomNumber === record.roomNumber);
        if (index > -1) {
            const currentValue = newData[index][fieldName] || {};
            newData[index] = { 
                ...newData[index], 
                [fieldName]: {
                    ...currentValue,
                    [type]: value
                }
            };
            setDataSource(newData);
            if (onDataChange) {
                onDataChange(newData);
            }
        }
    };

    // 处理图片上传
    const handleImageUpload = (file, record, fieldName) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            handleCellChange(imageUrl, record, fieldName, 'image');
        };
        reader.readAsDataURL(file);
        return false;
    };

    // 添加删除图片的处理函数
    const handleDeleteImage = (record, fieldName) => {
        handleCellChange(null, record, fieldName, 'image');
    };

    // 扩展列配置
    const enhancedColumns = columns.map(col => {
        if (col.editable) {
            return {
                ...col,
                render: (cellData, record) => {
                    const value = cellData || {};
                    return (
                        <div className="editable-cell-container">
                            <Input.TextArea
                                value={value.text}
                                onChange={e => handleCellChange(e.target.value, record, col.key, 'text')}
                                placeholder="请输入文字"
                                autoSize={{ minRows: 2, maxRows: 4 }}
                                style={{
                                    width: '100%',
                                    borderRadius: '6px',
                                    marginBottom: '8px',
                                    resize: 'none'
                                }}
                            />
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'flex-start', 
                                gap: '12px',
                                marginTop: '8px'
                            }}>
                                {value.image ? (
                                    <div className="image-preview-container" style={{
                                        position: 'relative',
                                        width: 100,
                                        height: 100,
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: '1px solid #f0f0f0'
                                    }}>
                                        <Image
                                            src={value.image}
                                            alt="预览图片"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                border: 'none',
                                                borderRadius: '0 0 0 8px'
                                            }}
                                            onClick={() => handleDeleteImage(record, col.key)}
                                        />
                                    </div>
                                ) : (
                                    <Upload
                                        beforeUpload={(file) => handleImageUpload(file, record, col.key)}
                                        showUploadList={false}
                                    >
                                        <div style={{
                                            width: 100,
                                            height: 100,
                                            border: '1px dashed #d9d9d9',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            transition: 'border-color 0.3s',
                                            ':hover': {
                                                borderColor: '#1890ff'
                                            }
                                        }}>
                                            <UploadOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />
                                            <span style={{ 
                                                marginTop: '8px',
                                                color: '#8c8c8c',
                                                fontSize: '12px'
                                            }}>
                                                点击上传
                                            </span>
                                        </div>
                                    </Upload>
                                )}
                            </div>
                        </div>
                    );
                }
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
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    maxWidth: '80vw',
                    minWidth: '300px',
                    maxHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div 
                    className="drag-handle" 
                    style={{
                        padding: '12px 16px',
                        background: '#fafafa',
                        cursor: 'move',
                        borderRadius: '8px 8px 0 0',
                        marginBottom: '16px',
                        fontWeight: '500',
                        color: '#262626',
                        borderBottom: '1px solid #f0f0f0'
                    }}
                >
                    {title}
                </div>
                <div style={{ 
                    overflowX: 'auto',
                    overflowY: 'auto',
                    padding: '0 4px',
                    flex: 1,
                }}>
                    <Table 
                        dataSource={dataSource} 
                        columns={enhancedColumns}
                        pagination={false} 
                        scroll={{ x: 900 }}
                        style={{
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}
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