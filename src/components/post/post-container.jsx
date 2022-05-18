import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Post } from "..";
import "./post-container.css";
import { Skeleton } from "antd";
import { filterAndSort } from "../../utils";

const PostContainer = ({ userID, editPost }) => {
  const { posts, status } = useSelector((store) => store.posts);
  const { sortPost } = useSelector((store) => store.operationData);
  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    if (status === "fulfilled") {
      setPostsArray(
        filterAndSort(posts, sortPost, userID).map((postData) => {
          return (
            <Post
              key={postData.postID}
              postData={postData}
              postID={postData.postID}
              editPost={editPost || false}
            />
          );
        })
      );
    }
  }, [status]);

  return (
    <div className="post_container">
      {status === "fulfilled" ? (
        postsArray
      ) : (
        <>
          <Skeleton active={true} /> <Skeleton active={true} />
        </>
      )}
    </div>
  );
};

export { PostContainer };
