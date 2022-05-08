import { Col, Row, Card, Input, Button, Checkbox } from "antd";
import { UserOutlined, KeyOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./login-page.css";

const LoginPage = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("login");
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
      <div className="login-card">
        <p className="login-label">Email</p>
        <Input
          className="login-input"
          placeholder="Email Id"
          prefix={<MailOutlined />}
        />
        <p className="login-label">Password</p>
        <Input
          className="login-input"
          placeholder="Password"
          prefix={<KeyOutlined />}
        />
        <Button className="login-button" block={true} type="primary">
          Login
        </Button>
        <Button className="demo-login-button" block={true}>
          Login with demo credentials
        </Button>
      </div>
    ),
    signup: (
      <div>
        <p className="login-label">First Name</p>
        <Input
          className="login-input"
          placeholder="First Name"
          prefix={<UserOutlined />}
        />
        <p className="login-label">Last Name</p>
        <Input
          className="login-input"
          placeholder="Last Name"
          prefix={<UserOutlined />}
        />
        <p className="login-label">Email</p>
        <Input
          className="login-input"
          placeholder="Email Id"
          prefix={<MailOutlined />}
        />
        <p className="login-label">Password</p>
        <Input
          className="login-input"
          placeholder="Password"
          prefix={<KeyOutlined />}
        />
        <Checkbox className="remember-me" onChange={() => {}}>
          Remember me
        </Checkbox>
        <Button className="login-button" block={true} type="primary">
          Sign Up
        </Button>
      </div>
    ),
  };
  return (
    <Row>
      <Col xs={0} md={9} lg={10}>
        <p className="login-hero-text">
          <span className="text-primary-color">TradePeer </span>
          Connect with Traders around the globe.
        </p>
        <div className="login-image-wrapper">
          <img src="./images/Group.svg" alt="" />
        </div>
      </Col>
      <Col md={14} xs={24}>
        <div className="login-wrapper">
          <Card
            className="auth-card"
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
