import { Typography } from "antd";
import { PostContainer } from "../../components";
import { changeTitle } from "../../utils";
import { titleConstants } from "../../utils/constants";

const ExplorePage = () => {
  const { Title } = Typography;

  changeTitle(titleConstants.explorePage);

  return (
    <div className="explore_wrapper">
      <div className="bookmark_header">
        <Title level={2}>Explore</Title>
      </div>
      <PostContainer mode="explore" />
    </div>
  );
};

export { ExplorePage };
