import { Card, Input, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './DepartmentSelect.module.css';
import logo from '../assets/Dplogo.png'; 
const { Search } = Input;
const { Title } = Typography;

const departments = [
    { id: 1, name: '资产处' },
    { id: 2, name: '基建处' },
    { id: 3, name: '设计院' },
    { id: 4, name: '保卫处' },
    { id: 5, name: '水电中心' },
    { id: 6, name: '信息中心' },
    { id: 7, name: '后勤' },
    { id: 8, name: '软件中心' },
    { id: 9, name: '其他' }
];

export const DepartmentSelect = () => {
    const navigate = useNavigate();

    const handleDepartmentSelect = (deptId) => {
        // 存储所选部门
        localStorage.setItem('selectedDepartment', deptId);
        // 跳转到登录页
        navigate('/login1');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={logo} alt="南京大学" className={styles.logo} />
            </div>
            
            <div className={styles.searchBox}>
                <Search
                    placeholder="请输入所属部门"
                    enterButton
                    size="large"
                />
            </div>

            <div className={styles.content}>
                <div className={styles.departmentTitle}>
                    <Title level={4}>部门</Title>
                    <a className={styles.viewAll}>查看全部</a>
                </div>

                <Space wrap className={styles.departmentGrid}>
                    {departments.map(dept => (
                        <Card
                            key={dept.id}
                            className={styles.departmentCard}
                            onClick={() => handleDepartmentSelect(dept.id)}
                            hoverable
                        >
                            {dept.name}
                        </Card>
                    ))}
                </Space>
            </div>
        </div>
    );
}; 