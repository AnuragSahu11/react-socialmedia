import {
  Card,
  Avatar,
  Divider,
  Typography,
  Space,
  Image,
  Button,
  Input,
  Tooltip,
  Row,
  Col,
  Comment,
  List,
} from "antd";
import { MessageTwoTone } from "@ant-design/icons";

const Comments = () => {
  const { Title, Text } = Typography;
  const { TextArea } = Input;
  const data = [
    {
      author: "Anurag Sahu",
      avatar: "https://joeschmoe.io/api/v1/random",
      content: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus,
          atque.
        </p>
      ),
    },
  ];
  return (
    <>
      <Divider plain />
      <Title level={5}>Add Comment</Title>
      <Row direction="vertical">
        <Col className="add_comment_avatar">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </Col>
        <Col flex="auto">
          <TextArea size="" placeholder="Add Comment" autoSize />
        </Col>
        <Button
          className="add_comment_button"
          type="primary"
          shape="circle"
          icon={<MessageTwoTone />}
        />
      </Row>
      <List
        className="comment-list"
        header={`${data.length} comments`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
            />
          </li>
        )}
      />
    </>
  );
};

export { Comments };
