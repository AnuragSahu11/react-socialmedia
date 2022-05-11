import { Modal, Button, Avatar, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./modals.css";
import { useState } from "react";

const EditProfileModal = ({ editProfileModal, setEditProfileModal }) => {
  const { TextArea } = Input;

  const showModal = () => {
    setEditProfileModal(true);
  };

  const handleOk = () => {
    setEditProfileModal(false);
  };

  const handleCancel = () => {
    setEditProfileModal(false);
  };

  return (
    <Modal
      title="Edit Your Profile"
      visible={editProfileModal}
      onOk={handleOk}
      okText={"Save"}
      onCancel={handleCancel}
    >
      <div className="user_profile_avatar_wrapper">
        <Avatar size={84} icon={<UserOutlined />} />
      </div>
      <p className="edit_profile_text">Name</p>
      <Input placeholder="Full Name" prefix={<UserOutlined />} />
      <p className="edit_profile_text">Discription</p>
      <TextArea
        // value={value}
        placeholder="discription"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <p className="edit_profile_text">Website</p>
      <TextArea
        placeholder="Autosize height with minimum and maximum number of lines"
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
    </Modal>
  );
};

export { EditProfileModal };
