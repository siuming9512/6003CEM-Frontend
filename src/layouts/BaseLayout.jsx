import { Breadcrumb, Col, Collapse, Layout, Menu, Row, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import LoginBar from '../components/Login/LoginBar';
import { useSelector } from 'react-redux';
import { selectIsStaff } from '../store/userSlice';
import RouteGuard from './RouteGuard';
import { useEffect, useState } from 'react';
const { Header, Content, Footer } = Layout;


const BaseLayout = ({ children }) => {
  const navigate = useNavigate()
  const isStaff = useSelector(selectIsStaff)
  const [current, setCurrent] = useState();
  let menu = []

  if (isStaff) {
    menu = [
      {
        label: 'Admin',
        key: 'admin',
      },
      {
        label: 'Chat',
        key: 'chat',
      }
    ]
  } else {
    menu = [
      {
        label: 'Pets',
        key: 'pets',
      }
    ]
  }

  useEffect(() => {
    setCurrent(menu[0].key)
  }, [])

  return (
    <Layout className="layout" style={{ height: "100vh" }}>
      <Header>
        <Row justify="space-between" style={{ width: "100%" }}>
          <Col span={12}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={menu}
              selectedKeys={current}
              onClick={(e) => { setCurrent(e.key); navigate(`/${e.key}`) }}
            />
          </Col>
          <Col>
            <LoginBar />
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          // padding: '0 50px',
          height: '100%',
          overflowY: 'auto'
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
export default BaseLayout;