import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getAuth, clearAuth } from "../../utils/auth";

const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = getAuth();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const siderWidth = collapsed ? 80 : 200;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar cố định */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          height: "100vh",
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255,255,255,0.3)",
            color: "#fff",
            textAlign: "center",
            lineHeight: "32px",
            borderRadius: 4,
          }}
        >
          CRM
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>

          {/* chỉ ADMIN, MANAGER thấy Employees */}
          {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
            <Menu.Item key="employees" icon={<TeamOutlined />}>
              <Link to="/employees">Employees</Link>
            </Menu.Item>
          )}
          <Menu.Item key="employees" icon={<UserOutlined />}>
              <Link to="/employees">Employees</Link>
            </Menu.Item>
          <Menu.Item key="opportunities" icon={<FundProjectionScreenOutlined />}>
            <Link to="/opportunities">Opportunities</Link>
          </Menu.Item>

          <Menu.Item key="customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>

          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main layout dịch sang phải theo sidebar */}
      <Layout style={{ marginLeft: siderWidth }}>
        {/* Header cố định */}
        <Header
          style={{
            position: "fixed",
            top: 0,
            left: siderWidth,
            right: 0,
            zIndex: 90,
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 64,
          }}
        >
          <h3>CRM Mini</h3>
          <div>
            Xin chào, <b>{user?.role}</b>
          </div>
        </Header>

        {/* Content cuộn */}
        <Content
          style={{
            margin: "80px 16px 16px", // chừa chỗ cho header
            padding: 24,
            minHeight: "calc(100vh - 96px)",
            background: "#fff",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
