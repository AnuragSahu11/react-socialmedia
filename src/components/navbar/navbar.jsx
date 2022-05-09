import "./navbar.css";
import { Layout, Menu, Input, Row, Col, Button } from "antd";

const Navbar = () => {
  const { Header } = Layout;
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  return (
    <Header className="header header_custom">
      <Row align="middle">
        <Col flex={"auto"}>
          <Row>
            <Col className="logo navbar_logo" md={4} lg={3} xl={2}>
              <img
                className="navbar_logo_img"
                src="/images/logo_social.svg"
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
            <Button className="navbar_btn" type="primary">
              Login
            </Button>
            <Button className="navbar_btn" type="primary">
              Sign up
            </Button>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export { Navbar };
