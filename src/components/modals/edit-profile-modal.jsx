import { Modal, Button, Avatar, Input, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "./modals.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cloudinaryLink, uploadImage } from "../../utils";
import { updateUserData } from "../../firebase/firestore-methods";

const EditProfileModal = ({ editProfileModal, setEditProfileModal }) => {
  const { TextArea } = Input;

  const { userData } = useSelector((store) => store.userData);
  const { token } = useSelector((store) => store.token);

  const [inputFields, setInputFields] = useState(userData.userData);
  const [isLoading, setIsLoading] = useState(false);

  const handleOk = async () => {
    setIsLoading(true);
    console.log(inputFields);
    await updateUserData(token, inputFields);
    setIsLoading(false);
    setEditProfileModal(false);
  };

  const handleCancel = () => {
    setEditProfileModal(false);
  };

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setInputFields({
      ...inputFields,
      dp: newFileList[0]?.response?.secure_url,
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
      <div className="user_profile_avatar_wrapper">
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
      </div>
      <p className="edit_profile_text">Your handle</p>
      <Input
        value={inputFields?.handle}
        placeholder="Your account handle"
        prefix={<UserOutlined />}
        onChange={(e) =>
          setInputFields({
            ...inputFields,
            handle: e.target.value.toLowerCase(),
          })
        }
      />
      <p className="edit_profile_text">Your Bio</p>
      <TextArea
        value={inputFields?.bio}
        placeholder="Something about yourself"
        autoSize={{ minRows: 3, maxRows: 5 }}
        onChange={(e) =>
          setInputFields({ ...inputFields, bio: e.target.value })
        }
      />
      <p className="edit_profile_text">Website</p>
      <TextArea
        value={inputFields?.website}
        placeholder="Website Link"
        autoSize={{ minRows: 2, maxRows: 6 }}
        onChange={(e) =>
          setInputFields({ ...inputFields, website: e.target.value })
        }
      />
    </Modal>
  );
};

export { EditProfileModal };
