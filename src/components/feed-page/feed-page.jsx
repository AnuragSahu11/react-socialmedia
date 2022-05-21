import { useSelector } from "react-redux";
import { changeTitle } from "../../utils";
import { PostContainer } from "../post/post-container";
import { CreatePost } from "./components/create-post";

const Feed = () => {
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

export { Feed };
