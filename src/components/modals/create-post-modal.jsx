import { Modal, Input } from "antd";
import "./modals.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNewPostModal } from "../../redux/slice/operation-slice";
import { getPosts, newPost } from "../../firebase/firestore-methods";

const NewPostModal = () => {
  const { newPostModal } = useSelector((store) => store.operationData);
  const { token } = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputField, setInputField] = useState({ caption: "", content: "" });

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await newPost(inputField.caption, inputField.content, token, "anurg");
      dispatch(getPosts());
      dispatch(hideNewPostModal());
    } catch (err) {
      console.error(err);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    dispatch(hideNewPostModal());
  };

  return (
    <Modal
      title="Create New Post"
      visible={newPostModal}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <p className="edit_profile_text">Caption</p>
      <Input
        placeholder="Post caption"
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
        placeholder="Post content"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </Modal>
  );
};

export { NewPostModal };
