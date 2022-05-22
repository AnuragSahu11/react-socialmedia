import { Modal, Input, Upload, Tooltip } from "antd";
import "./modals.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNewPostModal } from "../../redux/slice/operation-slice";
import { getPosts, newPost } from "../../firebase/firestore-methods";
import { cloudinaryLink } from "../../utils";
import { SmileOutlined } from "@ant-design/icons";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";

const NewPostModal = () => {
  const { newPostModal } = useSelector((store) => store.operationData);
  const { token } = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputField, setInputField] = useState({ caption: "", content: "" });
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
      await newPost(
        inputField.caption,
        inputField.content,
        token,
        inputField.img
      );
      dispatch(getPosts());
      dispatch(hideNewPostModal());
      toast.success("New Post Created");
    } catch (err) {
      toast.error("New Post Failed");
      console.error(err);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    dispatch(hideNewPostModal());
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
      visible={newPostModal}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={"Post"}
    >
      <p className="edit_profile_text">Caption</p>
      <Input
        placeholder="Post caption"
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
        {"Add Image to the Post"}
      </Upload>

      <p className="edit_profile_text">Post Content</p>
      <TextArea
        onChange={(e) =>
          setInputField({ ...inputField, content: e.target.value })
        }
        placeholder="Post content"
        autoSize={{ minRows: 3, maxRows: 5 }}
        value={inputField.content}
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

export { NewPostModal };
