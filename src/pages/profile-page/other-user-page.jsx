import { Avatar, Card, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changeTitle, onScroll } from "../../utils";
import { PostContainer } from "../../components";
import {
  follow,
  getOtherUserData,
  unFollow,
} from "../../firebase/firestore-methods";
import "./profile-page.css";
import { titleConstants } from "../../utils/constants";
import { FollowButton } from "./components/follow-button";

const OtherUserPage = () => {
  const { userID } = useParams();
  const navigate = useNavigate();

  const { token } = useSelector((store) => store.token);
  const { userData } = useSelector((store) => store.userData);

  const pageRef = useRef();
  const [pageEnd, setPageEnd] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isFollowing, setIsFollowing] = useState(
    userData?.follow?.following?.includes(userID)
  );

  const { firstName, lastName } = userInfo.userData || {};
  const {
    follow: { following = [], followers = [] } = {},
    posts: { posts = [] } = {},
  } = userInfo || {};

  const clickFollow = async () => {
    setButtonLoading(true);
    try {
      await follow(token, userID);
      await getOtherUserData(userID, setUserInfo);
      setIsFollowing((prevState) => !prevState);
    } catch (err) {}
    setButtonLoading(false);
  };

  const clickUnfollow = async () => {
    setButtonLoading(true);
    try {
      await unFollow(token, userID);
      await getOtherUserData(userID, setUserInfo);
      setIsFollowing((prevState) => !prevState);
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
    if (token === userID) navigate("/user/profile");
    else getData();
  }, [userID]);

  const {
    userData: {
      dp = "",
      fullName = "",
      handle = "",
      bio = "",
      website = "",
      background = "",
    } = {},
  } = userInfo || {};

  changeTitle(firstName || titleConstants.profilePage);

  return (
    <div
      ref={pageRef}
      className="user_profile_wrapper page_wrapper"
      onScroll={() => onScroll(pageRef, setPageEnd)}
    >
      <div className="user_profile">
        {isLoading ? (
          <Skeleton active={true} />
        ) : (
          <>
            {background && (
              <div className="user_profile_background_wrapper">
                <img src={background} alt="" />
              </div>
            )}
            <div className="user_profile_avatar_wrapper">
              <Avatar src={dp} size={94} icon={<UserOutlined />} />
            </div>
            <div className="profile_name_id">
              <p className="profile_name">{fullName}</p>
              <p className="profile_id">@{handle}</p>
            </div>

            <FollowButton
              isFollowing={isFollowing}
              buttonLoading={buttonLoading}
              clickFollow={clickFollow}
              clickUnfollow={clickUnfollow}
            />

            <div className="profile_disc">
              <p className="">{bio}</p>
            </div>
            <div className="profile_disc">
              <a onClick={() => window.open(`https://${website}`, "_blank")}>
                {website}
              </a>
            </div>
            <Card className="profile_card">
              <div className="profile_card_div">
                <div className="profile_card_info">
                  <p className="profile_card_number">{following.length}</p>
                  <p className="profile_card_text">Following</p>
                </div>
                <div className="profile_card_info">
                  <p className="profile_card_number">{posts.length}</p>
                  <p className="profile_card_text">Posts</p>
                </div>
                <div className="profile_card_info">
                  <p className="profile_card_number">{followers.length}</p>
                  <p className="profile_card_text">Followers</p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
      <PostContainer userID={userID} mode="user" pageEnd={pageEnd} />
    </div>
  );
};

export { OtherUserPage };
