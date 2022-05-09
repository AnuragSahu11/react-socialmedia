import { Layout, List, Avatar } from "antd";
import "./sidebar.css";

const SidebarRecommendations = () => {
  const { Sider } = Layout;
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  return (
    <Sider
      style={{ height: "min-content" }}
      breakpoint={"lg"}
      collapsedWidth={0}
      collapsible={true}
      width={250}
      theme="light"
      className="sidebar-recommendation"
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design"
            />
          </List.Item>
        )}
      />
    </Sider>
  );
};

export { SidebarRecommendations };
