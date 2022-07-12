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
  ImportOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  archivePost,
  bookmarkPost,
  dislikePost,
  getUserData,
  likePost,
  removeBookmark,
  unArchivePost,
} from "../../firebase/firestore-methods";
import { useDispatch, useSelector } from "react-redux";
import { EditPostModal } from "../modals/edit-post-modal";
import { DeletePostModal } from "../modals";
import { useNavigate } from "react-router-dom";
import { changePostFlag, changeSort } from "../../redux/slice/operation-slice";
import { Comments } from "./comments";
import { toast } from "react-toastify";
import { toastConstants } from "../../utils/constants";
import { TagList } from "../list/tag-list";

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
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [inBookmark, setInBookmark] = useState(false);

  const {
    caption,
    content,
    comments,
    postByID,
    img,
    archive,
    tags = [],
  } = postData || {};
  const { handle, dp, fullName } = userList[postByID] || {};

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

  const clickArchive = async () => {
    setArchiveLoading(true);
    try {
      if (archive) {
        await unArchivePost(postID);
        toast.success(toastConstants.unArchiveSuccess);
      } else {
        await archivePost(postID);
        toast.success(toastConstants.archiveSuccess);
      }
      dispatch(changePostFlag());
    } catch (error) {
      toast.error(toastConstants.archiveFailed);
    }
    setArchiveLoading(false);
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
          title={fullName}
          description={`@${handle}`}
          avatar={
            dp ? (
              <Avatar size="large" src={dp} />
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
              {img && <Image className="post_image" src={img} />}
            </div>
          </div>
          <Text>{content}</Text>
        </Space>
        <div className="post_tag_container">
          <TagList tagArr={tags} />
        </div>
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
              <Tooltip title={archive ? "Unarchive Post" : "Archive Post"}>
                <Button
                  onClick={clickArchive}
                  size="large"
                  shape="circle"
                  icon={<ImportOutlined />}
                  loading={archiveLoading}
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
