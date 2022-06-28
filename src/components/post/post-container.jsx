import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "..";
import "./post-container.css";
import { Skeleton, Input, Select } from "antd";
import { changeSort } from "../../redux/slice/operation-slice";
import { statusConstants } from "../../utils/constants";
import { useRef } from "react";
import {
  archivedPosts,
  explorePagePosts,
  getMoreArchivedPosts,
  getMoreExplorePosts,
  getMoreUserPosts,
  getTaggedPosts,
  userPosts,
  getBookmarkedPosts,
} from "../../firebase/firestore-methods";
import { filterPost } from "../../utils/filter-sort-post";

const PostContainer = ({
  userID,
  editPost,
  tag,
  mode,
  feed,
  bookmarks,
  showSortPost,
}) => {
  const Option = Select.Option;
  const dispatch = useDispatch();
  const postContainerRef = useRef();

  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [lastPost, setLastPost] = useState({});
  const [loading, setLoading] = useState(false);

  const { posts, status } = useSelector((store) => store.posts);
  const { userList, userListStatus } = useSelector(
    (store) => store.operationData
  );

  const { userData, status: userDataStatus } = useSelector(
    (store) => store.userData
  );
  const { sortPost } = useSelector((store) => store.operationData);
  const [postsArray, setPostsArray] = useState([]);

  const onScroll = () => {
    if (postContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        postContainerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        switch (mode) {
          case "explore":
            getMoreExplorePosts(
              lastPost,
              setPaginatedPosts,
              setLoading,
              setLastPost,
              sortPost === "recent" ? "time" : "likes"
            );
            break;
          case "feed":
            getMoreExplorePosts(
              lastPost,
              setPaginatedPosts,
              setLoading,
              setLastPost,
              sortPost === "recent" ? "time" : "likes"
            );
            break;
          case "user":
            getMoreUserPosts(
              userID,
              lastPost,
              setPaginatedPosts,
              setLoading,
              setLastPost
            );
            break;
          case "archive":
            getMoreArchivedPosts(
              userID,
              lastPost,
              setPaginatedPosts,
              setLoading,
              setLastPost
            );
            break;
        }
      }
    }
  };

  useEffect(() => {
    setPaginatedPosts([]);
    setLastPost({});
    switch (mode) {
      case "explore":
        explorePagePosts(
          setPaginatedPosts,
          setLoading,
          setLastPost,
          sortPost === "recent" ? "time" : "likes"
        );
        break;
      case "feed":
        explorePagePosts(
          setPaginatedPosts,
          setLoading,
          setLastPost,
          sortPost === "recent" ? "time" : "likes"
        );
        break;
      case "user":
        userPosts(userID, setPaginatedPosts, setLoading, setLastPost);
        break;
      case "archive":
        archivedPosts(userID, setPaginatedPosts, setLoading, setLastPost);
        break;
      case "tag":
        getTaggedPosts(tag, setPaginatedPosts, setLoading);
        break;
      case "bookmark":
        getBookmarkedPosts(setPaginatedPosts, setLoading);
        break;
    }
  }, [userID, mode, sortPost]);

  useEffect(() => {
    if (paginatedPosts && userListStatus === statusConstants.fulfilled) {
      getMorePosts(mode, feed);
    }
  }, [paginatedPosts, userDataStatus, userListStatus, tag]);

  const getMorePosts = (mode, feed = []) => {
    let postArray;
    switch (mode) {
      case "explore":
        postArray = filterPost(paginatedPosts, { mode }).map((postData) => {
          return (
            <Post
              key={postData.postID}
              postData={postData}
              postID={postData.postID}
              editPost={editPost || false}
            />
          );
        });
        setPostsArray(postArray);
        break;
      case "feed":
        postArray = filterPost(paginatedPosts, { userID, feed, mode }).map(
          (postData) => {
            return (
              <Post
                key={postData.postID}
                postData={postData}
                postID={postData.postID}
                editPost={editPost || false}
              />
            );
          }
        );
        setPostsArray(postArray);
        break;
      case "bookmark":
        postArray = filterPost(paginatedPosts, { bookmarks, mode }).map(
          (postData) => {
            return (
              <Post
                key={postData.postID}
                postData={postData}
                postID={postData.postID}
                editPost={editPost || false}
              />
            );
          }
        );
        setPostsArray(postArray);
        break;
      default:
        postArray = filterPost(paginatedPosts, { userID, feed, mode }).map(
          (postData) => {
            return (
              <Post
                key={postData.postID}
                postData={postData}
                postID={postData.postID}
                editPost={editPost || true}
              />
            );
          }
        );
        setPostsArray(postArray);
    }
  };

  return (
    <div className="post_container" ref={postContainerRef} onScroll={onScroll}>
      {!loading ? (
        <>
          {showSortPost && (
            <Input.Group compact>
              <Select
                onChange={(e) => dispatch(changeSort(e))}
                defaultValue={sortPost}
              >
                <Option value="recent">Recent</Option>
                <Option value="trending">Trending</Option>
              </Select>
            </Input.Group>
          )}

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
