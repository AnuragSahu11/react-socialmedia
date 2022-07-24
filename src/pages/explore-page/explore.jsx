import { Typography } from "antd";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PostContainer } from "../../components";
import { changeTitle, onScroll } from "../../utils";
import { titleConstants } from "../../utils/constants";

const ExplorePage = () => {
  const { Title } = Typography;
  const { token } = useSelector((store) => store.token);
  
  const pageRef = useRef();
  const [pageEnd, setPageEnd] = useState(false);

  changeTitle(titleConstants.explorePage);

  return (
    <div
      ref={pageRef}
      className="page_wrapper"
      onScroll={() => onScroll(pageRef, setPageEnd)}
    >
      <div className="bookmark_header">
        <Title level={2}>Explore</Title>
      </div>
      <PostContainer
        userID={token}
        mode="explore"
        showSortPost={true}
        pageEnd={pageEnd}
      />
    </div>
  );
};

export { ExplorePage };
