import { Card, Avatar } from "antd";
import { PictureTwoTone, SmileTwoTone, EditTwoTone } from "@ant-design/icons";
import {
  getPosts,
  getUserPost,
  newPost,
} from "../../../firebase/firestore-methods";
import "./feed-page-components.css";

const CreatePost = () => {
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
            onClick={() => getUserPost("MpSyr9PMbnedKtQ09DOaQah32k03")}
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
