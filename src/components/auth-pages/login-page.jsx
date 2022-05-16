import { Col, Row, Card, Input, Button, Checkbox } from "antd";
import { UserOutlined, KeyOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./login-page.css";
import { loginUser, signUp } from "../../firebase/firebase-auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const { token, status, error } = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTabKey1, setActiveTabKey1] = useState("login");

  const [signUpInput, setSignUpInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loginInput, setloginInput] = useState({ email: "", password: "" });

  const { firstName, lastName, email, password } = signUpInput;

  const signUpClick = () => {
    signUp(firstName, lastName, email, password);
  };

  const loginClick = async (demoLogin = false) => {
    if (demoLogin) {
      setloginInput({ email: "anurag@gmail.com", password: "123456" });
      await dispatch(
        loginUser({ email: "anurag@gmail.com", password: "123456" })
      );
    } else {
      await dispatch(loginUser(loginInput));
    }
    navigate("/user/feed");
  };

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  const tabList = [
    {
      key: "login",
      tab: "Login",
    },
    {
      key: "signup",
      tab: "Sign Up",
    },
  ];
  const contentList = {
    login: (
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
          onClick={loginClick}
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
    ),
    signup: (
      <div>
        <p className="login_label">First Name</p>
        <Input
          className="login_input"
          placeholder="First Name"
          onChange={(e) =>
            setSignUpInput({ ...signUpInput, firstName: e.target.value })
          }
          prefix={<UserOutlined />}
        />
        <p className="login_label">Last Name</p>
        <Input
          className="login_input"
          placeholder="Last Name"
          onChange={(e) =>
            setSignUpInput({ ...signUpInput, lastName: e.target.value })
          }
          prefix={<UserOutlined />}
        />
        <p className="login_label">Email</p>
        <Input
          className="login_input"
          placeholder="Email Id"
          onChange={(e) =>
            setSignUpInput({ ...signUpInput, email: e.target.value })
          }
          prefix={<MailOutlined />}
        />
        <p className="login_label">Password</p>
        <Input
          className="login_input"
          placeholder="Password"
          onChange={(e) =>
            setSignUpInput({ ...signUpInput, password: e.target.value })
          }
          prefix={<KeyOutlined />}
        />
        <Checkbox className="remember_me" onChange={() => {}}>
          Remember me
        </Checkbox>
        <Button
          onClick={signUpClick}
          className="login_button"
          block={true}
          type="primary"
        >
          Sign Up
        </Button>
      </div>
    ),
  };
  return (
    <Row>
      <Col xs={0} md={9} lg={10}>
        <p className="login_hero_text">
          <span className="text_primary_color">TradePeer </span>
          Connect with Traders around the globe.
        </p>
        <div className="login_image_wrapper">
          <img src="./images/Group.svg" alt="" />
        </div>
      </Col>
      <Col md={14} xs={24}>
        <div className="login_wrapper">
          <Card
            className="auth_card"
            title="Welcome to TradePeer"
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={(key) => {
              onTab1Change(key);
            }}
          >
            {contentList[activeTabKey1]}
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export { LoginPage };
