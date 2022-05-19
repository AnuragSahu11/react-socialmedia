import { useSelector } from "react-redux";
import { PostContainer } from "../post/post-container";

const BookmarkPage = () => {
  const { userData } = useSelector((store) => store.userData);
  return (
    <div className="bookmarks_wrapper">
      <PostContainer bookmarks={userData?.bookmarks?.bookmarks} />
    </div>
  );
};

export { BookmarkPage };
