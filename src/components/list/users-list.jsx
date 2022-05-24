import { UserOutlined } from "@ant-design/icons";
import { List, Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const UsersList = ({ listData, notification }) => {
  const navigate = useNavigate();
  return (
    <List
      itemLayout="horizontal"
      className="list_recommendation"
      dataSource={listData}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            className={`hover ${notification && "notification_user_list"}`}
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
  );
};

export { UsersList };
