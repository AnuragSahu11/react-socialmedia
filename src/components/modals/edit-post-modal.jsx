import { Modal, Button, Input } from "antd";
import "./modals.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNewPostModal } from "../../redux/slice/operation-slice";
import {
  getPosts,
  newPost,
  updatePost,
} from "../../firebase/firestore-methods";

const EditPostModal = ({ isVisible, toggleModal, postData }) => {
  const { token } = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputField, setInputField] = useState({
    caption: postData.caption,
    content: postData.content,
  });

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await updatePost(postData.postID, inputField);
      dispatch(getPosts());
      toggleModal();
    } catch (err) {
      console.error(err);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    toggleModal();
  };

  return (
    <Modal
      title="Create New Post"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <p className="edit_profile_text">Caption</p>
      <Input
        placeholder="Post caption"
        value={inputField.caption}
        onChange={(e) =>
          setInputField({ ...inputField, caption: e.target.value })
        }
      />
      <p className="edit_profile_text">Add Image to the Post</p>
      <p className="edit_profile_text">Post Content</p>
      <TextArea
        onChange={(e) =>
          setInputField({ ...inputField, content: e.target.value })
        }
        value={inputField.content}
        placeholder="Post content"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </Modal>
  );
};

export { EditPostModal };
