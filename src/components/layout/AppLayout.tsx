import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getAuth } from "../../utils/auth";

const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = getAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
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

          {/* Manager & Sales thấy Customers */}
          {(user?.role === "MANAGER" || user?.role === "SALES") && (
            <Menu.Item key="customers" icon={<UserOutlined />}>
              <Link to="/customers">Customers</Link>
            </Menu.Item>
          )}

          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main layout */}
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>CRM Mini</h3>
          <div>
            Xin chào, <b>{user?.role}</b>
          </div>
        </Header>

        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
