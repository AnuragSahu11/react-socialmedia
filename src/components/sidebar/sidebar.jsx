import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import "./sidebar.css";

const Sidebar = () => {
  const { Sider } = Layout;
  const siderItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "nav 1",
      onClick: () => {
        console.log("hey");
      },
    },
    {
      key: "2",
      icon: <LaptopOutlined />,
      label: "nav 2",
    },
    {
      key: "3",
      icon: <NotificationOutlined />,
      label: "nav 3",
    },
  ];
  return (
    <Sider
      breakpoint={"sm"}
      collapsedWidth={0}
      collapsible={true}
      width={250}
      theme="light"
      className="sidebar-feed"
    >
      <div className="logo" />
      <Menu mode="inline" defaultSelectedKeys={["1"]} items={siderItems} />
    </Sider>
  );
};

export { Sidebar };
