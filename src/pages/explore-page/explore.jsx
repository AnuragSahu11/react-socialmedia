import { Typography } from "antd";
import { useSelector } from "react-redux";
import { PostContainer } from "../../components";
import { changeTitle } from "../../utils";
import { titleConstants } from "../../utils/constants";

const ExplorePage = () => {
  const { Title } = Typography;
  const { token } = useSelector((store) => store.token);

  changeTitle(titleConstants.explorePage);

  return (
    <div className="explore_wrapper">
      <div className="bookmark_header">
        <Title level={2}>Explore</Title>
      </div>
      <PostContainer userID={token} mode="explore" showSortPost={true} />
    </div>
  );
};

export { ExplorePage };
