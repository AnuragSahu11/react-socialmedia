import { Modal, Input, Upload, Tooltip, Button } from "antd";
import "./modals.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNewPostModal } from "../../redux/slice/operation-slice";
import {
  addToDraft,
  getPosts,
  newPost,
} from "../../firebase/firestore-methods";
import { cloudinaryLink } from "../../utils";
import { SmileOutlined } from "@ant-design/icons";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";
import { toastConstants } from "../../utils/constants";

const NewPostModal = () => {
  const { newPostModal } = useSelector((store) => store.operationData);
  const { token } = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputField, setInputField] = useState({ caption: "", content: "" });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileList, setFileList] = useState([]);

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
      toast.success(toastConstants.postSuccess);
    } catch (err) {
      toast.error(toastConstants.postFailed);
      console.error(err);
    }
    setConfirmLoading(false);
  };

  const draftClick = async () => {
    try {
      await addToDraft(token, inputField);
    } catch (err) {}
  };

  const onCancel = () => {
    dispatch(hideNewPostModal());
  };

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
      onCancel={onCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          // loading={loading}
          // onClick={handleOk}
        >
          Add Post
        </Button>,
        <Button
          key="link"
          type="primary"
          // loading={loading}
          // onClick={handleOk}
        >
          Move to Drafts
        </Button>,
      ]}
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
