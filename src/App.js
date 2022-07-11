import "./antd.css";

import { Navbar, NewPostModal } from "./components";
import { ToastContainer } from "react-toastify";
import { toastProps } from "./utils/constants";
import { Layout } from "antd";
import { Router } from "./router/router";

import "react-toastify/dist/ReactToastify.css";
import "./design system/primary-styles.css";
import "./design system/antd-custom-styles.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Layout>
        <ToastContainer {...toastProps} />
        <Navbar />
        <NewPostModal />
        <Router />
      </Layout>
    </div>
  );
}

export default App;
