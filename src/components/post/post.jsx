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

  //   const { title, content, time, likes, postBy } = postData;

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
          <Text>My First Post</Text>
          <div className="post_image_wrapper_outer">
            <div className="post_image_wrapper">
              <Image
                className="post_image"
                src="https://picsum.photos/300/500"
              />
            </div>
          </div>

          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            laudantium deleniti debitis rerum repellendus cum sint a. Tenetur
            aliquam, quia tempore repudiandae totam saepe laboriosam at
            reiciendis? Itaque voluptas id natus fuga quisquam hic quam possimus
            quas eveniet, esse architecto.
          </Text>
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
