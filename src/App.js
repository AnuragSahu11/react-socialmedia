import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "../node_modules/antd/dist/antd.css";
import "./design system/primary-styles.css";
import "./App.css";
import {
  BookmarkPage,
  ErrorPage,
  ExplorePage,
  Feed,
  FooterComponent,
  LoginPage,
  Navbar,
  NewPostModal,
  ProfilePage,
  UserPage,
} from "./components";
import { NotificationPage } from "./components/notification-page/notification-page";

function App() {
  return (
    <div className="App">
      <Layout>
        <Navbar />
        <NewPostModal />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />}>
            <Route path="/user/explore" element={<ExplorePage />} />
            <Route path="/user/bookmark" element={<BookmarkPage />} />
            <Route path="/user/feed" element={<Feed />} />
            <Route path="/user/profile" element={<ProfilePage />} />
            <Route path="/user/notifications" element={<NotificationPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <FooterComponent />
      </Layout>
    </div>
  );
}

export default App;
