import { Typography } from "antd";
import { PostContainer } from "../../components";
import { changeTitle } from "../../utils";

const ExplorePage = () => {
  const { Title } = Typography;

  changeTitle("Explore Tradepeer");

  return (
    <div className="explore_wrapper">
      <div className="bookmark_header">
        <Title level={2}>Explore</Title>
      </div>
      <PostContainer />
    </div>
  );
};

export { ExplorePage };
