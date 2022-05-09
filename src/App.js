import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./design system/primary-styles.css";
import "./App.css";
import {
  Feed,
  FooterComponent,
  LandingPage,
  LoginPage,
  Navbar,
  ProfilePage,
  Sidebar,
  SignUpPage,
  UserPage,
} from "./components";

function App() {
  return (
    <div className="App">
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user" element={<UserPage />}>
            <Route path="/user/feed" element={<Feed />} />
            <Route path="/user/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
        <FooterComponent />
      </Layout>
    </div>
  );
}

export default App;
