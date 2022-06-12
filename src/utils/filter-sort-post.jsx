import { filterConstants } from "./constants";

const filterAndSort = (
  postObj,
  userID = null,
  bookmark = null,
  feed = null,
  archive = null,
  sort = filterConstants.recent
) => {
  const postArr = Object.keys(postObj).map((postID) => {
    return { ...postObj[postID], postID };
  });
  return curryFunc(postArr, { sort, userID, bookmark, feed, archive })(
    filterPost,
    sortPost
  );
};

const filterPost = (arr, { userID, bookmark, feed, archive }) => {
  const archiveFilterArr = [...arr].filter((post) => !post.archive);

  if (archive && userID) {
    return arr.filter(
      (post) => post.archive === true && post.postByID === userID
    );
  }

  if (userID && !feed) {
    return archiveFilterArr.filter((post) => post.postByID === userID);
  }
  if (bookmark)
    return archiveFilterArr.filter((post) => bookmark.includes(post.postID));

  if (feed) {
    return archiveFilterArr.filter(
      (post) => feed.includes(post.postByID) || post.postByID === userID
    );
  }
  return archiveFilterArr;
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
