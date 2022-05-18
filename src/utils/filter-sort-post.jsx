import { filterConstants } from "./constants";

const filterAndSort = (
  postObj,
  sort = filterConstants.latest,
  userID = null
) => {
  const postArr = Object.keys(postObj).map((postID) => {
    return { ...postObj[postID], postID };
  });
  return curryFunc(postArr, { sort, userID })(filterPost, sortPost);
};

const filterPost = (arr, { userID }) => {
  if (userID) {
    return arr.filter((post) => post.postByID === userID);
  }
  return arr;
};

const sortPost = (arr, { sort }) => {
  if (sort === filterConstants.latest)
    return arr.sort((a, b) => a.time - b.time);
  else return arr.sort((a, b) => b.likes - a.likes);
};

const curryFunc =
  (arr, filterData) =>
  (...args) => {
    return args.reduce((acc, crr) => {
      return crr(acc, filterData);
    }, arr);
  };

export { filterAndSort };
