import { Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./modals.css";
import { deletePost } from "../../firebase/firestore-methods";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastConstants } from "../../utils/constants";
import { changePostFlag } from "../../redux/slice/operation-slice";

const DeletePostModal = ({ isVisible, toggleModal, postID }) => {
  const { token } = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const clickDelete = async () => {
    setIsLoading(true);
    try {
      await deletePost(postID, token);
      dispatch(changePostFlag());
      toggleModal();
      toast.success(toastConstants.deleteSuccess);
    } catch (err) {
      toast.error(toastConstants.deleteFailed);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      visible={isVisible}
      onOk={clickDelete}
      onCancel={toggleModal}
      okText="Yes"
      cancelText="No"
      confirmLoading={isLoading}
    >
      <Space direction="horizontal">
        <ExclamationCircleOutlined className="delete_modal_icon" />
        <p>Do you want to delete this Post?</p>
      </Space>
    </Modal>
  );
};

export { DeletePostModal };
