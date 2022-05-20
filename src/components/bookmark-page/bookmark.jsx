import { useSelector } from "react-redux";
import { PostContainer } from "../post/post-container";
import { Typography } from "antd";

const BookmarkPage = () => {
  const { Title } = Typography;

  const { userData } = useSelector((store) => store.userData);
  return (
    <div className="bookmarks_wrapper">
      <div className="bookmark_header">
        <Title level={2}>Your Bookmarks</Title>
      </div>
      <PostContainer bookmarks={userData?.bookmarks?.bookmarks} />
    </div>
  );
};

export { BookmarkPage };
