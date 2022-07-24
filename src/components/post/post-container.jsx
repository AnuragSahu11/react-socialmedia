import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Post } from "..";
import "./post-container.css";
import { Skeleton, Input, Select, Spin } from "antd";
import { changeSort } from "../../redux/slice/operation-slice";
import { statusConstants } from "../../utils/constants";
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
  pageEnd,
}) => {
  const Option = Select.Option;
  const dispatch = useDispatch();

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const { status: userDataStatus } = useSelector((store) => store.userData);
  const { userListStatus, getPostFlag } = useSelector(
    (store) => store.operationData
  );
  const { sortPost } = useSelector((store) => store.operationData);

  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [lastPost, setLastPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [infiniteLoader, setInfiniteLoading] = useState(false);
  const [postsArray, setPostsArray] = useState([]);

  const getNextPosts = () => {
    switch (mode) {
      case "explore":
        getMoreExplorePosts(
          lastPost,
          setPaginatedPosts,
          setInfiniteLoading,
          setLastPost,
          sortPost === "recent" ? "time" : "likes"
        );
        break;
      case "feed":
        getMoreExplorePosts(
          lastPost,
          setPaginatedPosts,
          setInfiniteLoading,
          setLastPost,
          sortPost === "recent" ? "time" : "likes"
        );
        break;
      case "user":
        getMoreUserPosts(
          userID,
          lastPost,
          setPaginatedPosts,
          setInfiniteLoading,
          setLastPost
        );
        break;
      case "archive":
        getMoreArchivedPosts(
          userID,
          lastPost,
          setPaginatedPosts,
          setInfiniteLoading,
          setLastPost
        );
        break;
    }
  };

  useEffect(() => {
    if (pageEnd && !infiniteLoader) {
      getNextPosts();
    }
  }, [pageEnd]);

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
  }, [userID, mode, sortPost, getPostFlag, tag]);

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
                editPost={editPost || false}
              />
            );
          }
        );
        setPostsArray(postArray);
    }
  };

  useEffect(() => {
    if (paginatedPosts && userListStatus === statusConstants.fulfilled) {
      getMorePosts(mode, feed);
    }
  }, [paginatedPosts, userDataStatus, userListStatus]);

  return (
    <div className="post_container">
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
          <div className="infinite_loader">
            <Spin indicator={antIcon} spinning={infiniteLoader} />
          </div>
        </>
      ) : (
        <>
          <Skeleton active={true} />
        </>
      )}
    </div>
  );
};

export { PostContainer };
