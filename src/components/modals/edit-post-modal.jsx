import { Modal, Input, Upload } from "antd";
import "./modals.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../firebase/firestore-methods";
import { cloudinaryLink } from "../../utils";

const EditPostModal = ({ isVisible, toggleModal, postData }) => {
  const { token } = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputField, setInputField] = useState({
    caption: postData.caption,
    content: postData.content,
    img: postData.img,
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

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setInputField({
      ...inputField,
      img: newFileList[0]?.response?.secure_url,
    });
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
      <Upload
        action={cloudinaryLink}
        data={{ upload_preset: "erwyc7ba" }}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        maxCount={1}
      >
        {"Add/Change Image"}
      </Upload>
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
