import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Post } from "..";
import "./post-container.css";
import { Skeleton } from "antd";

const PostContainer = () => {
  const { posts, status } = useSelector((store) => store.posts);
  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    status === "fulfilled" &&
      setPostsArray(
        Object.keys(posts).map((postID) => {
          return <Post key={postID} postData={posts[postID]} postID={postID} />;
        })
      );
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
