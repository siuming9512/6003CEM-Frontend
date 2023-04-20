import { Breadcrumb, Col, Collapse, Layout, Menu, Row, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import LoginBar from '../components/Login/LoginBar';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
const { Header, Content, Footer } = Layout;

const items = [
  {
    label: 'Pets',
    key: 'pets',
  },
  {
    label: 'Admin',
    key: 'admin',
  }
]
const BaseLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate()


  return (
    <Layout className="layout">
      <Header>
        <Row justify="space-between" style={{width: "100%"}}>
          <Col span={18}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={items}
              onClick={(e) => {navigate(`/${e.key}`)}}
            />
          </Col>
          <Col>
            <LoginBar />
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          padding: '0 50px',
          height: '100%'
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};
export default BaseLayout;