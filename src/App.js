import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "./antd.css";
import { FooterComponent, Navbar, NewPostModal } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RequiresAuth } from "./utils";
import "./design system/primary-styles.css";
import "./design system/antd-custom-styles.css";
import "./App.css";
import {
  BookmarkPage,
  ErrorPage,
  ExplorePage,
  FeedPage,
  LoginPage,
  OtherUserPage,
  ProfilePage,
  NotificationPage,
  UserPage,
  DraftPage,
} from "./pages";

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
            <Route path="/user/feed" element={<FeedPage />} />
            <Route path="/user/profile" element={<ProfilePage />} />
            <Route path="/user/notifications" element={<NotificationPage />} />
            <Route path="/user/:userID" element={<OtherUserPage />} />
            <Route path="/user/drafts" element={<DraftPage />} />
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
