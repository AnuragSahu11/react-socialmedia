import { Col, Row, Card, Input, Button, Checkbox } from "antd";
import { UserOutlined, KeyOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./login-page.css";
import { signUp } from "../../firebase/firebase-auth";

const LoginPage = () => {
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
    console.log(signUpInput);
    signUp(firstName, lastName, email, password);
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
        />
        <p className="login_label">Password</p>
        <Input
          className="login_input"
          placeholder="Password"
          prefix={<KeyOutlined />}
        />
        <Button className="login_button" block={true} type="primary">
          Login
        </Button>
        <Button className="demo_login_button" block={true}>
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
