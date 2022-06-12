import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  TagsFilled,
  HomeFilled,
  RocketFilled,
  NotificationFilled,
  ImportOutlined,
} from "@ant-design/icons";
import "./sidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNewPostModal } from "../../redux/slice/operation-slice";

const Sidebar = () => {
  const { Sider } = Layout;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showTrigger, setShowTrigger] = useState(false);

  const triggerSwitch = () => {
    if (!showTrigger) return null;
  };

  const siderItems = [
    {
      key: "1",
      icon: <HomeFilled style={{ fontSize: "1.1rem" }} />,
      label: "Home",
      onClick: () => {
        navigate("/user/feed");
      },
    },
    {
      key: "2",
      icon: <RocketFilled style={{ fontSize: "1.1rem" }} />,
      label: "Explore",
      onClick: () => {
        navigate("/user/explore");
      },
    },
    {
      key: "3",
      icon: <TagsFilled style={{ fontSize: "1.1rem" }} />,
      label: "Bookmarks",
      onClick: () => {
        navigate("/user/bookmark");
      },
    },
    {
      key: "4",
      icon: <NotificationFilled style={{ fontSize: "1.1rem" }} />,
      label: "Notifications",
      onClick: () => {
        navigate("/user/notifications");
      },
    },
    {
      key: "5",
      icon: <ImportOutlined style={{ fontSize: "1.1rem" }} />,
      label: "Archived",
      onClick: () => {
        navigate("/user/archive");
      },
    },
    {
      key: "6",
      icon: <UserOutlined style={{ fontSize: "1.1rem" }} />,
      label: "Profile",
      onClick: () => {
        navigate("/user/profile");
      },
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
      <Menu
        mode="inline"
        className="sidebar_menu"
        defaultSelectedKeys={["1"]}
        items={siderItems}
      />
      <Button
        onClick={() => dispatch(showNewPostModal())}
        size={"large"}
        block={true}
        type="primary"
      >
        Create new post
      </Button>
    </Sider>
  );
};

export { Sidebar };
