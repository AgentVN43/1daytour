import { useState } from "react";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import "tailwindcss/tailwind.css"; // Ensure Tailwind is installed and configured
import { ServiceProvider } from "../../contexts/ServiceContext";
import { PackageProvider } from "../../contexts/PackageContext";
import { OrderProvider } from "../../contexts/OrderContext";

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false); // State for sidebar collapse on desktop
  const [drawerVisible, setDrawerVisible] = useState(false); // State for mobile menu drawer

  const toggleCollapse = () => setCollapsed(!collapsed);
  const showDrawer = () => setDrawerVisible(true);
  const hideDrawer = () => setDrawerVisible(false);

  const menuItems = [
    {
      key: "1",
      label: "Vehicles",
      children: [
        {
          key: "1-1",
          label: <Link to="/admin/vehicles">Manage Vehicles</Link>,
        },
      ],
    },
    {
      key: "2",
      label: "Routes",
      children: [
        { key: "2-1", label: "Manage Routes" },
        { key: "2-2", label: "Add New Route" },
      ],
    },
    {
      key: "3",
      label: "Tours",
      children: [
        { key: "3-1", label: "Manage Tours" },
        { key: "3-2", label: "Add New Tour" },
      ],
    },
    {
      key: "4",
      label: "Services",
      children: [
        {
          key: "3-1",
          label: <Link to="/admin/services">Manage Services</Link>,
        },
      ],
    },
    {
      key: "5",
      label: "Prices",
      children: [
        { key: "3-1", label: <Link to="/admin/prices">Manage Prices</Link> },
      ],
    },
    {
      key: "6",
      label: "Services New",
      children: [
        {
          key: "3-1",
          label: <Link to="/admin/servicesnew">Manage Prices</Link>,
        },
        {
          key: "3-2",
          label: <Link to="/admin/packet">Manage Packet</Link>,
        },
        {
          key: "3-3",
          label: <Link to="/admin/order">New Order</Link>,
        },
        {
          key: "3-4",
          label: <Link to="/admin/listorder">List Order</Link>,
        },
      ],
    },
  ];

  return (
    <ServiceProvider>
      <PackageProvider>
        <OrderProvider>
          <Layout className="min-h-screen">
            {/* Sidebar for desktop view */}
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={toggleCollapse}
              breakpoint="lg"
              collapsedWidth="0"
              trigger={null}
              className="hidden lg:block"
            >
              <div className="p-4 text-white text-center">Admin Dashboard</div>
              <Menu theme="dark" mode="inline" items={menuItems} />
            </Sider>

            {/* Drawer for mobile view */}
            <Drawer
              title="Admin Dashboard"
              placement="left"
              onClose={hideDrawer}
              visible={drawerVisible}
              className="lg:hidden"
              bodyStyle={{ padding: 0 }}
            >
              <Menu theme="dark" mode="inline" items={menuItems} />
            </Drawer>

            <Layout>
              {/* Header */}
              <Header className="flex justify-between items-center px-4 bg-white shadow-md">
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={showDrawer}
                  className="lg:hidden"
                />
                <h2 className="text-lg font-semibold">Dashboard Header</h2>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={toggleCollapse}
                  className="hidden lg:inline"
                />
              </Header>

              {/* Content */}
              <Content className="p-4">
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </OrderProvider>
      </PackageProvider>
    </ServiceProvider>
  );
}
