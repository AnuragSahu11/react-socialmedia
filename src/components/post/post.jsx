import {
  Card,
  Avatar,
  Divider,
  Typography,
  Space,
  Image,
  Button,
  Tooltip,
} from "antd";
import {
  LikeTwoTone,
  LikeOutlined,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  BookTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  bookmarkPost,
  dislikePost,
  getUserData,
  likePost,
  removeBookmark,
} from "../../firebase/firestore-methods";
import { useDispatch, useSelector } from "react-redux";
import { EditPostModal } from "../modals/edit-post-modal";
import { DeletePostModal } from "../modals";
import { useNavigate } from "react-router-dom";
import { changeSort } from "../../redux/slice/operation-slice";
import { Comments } from "./comments";

const Post = ({ postData, postID, editPost }) => {
  const { Meta } = Card;
  const { Text } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((store) => store.token);
  const { userData } = useSelector((store) => store.userData);
  const { userList } = useSelector((store) => store.operationData);

  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [inBookmark, setInBookmark] = useState(false);
  const [postInfo, setPostInfo] = useState({});

  const { caption, content, comments, postByID } = postData;

  useEffect(() => {
    setIsLiked(userData?.likedPost?.likedPost?.includes(postID));
    setInBookmark(userData?.bookmarks?.bookmarks?.includes(postID));
  }, [userData]);

  const toggleEditPostModal = () => {
    setEditPostModal((prevState) => !prevState);
  };

  const toggleDeletePostModal = () => {
    setDeletePostModal((prevState) => !prevState);
  };

  const toggleComments = () => setShowComments((prevState) => !prevState);

  const clickLike = async () => {
    setLikeLoading(true);
    isLiked ? await dislikePost(postID, token) : await likePost(postID, token);
    setLikeLoading(false);
    dispatch(getUserData(token));
  };

  const clickBookmark = async () => {
    setBookmarkLoading(true);
    inBookmark
      ? await removeBookmark(postID, token)
      : await bookmarkPost(postID, token);

    setBookmarkLoading(false);
    dispatch(getUserData(token));
    dispatch(changeSort("recent"));
  };

  const clickProfile = () => {
    postByID === token
      ? navigate("/user/profile")
      : navigate(`/user/${postByID}`);
  };

  return (
    <div className="post_wrapper">
      <EditPostModal
        isVisible={editPostModal}
        toggleModal={toggleEditPostModal}
        postData={postData}
      />
      <DeletePostModal
        isVisible={deletePostModal}
        toggleModal={toggleDeletePostModal}
        postID={postID}
      />
      <Card>
        <Meta
          className="hover"
          onClick={clickProfile}
          title={userList[postByID]?.fullName}
          description={userList[postByID]?.handle}
          avatar={
            userList[postByID]?.dp ? (
              <Avatar size="large" src={userList[postByID]?.dp} />
            ) : (
              <Avatar size="large" icon={<UserOutlined />} />
            )
          }
        />
        <Divider plain></Divider>
        <Space className="post_content" direction="vertical">
          <Text>{caption}</Text>
          <div className="post_image_wrapper_outer">
            <div className="post_image_wrapper">
              {postData?.img && (
                <Image className="post_image" src={postData?.img} />
              )}
            </div>
          </div>
          <Text>{content}</Text>
        </Space>
        <Divider plain></Divider>
        <Space>
          {editPost ? (
            <>
              <Tooltip title="Edit post">
                <Button
                  onClick={toggleEditPostModal}
                  size="large"
                  shape="circle"
                  icon={<EditOutlined />}
                />
              </Tooltip>
              <Tooltip title="Delete post">
                <Button
                  onClick={toggleDeletePostModal}
                  size="large"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Like post">
                <Button
                  onClick={clickLike}
                  size="large"
                  shape="circle"
                  icon={isLiked ? <LikeTwoTone /> : <LikeOutlined />}
                  loading={likeLoading}
                />
              </Tooltip>
              <Tooltip title="Bookmark post">
                <Button
                  onClick={clickBookmark}
                  size="large"
                  shape="circle"
                  icon={inBookmark ? <BookTwoTone /> : <BookOutlined />}
                  loading={bookmarkLoading}
                />
              </Tooltip>
            </>
          )}

          <Tooltip title="Comments">
            <Button
              onClick={toggleComments}
              size="large"
              shape="circle"
              icon={<CommentOutlined />}
            />
          </Tooltip>
        </Space>
        {showComments && <Comments commentData={comments} postID={postID} />}
      </Card>
    </div>
  );
};

export { Post };
