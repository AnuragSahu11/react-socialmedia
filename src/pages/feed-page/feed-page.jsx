import { useSelector } from "react-redux";
import { changeTitle, onScroll } from "../../utils";
import { PostContainer } from "../../components/post/post-container";
import { CreatePost } from "./components/create-post";
import { titleConstants } from "../../utils/constants";
import { useRef, useState } from "react";

const FeedPage = () => {
  const { userData } = useSelector((store) => store.userData);
  const { token } = useSelector((store) => store.token);

  const pageRef = useRef();
  const [pageEnd, setPageEnd] = useState(false);

  changeTitle(titleConstants.feedPage);

  return (
    <div
      ref={pageRef}
      className="page_wrapper"
      onScroll={() => onScroll(pageRef, setPageEnd)}
    >
      <CreatePost />
      <PostContainer
        feed={userData?.follow?.following}
        mode="feed"
        userID={token}
        infiniteScroll={true}
        showSortPost={true}
        pageEnd={pageEnd}
      />
    </div>
  );
};

export { FeedPage };
