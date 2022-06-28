import { filterConstants } from "./constants";

const filterAndSort = (
  postObj,
  mode,
  { userID = null, feed = null, sort = filterConstants.recent, bookmarks = [] }
) => {
  const postArr = Object.keys(postObj).map((postID) => {
    return { ...postObj[postID], postID };
  });
  return curryFunc(postArr, { sort, userID, mode, feed, bookmarks })(
    filterPost,
    sortPost
  );
};

const filterPost = (
  postArr,
  { userID = null, mode = null, feed = null, bookmarks = null } = null
) => {
  const archiveFilterArr = [...postArr].filter((post) => !post.archive);
  switch (mode) {
    case "archive":
      return postArr.filter(
        (post) => post.archive === true && post.postByID === userID
      );
    case "bookmark":
      return archiveFilterArr.filter((post) => bookmarks.includes(post.postID));
    case "feed":
      return archiveFilterArr.filter(
        (post) => feed.includes(post.postByID) || post.postByID === userID
      );
    default:
      return archiveFilterArr;
  }
};

const sortPost = (arr, { sort }) => {
  if (sort === filterConstants.recent)
    return arr.sort((a, b) => b.time - a.time);
  else return arr.sort((a, b) => b.likes - a.likes);
};

const curryFunc =
  (arr, filterData) =>
  (...args) => {
    return args.reduce((acc, crr) => {
      return crr(acc, filterData);
    }, arr);
  };

export { filterAndSort, filterPost };
