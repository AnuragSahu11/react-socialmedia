import { useSelector } from "react-redux";
import { changeTitle } from "../../utils";
import { PostContainer } from "../../components/post/post-container";
import { CreatePost } from "./components/create-post";

const FeedPage = () => {
  const { userData } = useSelector((store) => store.userData);
  const { token } = useSelector((store) => store.token);

  changeTitle("Your Feed");

  return (
    <div>
      <CreatePost />
      <PostContainer feed={userData?.follow?.following} userID={token} />
    </div>
  );
};

export { FeedPage };
