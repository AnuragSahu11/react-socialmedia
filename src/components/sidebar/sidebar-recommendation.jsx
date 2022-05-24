import { Layout, Divider, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { statusConstants, objectToArr } from "../../utils";
import "./sidebar.css";
import { UsersList } from "../list/users-list";

const SidebarRecommendations = () => {
  const { Sider } = Layout;
  const { userList, userListStatus } = useSelector(
    (store) => store.operationData
  );
  const [listData, setListData] = useState([]);

  useEffect(() => {
    if (userList) {
      setListData(objectToArr(userList).slice(0, 5));
    }
  }, [userList]);

  return (
    <Sider
      style={{ height: "min-content" }}
      breakpoint={"lg"}
      collapsedWidth={0}
      collapsible={true}
      width={250}
      theme="light"
      className="sidebar_recommendation"
    >
      {userListStatus === statusConstants.fulfilled ? (
        <>
          <p className="sidebar_recommendation_text">Who to follow?</p>
          <Divider className="divider_recommendation" />
          <UsersList listData={listData} />
        </>
      ) : (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      )}
    </Sider>
  );
};

export { SidebarRecommendations };
