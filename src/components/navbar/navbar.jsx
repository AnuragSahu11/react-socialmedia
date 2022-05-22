import "./navbar.css";
import { Layout, Menu, Input, Row, Col, Button } from "antd";
import { useState } from "react";
import { LogoutModal } from "../modals";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { Header } = Layout;
  const { Search } = Input;

  const { token } = useSelector((store) => store.token);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const toggleLogout = () => setShowLogoutModal((prevState) => !prevState);

  const onSearch = (value) => {

  };

  return (
    <Header className="header header_custom">
      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
      <Row align="middle">
        <Col flex={"auto"}>
          <Row>
            <Col className="logo navbar_logo" md={4} lg={3} xl={2}>
              <img
                className="navbar_logo_img"
                src="/images/logo-social.svg"
                alt=""
              />
            </Col>
            <Col className="navbar_heading" md={4} lg={3} xl={2}>
              <span className="navbar_heading">TradePeer</span>
            </Col>
          </Row>
        </Col>

        <Col className="navbar_search_wrapper" xs={19} sm={18} md={10}>
          <Search
            className="navbar_search"
            placeholder="input search text"
            enterButton
          />
          
        </Col>
        <Col span={"auto"} className="navbar_buttons">
          <Row>
            {token ? (
              <Button
                onClick={() => toggleLogout()}
                className="navbar_btn"
                type="primary"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/")}
                className="navbar_btn"
                type="primary"
              >
                Login / Signup
              </Button>
            )}
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export { Navbar };
