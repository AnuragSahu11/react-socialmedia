import { useSelector } from "react-redux";
import { Typography } from "antd";
import { changeTitle } from "../../utils";
import { PostContainer } from "../../components";
import { titleConstants } from "../../utils/constants";

const ArchivePage = () => {
  const { Title } = Typography;

  const { token } = useSelector((store) => store.token);
  
  changeTitle(titleConstants.bookmarkPage);

  return (
    <div className="bookmarks_wrapper">
      <div className="bookmark_header">
        <Title level={2}>Archived Posts</Title>
      </div>
      <PostContainer editPost={true} archive={true} userID={token} />
    </div>
  );
};

export { ArchivePage };
