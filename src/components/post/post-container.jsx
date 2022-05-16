import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "..";
import { getPosts } from "../../firebase/firestore-methods";
import "./post-container.css";
import { Skeleton } from "antd";
import { async } from "@firebase/util";

const PostContainer = () => {
  const { posts, status } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    (async () => {
      await dispatch(getPosts());
    })();
  }, []);

  useEffect(() => {
    console.log(posts, status);
    status === "fulfilled" &&
      setPostsArray(
        Object.keys(posts).map((postID) => {
          const { caption, content } = posts[postID];
          return <Post />;
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
