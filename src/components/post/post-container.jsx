import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "..";
import "./post-container.css";
import { Skeleton, Input, Select } from "antd";
import { filterAndSort } from "../../utils";
import { changeSort } from "../../redux/slice/operation-slice";
import { statusConstants } from "../../utils/constants";
import { useRef } from "react";
import {
  explorePagePosts,
  getLimitedPosts,
  getMoreExplorePosts,
  nextPosts,
} from "../../firebase/firestore-methods";
import { filterPosts } from "../../utils/filter-sort-post";

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

  const [paginatedPosts, setPaginatedPosts] = useState({});
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
        getMoreExplorePosts(
          userID,
          lastPost,
          setPaginatedPosts,
          setLoading,
          setLastPost
        );
      }
    }
  };

  useEffect(() => {
    explorePagePosts(userID, setPaginatedPosts, setLoading, setLastPost);

    // switch (mode) {
    //   case "explore" || "feed":
    //     explorePagePosts(userID, setPaginatedPosts, setLoading, setLastPost);
    // }
  }, []);

  useEffect(() => {
    if (paginatedPosts && userListStatus === statusConstants.fulfilled) {
      getMorePosts(mode, feed);
    }
  }, [paginatedPosts, userDataStatus]);

  const getMorePosts = (mode, feed = []) => {
    let postArray;
    switch (mode) {
      case "explore":
        postArray = filterPosts(paginatedPosts).map((postData) => {
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
        postArray = filterPosts(paginatedPosts, userID, feed).map(
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
        console.log(filterPosts(paginatedPosts, userID, feed));
        setPostsArray(postArray);
        break;
    }

    // if (mode === "explore") {
    //   setPostsArray(
    //     Object.keys(paginatedPosts)
    //       .map((postID) => {
    //         return { ...paginatedPosts[postID], postID };
    //       })
    //       .map((postData) => {
    //         return (
    //           <Post
    //             key={postData.postID}
    //             postData={postData}
    //             postID={postData.postID}
    //             editPost={editPost || false}
    //           />
    //         );
    //       })
    //   );
    // }
    if (mode === "feed") {
    }
  };

  // useEffect(() => {
  //   if (status === statusConstants.fulfilled && !infiniteScroll) {
  //     setPostsArray(
  //       filterAndSort(tagPosts || posts, mode, {
  //         userID,
  //         feed,
  //         sortPost,
  //         bookmarks,
  //       }).map((postData) => {
  //         return (
  //           <Post
  //             key={postData.postID}
  //             postData={postData}
  //             postID={postData.postID}
  //             editPost={editPost || false}
  //           />
  //         );
  //       })
  //     );
  //   }
  // }, [sortPost, userData, tagPosts]);

  // useEffect(() => {
  //   if (infiniteScroll) {
  //     getLimitedPosts(
  //       setLastPost,
  //       setLimitedPosts,
  //       setLoading,
  //       sortPost === "recent" ? "time" : "likes"
  //     );
  //   }
  // }, [userDataStatus]);

  // useEffect(() => {
  //   if (infiniteScroll && userDataStatus === statusConstants.fulfilled) {
  //     setPostsArray(
  //       filterAndSort(limitedPosts, mode, {
  //         userID,
  //         feed,
  //         sortPost,
  //         bookmarks,
  //       }).map((postData) => {
  //         return (
  //           <Post
  //             key={postData.postID}
  //             postData={postData}
  //             postID={postData.postID}
  //             editPost={editPost || false}
  //           />
  //         );
  //       })
  //     );
  //   }
  // }, [limitedPosts, userDataStatus]);

  return (
    <div className="post_container" ref={postContainerRef} onScroll={onScroll}>
      {!loading ? (
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
