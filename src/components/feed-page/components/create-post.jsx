import { Card, Avatar } from "antd";
import { PictureTwoTone, SmileTwoTone, EditTwoTone } from "@ant-design/icons";
import "./feed-page-components.css";
import { useDispatch, useSelector } from "react-redux";
import { showNewPostModal } from "../../../redux/slice/operation-slice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const data = [
    "First POst",
    " lorem  ",
    "hello",
    "MpSyr9PMbnedKtQ09DOaQah32k03",
  ];
  return (
    <div className="site_card_border_less_wrapper">
      <Card className="card_post" title="New Post" bordered={false}>
        <div className="new_post_contents">
          {" "}
          <Avatar size={55} src="https://joeschmoe.io/api/v1/random" />
          <button
            onClick={() => dispatch(showNewPostModal())}
            className="button_new_post"
          >
            Start a Post
          </button>
        </div>
        <div className="new_post_icon_wrapper">
          <PictureTwoTone className="new_post_icon" />{" "}
          <SmileTwoTone className="new_post_icon" />
          <EditTwoTone />
        </div>
      </Card>
    </div>
  );
};

export { CreatePost };
