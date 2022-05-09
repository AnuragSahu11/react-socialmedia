import { Card, Avatar } from "antd";
import { PictureTwoTone, SmileTwoTone, EditTwoTone } from "@ant-design/icons";
import "./feed-page-components.css";

const CreatePost = () => {
  const { Meta } = Card;
  return (
    <div className="site-card-border-less-wrapper">
      <Card className="card-post" title="New Post" bordered={false}>
        <div className="new-post-contents">
          {" "}
          <Avatar size={55} src="https://joeschmoe.io/api/v1/random" />
          <button className="button-new-post">Start a Post</button>
        </div>
        <div className="new-post-icon-wrapper">
          <PictureTwoTone className="new-post-icon" />{" "}
          <SmileTwoTone className="new-post-icon" />
          <EditTwoTone />
        </div>
      </Card>
    </div>
  );
};

export { CreatePost };
