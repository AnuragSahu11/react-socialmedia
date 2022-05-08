import "./navbar.css";
import { Layout, Menu, Input, Row, Col, Button } from "antd";

const Navbar = () => {
  const { Header } = Layout;
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  return (
    <Header className="header header-custom">
      <Row align="middle">
        <Col flex={"auto"}>
          <Row>
            <Col className="logo navbar-logo" md={4} lg={3} xl={2}>
              <img
                className="navbar-logo-img"
                src="/images/logo-social.svg"
                alt=""
              />
            </Col>
            <Col className="navbar-heading" md={4} lg={3} xl={2}>
              <span className="navbar-heading">TradePeer</span>
            </Col>
          </Row>
        </Col>

        <Col className="navbar-search-wrapper" xs={19} sm={18} md={10}>
          <Search
            className="navbar-search"
            placeholder="input search text"
            enterButton
          />
        </Col>
        <Col span={"auto"} className="navbar-buttons">
          <Row>
            <Button className="navbar-btn" type="primary">
              Login
            </Button>
            <Button className="navbar-btn" type="primary">
              Sign up
            </Button>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export { Navbar };
