import { Avatar, Button, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./profile-page.css";
import { EditProfileModal } from "../modals/edit-profile-modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../firebase/firestore-methods";
import { PostContainer } from "..";

const ProfilePage = () => {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const { token } = useSelector((store) => store.token);
  const { userData } = useSelector((store) => store.userData);
  const dispatch = useDispatch();

  return (
    <div className="user_profile_wrapper">
      <div className="user_profile">
        <EditProfileModal
          editProfileModal={editProfileModal}
          setEditProfileModal={setEditProfileModal}
        />
        <div className="user_profile_avatar_wrapper">
          <Avatar size={84} icon={<UserOutlined />} />
        </div>
        <div className="profile_name_id">
          <p className="profile_name">Anurag Sahu</p>
          <p className="profile_id">@Anuragsahu</p>
        </div>
        <Button
          onClick={() => setEditProfileModal((prevState) => !prevState)}
          type="primary"
        >
          Follow
        </Button>
        <div className="profile_disc">
          <p className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque vel
            saepe ut? Temporibus, qui quisquam.
          </p>
        </div>
        <Card className="profile_card">
          <div className="profile_card_div">
            <div className="profile_card_info">
              <p className="profile_card_number">13</p>
              <p className="profile_card_text">Following</p>
            </div>
            <div className="profile_card_info">
              <p className="profile_card_number">13</p>
              <p className="profile_card_text">Posts</p>
            </div>
            <div className="profile_card_info">
              <p className="profile_card_number">13</p>
              <p className="profile_card_text">Followers</p>
            </div>
          </div>
        </Card>
      </div>
      <PostContainer userID={token} editPost={true} />
    </div>
  );
};

export { ProfilePage };
