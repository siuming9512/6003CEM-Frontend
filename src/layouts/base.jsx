import { Breadcrumb, Layout, Menu, theme } from 'antd';
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
const BaseLayout = ({children}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
        />
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