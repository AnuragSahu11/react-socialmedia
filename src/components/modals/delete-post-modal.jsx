import { Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./modals.css";
import { deletePost, getPosts } from "../../firebase/firestore-methods";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeletePostModal = ({ isVisible, toggleModal, postID }) => {
  const { token } = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const clickDelete = async () => {
    setIsLoading(true);
    try {
      await deletePost(postID, token);
      dispatch(getPosts());
      toggleModal();
    } catch (err) {}
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
