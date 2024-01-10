
import './HomePage.css'
import { Avatar, Layout, Menu, MenuProps, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { HomeOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react'
import Dashboard from '../../components/Dashboard/Dashboard';
import { AuthContext } from '../../context/AuthContext';



const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};


const layoutStyle = {
  overflow: 'auto',
  width: '100%',
  maxWidth: '100%',
  height: '100vh',
};

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
  getItem('Dashboard', 'Dashboard', <HomeOutlined />), getItem('Courses', 'Courses', <ProfileOutlined />), getItem('Account', 'Account', <UserOutlined />), getItem('Logout', 'Logout', <LogoutOutlined />)
];

function HomePage() {
  const [page, setPage] = useState('Dashboard');
  const { user } = useContext(AuthContext)
  const renderPage = () => {
    console.log(user)
    switch (page) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Courses':
        return <div>Courses Page</div>;
      case 'Account':
        return <div>Account Page</div>;
      case 'Logout':
        // Handle logout logic here
        return null;
      default:
        return null;
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    setPage(key);
    console.log(page)
  };

  return (
    <div>
      <Layout style={layoutStyle}>
        <Layout>
          <Sider width="20%" style={siderStyle}>
            <div className="title">
              <Typography.Title level={2} className='text-center align-middle'>
                Surge
              </Typography.Title>
            </div>
            <div className="user">
              <Avatar size={128} icon={<UserOutlined />} />
              <Typography.Title level={4} style={{ color: 'white' }}>
                Employee Name
              </Typography.Title>
            </div>
            <Menu
              style={{ width: '100%', backgroundColor: '#1677ff' }}
              defaultSelectedKeys={['Dashboard']}
              mode="vertical"
              onClick={handleMenuClick}
              items={items}
            />
          </Sider>
          <Content style={contentStyle}>
            {renderPage()}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default HomePage;
