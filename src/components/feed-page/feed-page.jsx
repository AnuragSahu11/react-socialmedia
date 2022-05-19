import { PostContainer } from "../post/post-container";
import { CreatePost } from "./components/create-post";

const Feed = () => {
  return (
    <div>
      <CreatePost />
      <PostContainer />
    </div>
  );
};

export { Feed };
