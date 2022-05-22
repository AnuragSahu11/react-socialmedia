import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "./antd.css";
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
  NotificationPage,
  OtherUserPage,
} from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RequiresAuth } from "./utils";

function App() {
  return (
    <div className="App">
      <Layout>
        <ToastContainer hideProgressBar={true} autoClose={3500} />
        <Navbar />
        <NewPostModal />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/user"
            element={
              <RequiresAuth>
                <UserPage />
              </RequiresAuth>
            }
          >
            <Route path="/user/explore" element={<ExplorePage />} />
            <Route path="/user/bookmark" element={<BookmarkPage />} />
            <Route path="/user/feed" element={<Feed />} />
            <Route path="/user/profile" element={<ProfilePage />} />
            <Route path="/user/notifications" element={<NotificationPage />} />
            <Route path="/user/:userID" element={<OtherUserPage />} />
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
