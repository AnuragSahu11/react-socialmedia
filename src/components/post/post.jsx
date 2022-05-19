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
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Comments } from "./comments";
import {
  dislikePost,
  getUserData,
  likePost,
} from "../../firebase/firestore-methods";
import { useDispatch, useSelector } from "react-redux";
import { EditPostModal } from "../modals/edit-post-modal";
import { DeletePostModal } from "../modals";
import { useNavigate } from "react-router-dom";

const Post = ({ postData, postID, editPost }) => {
  const { Meta } = Card;
  const { Text } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((store) => store.token);
  const { userData } = useSelector((store) => store.userData);

  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);

  const { caption, content, comments, postByID } = postData;

  useEffect(() => {
    setIsLiked(userData?.likedPost?.likedPost?.includes(postID));
  }, [userData]);

  const toggleEditPostModal = () => {
    setEditPostModal((prevState) => !prevState);
  };

  const toggleDeletePostModal = () => {
    setDeletePostModal((prevState) => !prevState);
  };

  const toggleComments = () => setShowComments((prevState) => !prevState);

  const clickLike = async () => {
    setIsLoading(true);
    isLiked ? await dislikePost(postID, token) : await likePost(postID, token);
    setIsLoading(false);
    dispatch(getUserData(token));
  };

  const clickProfile = () => {
    navigate(`/user/${postByID}`);
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
          title="Card title"
          description="This is the description"
          avatar={
            <Avatar size="large" src="https://joeschmoe.io/api/v1/random" />
          }
        />
        <Divider plain></Divider>
        <Space className="post_content" direction="vertical">
          <Text>{caption}</Text>
          <div className="post_image_wrapper_outer">
            <div className="post_image_wrapper">
              <Image
                className="post_image"
                src="https://picsum.photos/300/500"
              />
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
                  loading={isLoading}
                />
              </Tooltip>
              <Tooltip title="Delete post">
                <Button
                  onClick={toggleDeletePostModal}
                  size="large"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  loading={isLoading}
                />
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Like post">
              <Button
                onClick={clickLike}
                size="large"
                shape="circle"
                icon={isLiked ? <LikeTwoTone /> : <LikeOutlined />}
                loading={isLoading}
              />
            </Tooltip>
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
