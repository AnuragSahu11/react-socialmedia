import { Layout, List, Avatar, Divider, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { statusConstants, objectToArr } from "../../utils";
import { UserOutlined } from "@ant-design/icons";
import "./sidebar.css";

const SidebarRecommendations = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();

  const { userList, status } = useSelector((store) => store.operationData);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (userList) {
      setData(objectToArr(userList).slice(0, 5));
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
      {status === statusConstants.fulfilled ? (
        <>
          <p className="sidebar_recommendation_text">Who to follow?</p>
          <Divider className="divider_recommendation" />
          <List
            itemLayout="horizontal"
            className="list_recommendation"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  className="hover"
                  onClick={() => navigate(`/user/${item.userID}`)}
                  avatar={
                    item.dp ? (
                      <Avatar src={item.dp} />
                    ) : (
                      <Avatar icon={<UserOutlined />} />
                    )
                  }
                  title={<a>{item.fullName}</a>}
                  description={item.handle && "@" + item.handle}
                />
              </List.Item>
            )}
          />
        </>
      ) : (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      )}
    </Sider>
  );
};

export { SidebarRecommendations };
