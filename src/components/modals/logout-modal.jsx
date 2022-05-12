import { Modal, Button } from "antd";
import "./modals.css";

const LogoutModal = ({ showLogoutModal, setShowLogoutModal }) => {
  const showModal = () => {
    setShowLogoutModal(true);
  };

  const handleOk = () => {
    setShowLogoutModal(false);
  };

  const handleCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <Modal
      width={350}
      okText={"Yes"}
      visible={showLogoutModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="logout-text">Do you want to logout?</p>
    </Modal>
  );
};

export { LogoutModal };
