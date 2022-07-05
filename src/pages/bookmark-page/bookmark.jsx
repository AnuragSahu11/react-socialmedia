import { useSelector } from "react-redux";
import { Typography } from "antd";
import { changeTitle } from "../../utils";
import { PostContainer } from "../../components";
import { titleConstants } from "../../utils/constants";

const BookmarkPage = () => {
  const { Title } = Typography;

  const { userData } = useSelector((store) => store.userData);
  const { token } = useSelector((store) => store.token);

  changeTitle(titleConstants.bookmarkPage);
  return (
    <div className="bookmarks_wrapper">
      <div className="bookmark_header">
        <Title level={2}>Your Bookmarks</Title>
      </div>
      <PostContainer
        bookmarks={userData?.bookmarks?.bookmarks}
        userID={token}
        mode="bookmark"
      />
    </div>
  );
};

export { BookmarkPage };
