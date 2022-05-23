import { Input, Button } from "antd";
import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  demoLoginCredentials,
  toastConstants,
  initialLoginInput,
} from "../../../utils/constants";
import { loginUser } from "../../../firebase/firebase-auth";

const LoginCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/user/explore";

  const { status } = useSelector((store) => store.token);
  const [loginInput, setloginInput] = useState(initialLoginInput);

  const loginClick = async (demoLogin) => {
    try {
      if (demoLogin) {
        setloginInput(demoLoginCredentials);
        await dispatch(loginUser(demoLoginCredentials));
        toast.success(toastConstants.loginSuccess);
      } else {
        await dispatch(loginUser(loginInput));
        toast.success(toastConstants.loginSuccess);
      }
    } catch (err) {
      toast.error(toastConstants.loginFailded);
    }
    navigate(from);
  };

  return (
    <div className="login_card">
      <p className="login_label">Email</p>
      <Input
        className="login_input"
        placeholder="Email Id"
        prefix={<MailOutlined />}
        onChange={(e) =>
          setloginInput({ ...loginInput, email: e.target.value })
        }
        value={loginInput.email}
      />
      <p className="login_label">Password</p>
      <Input
        type={"password"}
        className="login_input"
        placeholder="Password"
        prefix={<KeyOutlined />}
        onChange={(e) =>
          setloginInput({ ...loginInput, password: e.target.value })
        }
        value={loginInput.password}
      />
      <Button
        onClick={() => loginClick(false)}
        className="login_button"
        block={true}
        type="primary"
        loading={status === "loading"}
      >
        Login
      </Button>
      <Button
        onClick={() => loginClick(true)}
        className="demo_login_button"
        block={true}
        loading={status === "loading"}
      >
        Login with demo credentials
      </Button>
    </div>
  );
};

export { LoginCard };
