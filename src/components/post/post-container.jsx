import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "..";
import "./post-container.css";
import { Skeleton, Input, Select } from "antd";
import { filterAndSort } from "../../utils";
import { changeSort } from "../../redux/slice/operation-slice";
import { statusConstants } from "../../utils/constants";
import { useRef } from "react";
import { getLimitedPosts, nextPosts } from "../../firebase/firestore-methods";

const PostContainer = ({
  userID,
  editPost,
  tagPosts,
  mode,
  feed,
  bookmarks,
  infiniteScroll,
}) => {
  const Option = Select.Option;
  const dispatch = useDispatch();

  const postContainerRef = useRef();
  const [limitedPosts, setLimitedPosts] = useState({});
  const [lastPost, setLastPost] = useState({});
  const [loading, setLoading] = useState(false);
  if (infiniteScroll) {
  }

  const onScroll = () => {
    if (postContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        postContainerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        nextPosts(
          lastPost,
          setLastPost,
          setLimitedPosts,
          sortPost === "recent" ? "time" : "likes"
        );
      }
    }
  };

  const { posts, status } = useSelector((store) => store.posts);
  const { userData, status: userDataStatus } = useSelector(
    (store) => store.userData
  );
  const { sortPost } = useSelector((store) => store.operationData);
  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    if (status === statusConstants.fulfilled && !infiniteScroll) {
      setPostsArray(
        filterAndSort(tagPosts || posts, mode, {
          userID,
          feed,
          sortPost,
          bookmarks,
        }).map((postData) => {
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
  }, [sortPost, userData, tagPosts]);

  useEffect(() => {
    if (infiniteScroll) {
      getLimitedPosts(
        setLastPost,
        setLimitedPosts,
        setLoading,
        sortPost === "recent" ? "time" : "likes"
      );
    }
  }, [userDataStatus]);

  useEffect(() => {
    if (infiniteScroll && userDataStatus === statusConstants.fulfilled) {
      setPostsArray(
        filterAndSort(limitedPosts, mode, {
          userID,
          feed,
          sortPost,
          bookmarks,
        }).map((postData) => {
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
  }, [limitedPosts, userDataStatus]);

  return (
    <div className="post_container" ref={postContainerRef} onScroll={onScroll}>
      {status === statusConstants.fulfilled ? (
        <>
          <Input.Group compact>
            <Select
              onChange={(e) => dispatch(changeSort(e))}
              defaultValue="recent"
            >
              <Option value="recent">Recent</Option>
              <Option value="trending">Trending</Option>
            </Select>
          </Input.Group>
          {postsArray}
        </>
      ) : (
        <>
          <Skeleton active={true} /> <Skeleton active={true} />
        </>
      )}
    </div>
  );
};

export { PostContainer };
