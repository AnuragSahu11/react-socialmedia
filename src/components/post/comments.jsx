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
import { UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Comments = ({ commentData, postID }) => {
  const { token } = useSelector((store) => store.token);
  const { userList } = useSelector((store) => store.operationData);
  const { userData } = useSelector((store) => store.userData);

  const dispatch = useDispatch();

  const { Title, Text } = Typography;
  const { TextArea } = Input;

  const [textField, setTextField] = useState("");
  const [addLoading, setLoading] = useState(false);

  const commentList = Object.keys(commentData)
    .map((commentID) => {
      const { commentText, commenterID, commentTime } = commentData[commentID];
      return {
        author: userList[commenterID].fullName,
        avatar: userList[commenterID].dp || <UserOutlined />,
        content: <p>{commentText}</p>,
        commentTime: commentTime,
      };
    })
    .sort((a, b) => a.commentTime - b.commentTime);

  const addCommentClick = async () => {
    setLoading(true);
    try {
      await addComment(postID, textField, token);
      toast.success("Comment Added");
    } catch (err) {
      toast.error("Add Comment Failed");
    }
    setLoading(false);
    dispatch(getPosts());
  };
  console.log(userList[token].fullName);
  return (
    <>
      <Divider plain />
      <Title level={5}>Add Comment</Title>
      <Row direction="vertical">
        <Col className="add_comment_avatar">
          {userList[token].dp ? (
            <Avatar src={userList[token].dp} />
          ) : (
            <Avatar icon={<UserOutlined />} />
          )}
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
              // datetime={item.commentTime}
            />
          </li>
        )}
      />
    </>
  );
};

export { Comments };
