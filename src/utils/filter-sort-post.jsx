import { filterConstants } from "./constants";

const filterAndSort = (
  postObj,
  userID = null,
  bookmark = null,
  feed = null,
  sort = filterConstants.recent
) => {
  const postArr = Object.keys(postObj).map((postID) => {
    return { ...postObj[postID], postID };
  });
  return curryFunc(postArr, { sort, userID, bookmark, feed })(
    filterPost,
    sortPost
  );
};

const filterPost = (arr, { userID, bookmark, feed }) => {
  if (userID && !feed) {
    return arr.filter((post) => post.postByID === userID);
  }
  if (bookmark) {
    return arr.filter((post) => bookmark.includes(post.postID));
  }
  if (feed) {
    return arr.filter(
      (post) => feed.includes(post.postByID) || post.postByID === userID
    );
  }
  return arr;
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

export { filterAndSort };
