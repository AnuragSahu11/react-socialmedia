import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../redux/slice/auth-slice";
import { toastConstants } from "../../utils/constants";
import "./modals.css";

const LogoutModal = ({ showLogoutModal, setShowLogoutModal }) => {
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(logout());
    setShowLogoutModal(false);
    toast.info(toastConstants.logout);
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
