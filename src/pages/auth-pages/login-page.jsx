import { Col, Row, Card, Input, Button, Checkbox } from "antd";
import { UserOutlined, KeyOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./login-page.css";
import { loginUser, signUp } from "../../firebase/firebase-auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeTitle } from "../../utils";
import { toast } from "react-toastify";
import {
  demoLoginCredentials,
  toastConstants,
  initialLoginInput,
  initialSignUpInput,
  titleConstants,
  loginPageTabList,
} from "../../utils/constants";
import { LoginCard } from "./components/login-card";
import { SignUpCard } from "./components/signup-card";

const LoginPage = () => {
  const { status } = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/user/explore";

  const [signUpInput, setSignUpInput] = useState(initialSignUpInput);
  const [loginInput, setloginInput] = useState(initialLoginInput);
  const [signUpLoading, setSignUpLoading] = useState(false);

  const { firstName, lastName, email, password } = signUpInput;
  const [activeTabKey1, setActiveTabKey1] = useState("login");

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  changeTitle(titleConstants.loginPage);

  const tabList = loginPageTabList;

  const contentList = {
    login: <LoginCard />,
    signup: <SignUpCard />,
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
