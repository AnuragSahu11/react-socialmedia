import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "..";
import "./post-container.css";
import { Skeleton, Input, Select } from "antd";
import { filterAndSort } from "../../utils";
import { changeSort } from "../../redux/slice/operation-slice";
import { statusConstants } from "../../utils/constants";

const PostContainer = ({ userID, editPost, bookmarks, feed, archive }) => {
  const Option = Select.Option;
  const dispatch = useDispatch();

  const { posts, status } = useSelector((store) => store.posts);
  const { userData } = useSelector((store) => store.userData);
  const { sortPost } = useSelector((store) => store.operationData);
  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    if (status === statusConstants.fulfilled) {
      setPostsArray(
        filterAndSort(posts, userID, bookmarks, feed, archive, sortPost).map(
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
        )
      );
    }
  }, [sortPost, userData]);

  return (
    <div className="post_container">
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
