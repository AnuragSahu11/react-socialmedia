import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConstants } from "../../utils/constants";

const tagColors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const TagList = ({ tagArr, setState }) => {
  const navigate = useNavigate();

  const clickTag = (tag) => {
    !Boolean(setState) && navigate(`/user/tags/${tag}`);
  };

  const closeTag = (tag) => {
    toast.info(toastConstants.removeTag);
    setState((prevState) => {
      return {
        ...prevState,
        tags: prevState.tags.filter((tagName) => !(tagName === tag)),
      };
    });
  };

  return tagArr.map((tag) => {
    let randomColor = Math.floor(Math.random() * 10 + 1) - 1;
    return (
      <Tag
        onClick={() => clickTag(tag)}
        closable={Boolean(setState)}
        onClose={() => closeTag(tag)}
        color={tagColors[randomColor]}
        className="hover"
      >
        {tag}
      </Tag>
    );
  });
};

export { TagList };
