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
import { addComment } from "../../firebase/firestore-methods";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { toastConstants } from "../../utils/constants";
import { changePostFlag } from "../../redux/slice/operation-slice";

const Comments = ({ commentData, postID }) => {
  const { token } = useSelector((store) => store.token);
  const { userList } = useSelector((store) => store.operationData);

  const dispatch = useDispatch();

  const { Title } = Typography;
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
    if (textField.length > 0) {
      try {
        await addComment(postID, textField, token);
        toast.success(toastConstants.commentSuccess);
      } catch (err) {
        toast.error(toastConstants.commentFailed);
      }
      setLoading(false);
    } else {
      toast.warn(toastConstants.commentWarn);
    }
    dispatch(changePostFlag());
  };
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
        renderItem={({ author, avatar, content }) => (
          <li>
            <Comment author={author} avatar={avatar} content={content} />
          </li>
        )}
      />
    </>
  );
};

export { Comments };
