import { Tag } from "antd";

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

const TagList = ({ tagArr }) => {
  return tagArr.map((tag) => {
    let randomColor = Math.floor(Math.random() * 10 + 1) - 1;
    return <Tag color={tagColors[randomColor]}>{tag}</Tag>;
  });
};

export { TagList };
