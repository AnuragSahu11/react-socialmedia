import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/auth-slice";
import "./modals.css";

const LogoutModal = ({ showLogoutModal, setShowLogoutModal }) => {
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(logout());
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
