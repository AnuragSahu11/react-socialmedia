import { Modal, Input, Upload, Tooltip } from "antd";
import "./modals.css";
import { useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../firebase/firestore-methods";
import { cloudinaryLink } from "../../utils";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  const onEmojiClick = (event, { emoji }) => {
    setInputField((prevState) => ({
      ...inputField,
      content: prevState.content + emoji,
    }));
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await updatePost(postData.postID, inputField);
      dispatch(getPosts());
      toggleModal();
      toast.success("Post Successfuly Edited");
    } catch (err) {
      toast.error("Post Edit Failed");
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
      okText={"Save"}
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
      {showEmojiPicker && (
        <Picker
          className="emoji_picker"
          onEmojiClick={onEmojiClick}
          disableSearchBar={true}
          pickerStyle={{ width: "100%" }}
        />
      )}
      <div className="emoji_picker_icon_wrapper">
        <Tooltip title="Add Emoji">
          <SmileOutlined
            className="emoji_picker_icon"
            onClick={toggleEmojiPicker}
          />
        </Tooltip>
      </div>
    </Modal>
  );
};

export { EditPostModal };
