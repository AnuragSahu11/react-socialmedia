import "./navbar.css";
import { Layout, Menu, Input, Row, Col, Button } from "antd";
import { useState } from "react";
import { LogoutModal } from "../modals";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UsersList } from "../list/users-list";
import { objectToArr, statusConstants } from "../../utils";

const Navbar = () => {
  const navigate = useNavigate();
  const { Header } = Layout;
  const { Search } = Input;

  const { token } = useSelector((store) => store.token);
  const { userList, status } = useSelector((store) => store.operationData);

  const [listData, setListData] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleLogout = () => setShowLogoutModal((prevState) => !prevState);
  const onSearch = ({ target: { value } }) => {
    const lowercaseValue = value.toLowerCase();
    if (value.length > 0)
      setListData(
        objectToArr(userList).filter(
          (user) =>
            user.fullName.toLowerCase().includes(lowercaseValue) ||
            user.handle.includes(lowercaseValue)
        )
      );
    else setListData([]);
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
          {token && (
            <Search
              className="navbar_search"
              placeholder="Search people"
              onChange={onSearch}
              disabled={status === statusConstants.loading}
              enterButton
            />
          )}

          <div className="search_result_wrapper">
            {listData.length > 0 && (
              <UsersList className="search_result" listData={listData} />
            )}
          </div>
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
