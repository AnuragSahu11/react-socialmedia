import { Avatar, Button, Card, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./profile-page.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  follow,
  getOtherUserData,
  unFollow,
} from "../../firebase/firestore-methods";
import { PostContainer } from "..";
import { useParams } from "react-router-dom";

const OtherUserPage = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();

  const { token } = useSelector((store) => store.token);
  const { userData } = useSelector((store) => store.userData);

  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [following, setFollowing] = useState(
    userData?.follow?.following?.includes(userID)
  );

  const clickFollow = async () => {
    setButtonLoading(true);
    try {
      await follow(token, userID);
      await getOtherUserData(userID, setUserInfo);
      setFollowing((prevState) => !prevState);
    } catch (err) {}
    setButtonLoading(false);
  };

  const clickUnfollow = async () => {
    setButtonLoading(true);
    try {
      await unFollow(token, userID);
      await getOtherUserData(userID, setUserInfo);
      setFollowing((prevState) => !prevState);
    } catch (err) {}
    setButtonLoading(false);
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      await getOtherUserData(userID, setUserInfo);
    } catch (err) {}
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="user_profile_wrapper">
      <div className="user_profile">
        {isLoading ? (
          <Skeleton active={true} />
        ) : (
          <>
            <div className="user_profile_avatar_wrapper">
              <Avatar size={84} icon={<UserOutlined />} />
            </div>
            <div className="profile_name_id">
              <p className="profile_name">{userInfo?.userData?.firstName}</p>
              <p className="profile_id">{userInfo?.userData?.lastName}</p>
            </div>
            {following ? (
              <Button
                loading={buttonLoading}
                onClick={() => clickUnfollow()}
                type="primary"
              >
                Unfollow
              </Button>
            ) : (
              <Button
                loading={buttonLoading}
                onClick={() => clickFollow()}
                type="primary"
              >
                Follow
              </Button>
            )}

            <div className="profile_disc">
              <p className="">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
                vel saepe ut? Temporibus, qui quisquam.
              </p>
            </div>
            <Card className="profile_card">
              <div className="profile_card_div">
                <div className="profile_card_info">
                  <p className="profile_card_number">
                    {userInfo?.follow?.following?.length}
                  </p>
                  <p className="profile_card_text">Following</p>
                </div>
                <div className="profile_card_info">
                  <p className="profile_card_number">
                    {userInfo?.posts?.posts?.length}
                  </p>
                  <p className="profile_card_text">Posts</p>
                </div>
                <div className="profile_card_info">
                  <p className="profile_card_number">
                    {userInfo?.follow?.followers?.length}
                  </p>
                  <p className="profile_card_text">Followers</p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
      <PostContainer userID={userID} />
    </div>
  );
};

export { OtherUserPage };
