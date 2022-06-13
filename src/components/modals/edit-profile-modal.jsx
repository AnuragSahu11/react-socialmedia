import { Modal, Input, Upload, Tooltip } from "antd";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./modals.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cloudinaryLink } from "../../utils";
import { getUserData, updateUserData } from "../../firebase/firestore-methods";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";
import { profileFormValidation } from "../../utils/misc-operation-functions";
import { toastConstants } from "../../utils/constants";

const EditProfileModal = ({ editProfileModal, setEditProfileModal }) => {
  const { TextArea } = Input;

  const { userData } = useSelector((store) => store.userData);
  const { token } = useSelector((store) => store.token);

  const dispatch = useDispatch();

  const [inputFields, setInputFields] = useState(userData.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileListBackground, setFileListBackground] = useState([]);

  const { handle, website, bio } = inputFields || {};

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  const onEmojiClick = (event, { emoji }) => {
    setInputFields((prevState) => ({
      ...inputFields,
      bio: prevState.bio + emoji,
    }));
  };

  const handleOk = async () => {
    setIsLoading(true);
    if (profileFormValidation(inputFields)) {
      try {
        await updateUserData(token, inputFields);
        toast.success(toastConstants.profileSuccess);
      } catch (err) {
        toast.error(toastConstants.profileFailed);
      }
      setEditProfileModal(false);
      dispatch(getUserData(token));
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setEditProfileModal(false);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setInputFields({
      ...inputFields,
      dp: newFileList[0]?.response?.secure_url,
    });
  };
  const onChangeBackground = ({ fileList: newFileList }) => {
    setFileListBackground(newFileList);
    setInputFields({
      ...inputFields,
      background: newFileList[0]?.response?.secure_url,
    });
  };

  return (
    <Modal
      title="Edit Your Profile"
      visible={editProfileModal}
      onOk={handleOk}
      okText={"Save"}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <div className="edit_profile_avatar_wrapper">
        <ImgCrop rotate>
          <Upload
            action={cloudinaryLink}
            data={{ upload_preset: "erwyc7ba" }}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            maxCount={1}
          >
            {"Change Profile Picture"}
          </Upload>
        </ImgCrop>
        <ImgCrop aspect={900 / 250} rotate>
          <Upload
            action={cloudinaryLink}
            data={{ upload_preset: "erwyc7ba" }}
            listType="picture-card"
            fileList={fileListBackground}
            onChange={onChangeBackground}
            maxCount={1}
          >
            {"Change Profile Background"}
          </Upload>
        </ImgCrop>
      </div>
      <p className="edit_profile_text">Your handle</p>
      <Input
        value={handle}
        placeholder="Your account handle"
        prefix={<UserOutlined />}
        onChange={(e) =>
          setInputFields({
            ...inputFields,
            handle: e.target.value.toLowerCase(),
          })
        }
      />
      <p className="edit_profile_text">Website</p>
      <TextArea
        value={website}
        placeholder="Website Link"
        autoSize={{ minRows: 2, maxRows: 6 }}
        onChange={(e) =>
          setInputFields({ ...inputFields, website: e.target.value })
        }
      />
      <p className="edit_profile_text">Your Bio</p>
      <TextArea
        value={bio}
        placeholder="Something about yourself"
        autoSize={{ minRows: 3, maxRows: 5 }}
        onChange={(e) =>
          setInputFields({ ...inputFields, bio: e.target.value })
        }
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

export { EditProfileModal };
