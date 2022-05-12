import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar/sidebar";
import { SidebarRecommendations } from "../sidebar/sidebar-recommendation";

const UserPage = () => {
  return (
    <Layout>
      <Sidebar />
      <Content className="content">
        <Outlet />
      </Content>
      <SidebarRecommendations />
    </Layout>
  );
};

export { UserPage };
