import "./navbar.css";
import { Layout, Menu } from "antd";

const Navbar = () => {
  const { Header } = Layout;
  return (
    <Header className="header header-custom">
      <div className="logo navbar-logo">
        <img src="/images/logo-social.svg" alt="" />
        <span className="navbar-heading">TradeMate</span>
      </div>
      <Menu mode="horizontal" />
    </Header>
  );
};

export { Navbar };
