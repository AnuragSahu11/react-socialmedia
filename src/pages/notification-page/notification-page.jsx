import { Skeleton, Button } from "antd";
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
        userData?.notifications?.notifications?.map((notification) => {
          const { userID, type } = notification;
          return {
            userID,
            dp: userList[userID].dp,
            fullName: userList[userID].fullName,
            handle: notificationDisc(userList[userID].handle, type),
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
      {userListStatus === statusConstants.fulfilled &&
      status === statusConstants.fulfilled ? (
        <>
          <UsersList listData={notificationArr} />
          <Button
            onClick={clickClearNotification}
            className="notification_button"
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
