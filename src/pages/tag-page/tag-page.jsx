import { Typography } from "antd";
import { changeTitle } from "../../utils";
import { PostContainer } from "../../components";
import { titleConstants } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaggedPost } from "../../firebase/firestore-methods";

const TagPage = () => {
  const { Title } = Typography;
  const { tag } = useParams();

  const [tagPosts, setTagPosts] = useState({});

  changeTitle(titleConstants.bookmarkPage);

  useEffect(() => {
    getTaggedPost(tag, setTagPosts);
  }, [tag]);

  return (
    <div className="bookmarks_wrapper">
      <div className="bookmark_header">
        <Title level={2}>#{tag}</Title>
      </div>
      <PostContainer tagPosts={tagPosts} />
    </div>
  );
};

export { TagPage };
