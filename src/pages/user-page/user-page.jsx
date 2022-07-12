import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getUserData, getUserList } from "../../firebase/firestore-methods";
import { Sidebar, SidebarRecommendations } from "../../components";

const UserPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.token);
  const { posts } = useSelector((store) => store.posts);
  const { userData } = useSelector((store) => store.userData);

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token));
      dispatch(getUserList());
    }
  }, [posts]);

  useEffect(() => {
    dispatch(getUserList());
  }, [userData]);

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
