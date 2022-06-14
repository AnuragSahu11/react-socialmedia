import { useSelector } from "react-redux";
import { changeTitle } from "../../utils";
import { PostContainer } from "../../components/post/post-container";
import { CreatePost } from "./components/create-post";
import { titleConstants } from "../../utils/constants";

const FeedPage = () => {
  const { userData } = useSelector((store) => store.userData);
  const { token } = useSelector((store) => store.token);

  changeTitle(titleConstants.feedPage);

  return (
    <div>
      <CreatePost />
      <PostContainer
        feed={userData?.follow?.following}
        mode="feed"
        userID={token}
      />
    </div>
  );
};

export { FeedPage };
