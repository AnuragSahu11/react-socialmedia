import { useSelector } from "react-redux";
import { Typography } from "antd";
import { changeTitle, onScroll } from "../../utils";
import { PostContainer } from "../../components";
import { titleConstants } from "../../utils/constants";
import { useState, useRef } from "react";

const ArchivePage = () => {
  const { Title } = Typography;
  const { token } = useSelector((store) => store.token);

  const pageRef = useRef();
  const [pageEnd, setPageEnd] = useState(false);

  changeTitle(titleConstants.bookmarkPage);

  return (
    <div
      ref={pageRef}
      className="page_wrapper"
      onScroll={() => onScroll(pageRef, setPageEnd)}
    >
      <div className="bookmark_header">
        <Title level={2}>Archived Posts</Title>
      </div>
      <PostContainer
        editPost={true}
        mode={"archive"}
        userID={token}
        pageEnd={pageEnd}
      />
    </div>
  );
};

export { ArchivePage };
