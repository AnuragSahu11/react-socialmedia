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
import { LikeTwoTone, LikeOutlined, CommentOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Comments } from "./comments";
import {
  dislikePost,
  getPosts,
  getUserData,
  likePost,
} from "../../firebase/firestore-methods";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ postData, postID }) => {
  const { token } = useSelector((store) => store.token);
  const { userData } = useSelector((store) => store.userData);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const { Meta } = Card;
  const { Text } = Typography;

  const [showComments, setShowComments] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const { caption, content, comments } = postData;

  useEffect(() => {
    setIsLiked(userData?.likedPost?.likedPost?.includes(postID));
  }, [userData]);

  const toggleComments = () => setShowComments((prevState) => !prevState);

  const clickLike = async () => {
    setLikeLoading(true);
    isLiked ? await dislikePost(postID, token) : await likePost(postID, token);
    setLikeLoading(false);
    dispatch(getUserData(token));
  };

  return (
    <div className="post_wrapper">
      <Card>
        <Meta
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
          <Tooltip title="Like post">
            <Button
              onClick={clickLike}
              size="large"
              shape="circle"
              icon={isLiked ? <LikeTwoTone /> : <LikeOutlined />}
              loading={likeLoading}
            />
          </Tooltip>
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
