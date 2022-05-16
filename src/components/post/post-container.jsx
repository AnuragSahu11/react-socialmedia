import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "..";
import { getPosts } from "../../firebase/firestore-methods";
import "./post-container.css";
import { Skeleton } from "antd";

const PostContainer = () => {
  const { posts, status } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    status === "fulfilled" &&
      setPostsArray(
        Object.keys(posts).map((postID) => {
          return <Post postData={posts[postID]} />;
        })
      );
  }, [status]);

  return (
    <div className="post_container">
      {status === "fulfilled" ? postsArray : <Skeleton />}
    </div>
  );
};

export { PostContainer };
