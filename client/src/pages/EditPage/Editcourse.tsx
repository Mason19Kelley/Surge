import React from 'react';
import { Image, Typography } from 'antd';
import { Avatar, Layout, Menu, MenuProps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import headerImg from '../../assets/Dashboard/DashboardHeader.png'
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Edit_Course  from '../../components/Course_Management/Edit_Course/Edit_Course';
import Create_Quiz from '../../components/Course_Management/Edit_Course/Create/Create_Quiz';
import Create_Media from '../../components/Course_Management/Edit_Course/Create/Create_Media';
import Edit_Media from '../../components/Course_Management/Edit_Course/Edit/Edit_Media';
import Edit_Quiz from '../../components/Course_Management/Edit_Course/Edit/Edit_Quiz';

const layoutStyle = {
  width: '100%',
  height: '100vh', 
  display: 'flex', 
};

const contentStyle: React.CSSProperties = {
  flex: 1, 
  overflowY: 'auto', 
  padding: '20px',
  backgroundColor: '#dbdbdb',
  backgroundSize: '100%',
  textAlign: 'center',
  lineHeight: '120px',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#002F8B',
  width: '17%', 
  overflowY: 'auto', 
};


function EditCourse() {
  const {user,  EditCourseContext } = useContext(AuthContext)
  const { fullName } = user || {};
  


  const navigate = useNavigate();

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [
    getItem('Home', 'home', <TeamOutlined />)
  ];

  const handleMenuClick = () => {
    navigate(`/home`)
  };

  const renderPage = () => {
    console.log(EditCourseContext)

    switch (EditCourseContext) {
      case 'Edit_Course':
        return <Edit_Course />;
      case 'Create_Quiz':
        return <Create_Quiz />;
      case 'Create_Media':
        return <Create_Media />;
      case 'Edit_Media':
        return <Edit_Media />;
      case 'Edit_Quiz':
        return <Edit_Quiz />;
      default:
        return null

    }
  }



  return (
    <div>
      <Layout style={layoutStyle}>
        <Layout>
          <Sider width="17%" style={siderStyle}>
            <div className="title">
              <Typography.Title level={2} className='text-left align-middle'>
                <div className = "brand">
                Surge
                </div>
              </Typography.Title>
            </div>
            <div className="user">
              <Avatar style={{backgroundColor: '#3e74c9'}} size={160} icon={<UserOutlined />} />
              <Typography.Title level={3} style={{ color: 'white' }}>
                <div className='emName'>
                  { fullName }
                </div>
              </Typography.Title>
              <Menu
              style={{ width: '100%', backgroundColor: '#002F8B' }}
              defaultSelectedKeys={['Dashboard']}
              mode="vertical"
              onClick={handleMenuClick}
              items={items}
            />
            </div>
          </Sider>
          <Content style={contentStyle}>
          <div className='headerImage'>
            <Image
              width= '100%'
              height = '98%'
              src = {headerImg}
              preview = {false}
            />
          </div>
          {renderPage()}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default EditCourse
