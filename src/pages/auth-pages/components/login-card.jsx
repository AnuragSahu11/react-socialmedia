import { Input, Button } from "antd";
import { EyeOutlined, MailOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  initialLoginInput,
  ankushLoginCredentials,
  anuragLoginCredentials,
} from "../../../utils/constants";
import { loginUser } from "../../../firebase/firebase-auth";
import { loginFormValidation } from "../../../utils";

const LoginCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/user/explore";

  const { token, status } = useSelector((store) => store.token);
  const [loginInput, setloginInput] = useState(initialLoginInput);
  const [viewPassword, setViewPassword] = useState(false);

  const loginClick = async (demoLoginCredentials) => {
    if (demoLoginCredentials || loginFormValidation(loginInput)) {
      try {
        if (demoLoginCredentials) {
          setloginInput(demoLoginCredentials);
          dispatch(loginUser(demoLoginCredentials));
        } else {
          dispatch(loginUser(loginInput));
        }
      } catch (err) {}
    } else {
      toast.warn("Enter valid details");
    }
  };

  useEffect(() => {
    if (token) {
      navigate(from);
    }
  }, [status]);

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
        type={viewPassword ? "text" : "password"}
        className="login_input"
        placeholder="Password"
        prefix={<EyeOutlined onClick={() => setViewPassword(!viewPassword)} />}
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
        onClick={() => loginClick(anuragLoginCredentials)}
        className="demo_login_button"
        block={true}
        loading={status === "loading"}
      >
        Login as Anurag
      </Button>
      <Button
        onClick={() => loginClick(ankushLoginCredentials)}
        className="demo_login_button"
        block={true}
        loading={status === "loading"}
      >
        Login as Ankush
      </Button>
    </div>
  );
};

export { LoginCard };
