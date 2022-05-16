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
import { useState } from "react";
import { Comments } from "./comments";

const Post = ({ postData }) => {
  const [showComments, setShowComments] = useState(false);
  const { Meta } = Card;
  const { Text } = Typography;

  const { caption, content } = postData;

  const toggleComments = () => setShowComments((prevState) => !prevState);

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
            <Button size="large" shape="circle" icon={<LikeTwoTone />} />
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
        {showComments && <Comments />}
      </Card>
    </div>
  );
};

export { Post };
