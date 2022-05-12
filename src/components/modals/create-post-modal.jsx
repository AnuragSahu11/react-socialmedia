import { Modal, Button, Input } from "antd";
import "./modals.css";
import { useState } from "react";

const NewPostModal = () => {
  const [showNewPostModal, setNewPostModal] = useState(false);
  const { TextArea } = Input;

  const showModal = () => {
    setNewPostModal(true);
  };

  const handleOk = () => {
    setNewPostModal(false);
  };

  const handleCancel = () => {
    setNewPostModal(false);
  };

  return (
    <Modal
      title="Create New Post"
      visible={showNewPostModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="edit_profile_text">Title</p>
      <Input placeholder="Title of the Post" />
      <p className="edit_profile_text">Add Image to the Post</p>
      <p className="edit_profile_text">Post Content</p>
      <TextArea
        // value={value}
        placeholder="Post content"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </Modal>
  );
};

export { NewPostModal };
