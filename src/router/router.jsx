import { Route, Routes } from "react-router-dom";
import { RequiresAuth } from "./require-auth";
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
} from "../pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<RequiresAuth />}>
        <Route path="/user" element={<UserPage />}>
          <Route path="/user/explore" element={<ExplorePage />} />
          <Route path="/user/bookmark" element={<BookmarkPage />} />
          <Route path="/user/feed" element={<FeedPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/notifications" element={<NotificationPage />} />
          <Route path="/user/:userID" element={<OtherUserPage />} />
          <Route path="/user/drafts" element={<DraftPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export { Router };
