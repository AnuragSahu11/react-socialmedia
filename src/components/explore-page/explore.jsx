import { PostContainer } from "..";
import { Typography } from "antd";

const ExplorePage = () => {
  const { Title } = Typography;

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
