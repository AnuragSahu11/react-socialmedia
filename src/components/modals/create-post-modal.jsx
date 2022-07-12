import { Modal, Input, Upload, Tooltip, Button, Tag } from "antd";
import "./modals.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePostFlag,
  hideNewPostModal,
} from "../../redux/slice/operation-slice";
import {
  addToDraft,
  deleteFromDraft,
  getUserData,
  newPost,
} from "../../firebase/firestore-methods";
import { cloudinaryLink } from "../../utils";
import {
  SmileOutlined,
  PlusOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";
import { toastConstants } from "../../utils/constants";
import {
  tagValidation,
  postFormValidation,
} from "../../utils/misc-operation-functions";
import { TagList } from "../list/tag-list";

const NewPostModal = () => {
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const { newPostModal, draftData } = useSelector(
    (store) => store.operationData
  );
  const { token } = useSelector((store) => store.token);

  const initialInputField = { caption: "", content: "", img: "", tags: [] };
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputField, setInputField] = useState(initialInputField);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileList, setFileList] = useState([]);

  const { caption, content, img, tags } = inputField;

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  const onEmojiClick = (event, { emoji }) => {
    setInputField((prevState) => ({
      ...inputField,
      content: prevState.content + emoji,
    }));
  };

  useEffect(() => {
    if (draftData) setInputField(draftData);
  }, [draftData]);

  const handleOk = async () => {
    setConfirmLoading(true);
    if (postFormValidation(inputField)) {
      try {
        await newPost(caption, content, token, img, tags);
        if (draftData) {
          await deleteFromDraft(token, draftData.postID);
        }
        dispatch(changePostFlag());
        dispatch(hideNewPostModal());
        toast.success(toastConstants.postSuccess);
      } catch (err) {
        toast.error(toastConstants.postFailed);
      }
    }
    setConfirmLoading(false);
  };

  const draftClick = async () => {
    setConfirmLoading(true);
    try {
      await addToDraft(token, inputField);
      dispatch(getUserData(token));
      toast.success(toastConstants.draftSuccess);
    } catch (err) {
      toast.error(toastConstants.draftFailed);
    }
    setConfirmLoading(false);
  };

  const onCancel = () => {
    setInputField(initialInputField);
    dispatch(hideNewPostModal());
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setInputField({
      ...inputField,
      img: newFileList[0]?.response?.secure_url,
    });
  };

  const addTag = (tag) => {
    if (tagValidation(tag, tags)) {
      setInputField({ ...inputField, tags: [...inputField.tags, tag] });
      toast.success(toastConstants.addTag);
    }
  };

  return (
    <Modal
      title="Create New Post"
      visible={newPostModal}
      onCancel={onCancel}
      footer={[
        <Button
          key="link"
          type="primary"
          loading={confirmLoading}
          onClick={draftClick}
          icon={<ContainerOutlined />}
          disabled={draftData}
          ghost
        >
          Move to Drafts
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
          icon={<PlusOutlined />}
        >
          Add Post
        </Button>,
      ]}
    >
      <p className="edit_profile_text">Caption</p>
      <Input
        placeholder="Post caption"
        onChange={(e) =>
          setInputField({ ...inputField, caption: e.target.value })
        }
        value={caption}
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
        value={content}
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
      <p className="edit_profile_text">Add Tags</p>
      <div className="create_post_tags">
        <TagList tagArr={inputField.tags} setState={setInputField} />
      </div>
      <Input
        size="small"
        placeholder="Press Enter to add tags"
        onPressEnter={(e) => addTag(e.target.value.toLowerCase())}
      />
    </Modal>
  );
};

export { NewPostModal };
