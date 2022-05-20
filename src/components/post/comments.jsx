import {
  Avatar,
  Divider,
  Typography,
  Button,
  Input,
  Row,
  Col,
  Comment,
  List,
} from "antd";
import { MessageTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { addComment, getPosts } from "../../firebase/firestore-methods";
import { useDispatch, useSelector } from "react-redux";

const Comments = ({ commentData, postID }) => {
  const dispatch = useDispatch();
  const { Title, Text } = Typography;
  const { TextArea } = Input;

  const [textField, setTextField] = useState("");
  const [addLoading, setLoading] = useState(false);

  const commentList = Object.keys(commentData)
    .map((commentID) => {
      const { commentText, commentName, commentTime } = commentData[commentID];
      return {
        author: commentName,
        avatar: "https://joeschmoe.io/api/v1/random",
        content: <p>{commentText}</p>,
        commentTime: commentTime,
      };
    })
    .sort((a, b) => a.commentTime - b.commentTime);

  const addCommentClick = async () => {
    setLoading(true);
    await addComment(postID, textField, "anurag");
    setLoading(false);
    dispatch(getPosts());
  };

  return (
    <>
      <Divider plain />
      <Title level={5}>Add Comment</Title>
      <Row direction="vertical">
        <Col className="add_comment_avatar">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </Col>
        <Col flex="auto">
          <TextArea
            size=""
            onChange={(e) => setTextField(e.target.value)}
            placeholder="Add Comment"
            autoSize
          />
        </Col>
        <Button
          className="add_comment_button"
          type="primary"
          shape="circle"
          icon={<MessageTwoTone />}
          onClick={addCommentClick}
          loading={addLoading}
        />
      </Row>
      <List
        className="comment-list"
        header={`${commentList.length} comments`}
        itemLayout="horizontal"
        dataSource={commentList}
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
