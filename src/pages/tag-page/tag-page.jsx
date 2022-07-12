import { Typography } from "antd";
import { changeTitle } from "../../utils";
import { PostContainer } from "../../components";
import { titleConstants } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const TagPage = () => {
  const { Title } = Typography;
  const { tag } = useParams();
  const { token } = useSelector((store) => store.token);

  changeTitle(titleConstants.bookmarkPage);

  return (
    <div className="bookmarks_wrapper">
      <div className="bookmark_header">
        <Title level={2}>#{tag}</Title>
      </div>
      <PostContainer tag={tag} mode="tag" userID={token} editPost={false} />
    </div>
  );
};

export { TagPage };
