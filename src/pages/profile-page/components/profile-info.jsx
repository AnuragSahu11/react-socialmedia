import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import "../profile-page.css";

const ProfileInfo = ({
  userData: {
    userData,
    posts: { posts = [] } = {},
    follow: { followers = [], following = [] } = {},
  },
  setEditProfileModal,
}) => {
  const { dp, fullName, handle, bio, website, background } = userData || {};

  return (
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
      <Button
        onClick={() => setEditProfileModal((prevState) => !prevState)}
        type="primary"
      >
        Edit Profile
      </Button>
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
  );
};

export { ProfileInfo };
