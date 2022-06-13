import { Skeleton, Button, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UsersList } from "../../components";
import { notificationDisc, statusConstants } from "../../utils";
import { ClearOutlined } from "@ant-design/icons";
import "./notification-page.css";
import {
  clearNotifications,
  getUserData,
} from "../../firebase/firestore-methods";

const NotificationPage = () => {
  const { Title } = Typography;
  const { userList, userListStatus } = useSelector(
    (store) => store.operationData
  );
  const dispatch = useDispatch();
  const { userData, status } = useSelector((store) => store.userData);
  const { token } = useSelector((store) => store.token);

  const [notificationArr, setNotificationArr] = useState([]);

  useEffect(() => {
    if (
      userListStatus === statusConstants.fulfilled &&
      status === statusConstants.fulfilled
    ) {
      setNotificationArr(
        userData?.notifications?.notifications?.map(({ userID, type }) => {
          const { dp, fullName, handle } = userList[userID];
          return {
            userID,
            dp: dp,
            fullName: fullName,
            handle: notificationDisc(handle, type),
          };
        })
      );
    }
  }, [status, userListStatus]);

  const clickClearNotification = () => {
    clearNotifications(token);
    dispatch(getUserData(token));
  };

  return (
    <div className="notifications_page">
      <div className="notifications_page_header">
        <Title level={2}>Your Notifications</Title>
      </div>
      {userListStatus === statusConstants.fulfilled &&
      status === statusConstants.fulfilled ? (
        <>
          <UsersList
            className="notificatio_page_list"
            listData={notificationArr}
            notification={true}
          />
          <Button
            block
            onClick={clickClearNotification}
            className="notifications_button"
            type="primary"
            icon={<ClearOutlined />}
          >
            Clear Notifications
          </Button>
        </>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};

export { NotificationPage };
