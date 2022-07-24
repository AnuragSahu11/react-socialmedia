import { Skeleton } from "antd";
import { changeTitle, onScroll, statusConstants } from "../../utils";
import { EditProfileModal } from "../../components/modals/edit-profile-modal";
import { ProfileInfo } from "./components/profile-info";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { PostContainer } from "../../components/index";
import { titleConstants } from "../../utils/constants";
import "./profile-page.css";

const ProfilePage = () => {
  const { token } = useSelector((store) => store.token);
  const { userData, status } = useSelector((store) => store.userData);

  const pageRef = useRef();
  const [pageEnd, setPageEnd] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);

  changeTitle(userData?.userData?.fullName || titleConstants.profilePage);

  return (
    <div
      ref={pageRef}
      className="user_profile_wrapper page_wrapper"
      onScroll={() => onScroll(pageRef, setPageEnd)}
    >
      {status === statusConstants.loading ? (
        <Skeleton active={true} />
      ) : (
        <div className="user_profile">
          <EditProfileModal
            editProfileModal={editProfileModal}
            setEditProfileModal={setEditProfileModal}
          />
          <ProfileInfo
            userData={userData}
            setEditProfileModal={setEditProfileModal}
          />
        </div>
      )}
      <PostContainer
        userID={token}
        mode="user"
        editPost={true}
        pageEnd={pageEnd}
      />
    </div>
  );
};

export { ProfilePage };
