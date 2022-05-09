import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  TagsOutlined,
  HomeOutlined,
  RocketOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import "./sidebar.css";
import { useState } from "react";

const Sidebar = () => {
  const [showTrigger, setShowTrigger] = useState(false);
  const { Sider } = Layout;
  const triggerSwitch = () => {
    if (!showTrigger) return null;
  };
  const siderItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => {
        console.log("hey");
      },
    },
    {
      key: "2",
      icon: <RocketOutlined />,
      label: "Explore",
    },
    {
      key: "3",
      icon: <TagsOutlined />,
      label: "Bookmarks",
    },
    {
      key: "4",
      icon: <NotificationOutlined />,
      label: "Notifications",
    },
    {
      key: "5",
      icon: <UserOutlined />,
      label: "Profile",
    },
  ];
  return (
    <Sider
      breakpoint={"lg"}
      collapsedWidth={0}
      collapsible={true}
      width={250}
      theme="light"
      onBreakpoint={(broken) => setShowTrigger(broken)}
      trigger={triggerSwitch()}
      className="sidebar_feed"
    >
      <div className="logo" />
      <Menu mode="inline" defaultSelectedKeys={["1"]} items={siderItems} />
      <Button size={"large"} block={true} type="primary">
        Create new post
      </Button>
    </Sider>
  );
};

export { Sidebar };
