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
      renderItem={({ userID, dp, fullName, handle }) => (
        <List.Item>
          <List.Item.Meta
            className={`hover ${notification && "notification_user_list"}`}
            onClick={() => navigate(`/user/${userID}`)}
            avatar={
              dp ? <Avatar src={dp} /> : <Avatar icon={<UserOutlined />} />
            }
            title={<a>{fullName}</a>}
            description={handle && "@" + handle}
          />
        </List.Item>
      )}
    />
  );
};

export { UsersList };
