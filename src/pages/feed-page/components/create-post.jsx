import { Card, Avatar, Tooltip } from "antd";
import {
  PictureTwoTone,
  SmileTwoTone,
  EditTwoTone,
  SaveTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import "./feed-page-components.css";
import { useDispatch, useSelector } from "react-redux";
import { showNewPostModal } from "../../../redux/slice/operation-slice";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store.userData);

  return (
    <div className="site_card_border_less_wrapper">
      <Card className="card_post" title="New Post" bordered={false}>
        <div className="new_post_contents">
          <Avatar
            size={65}
            src={userData?.userData?.dp}
            icon={<UserOutlined />}
          />
          <div className="button_new_post_wrapper">
            <button
              onClick={() => dispatch(showNewPostModal())}
              className="button_new_post"
            >
              Start a Post
            </button>
          </div>
        </div>
        <div className="new_post_icon_wrapper">
          <Tooltip
            onClick={() => dispatch(showNewPostModal())}
            title="Add Image"
          >
            <PictureTwoTone className="new_post_icon" />{" "}
          </Tooltip>
          <Tooltip
            onClick={() => dispatch(showNewPostModal())}
            title="Add Emoji"
          >
            <SmileTwoTone className="new_post_icon" />
          </Tooltip>
          <Tooltip
            onClick={() => dispatch(showNewPostModal())}
            title="Edit Posts"
          >
            <EditTwoTone className="new_post_icon" />
          </Tooltip>
          <Tooltip
            onClick={() => {
              navigate("/user/drafts");
            }}
            title="Go to Drafts"
          >
            <SaveTwoTone className="new_post_icon" />
          </Tooltip>
        </div>
      </Card>
    </div>
  );
};

export { CreatePost };
