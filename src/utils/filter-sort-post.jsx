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

const filterPost = (arr, { userID, mode, feed, bookmarks }) => {
  const archiveFilterArr = [...arr].filter((post) => !post.archive);

  switch (mode) {
    case "tag":
      return archiveFilterArr;
    case "archive":
      return arr.filter(
        (post) => post.archive === true && post.postByID === userID
      );
    case "bookmark":
      return archiveFilterArr.filter((post) => bookmarks.includes(post.postID));
    case "feed":
      return archiveFilterArr.filter(
        (post) => feed.includes(post.postByID) || post.postByID === userID
      );
    case "explore":
      console.log("expl");
      return archiveFilterArr.filter((post) => !(post.postByID === userID));
    case "user":
      return archiveFilterArr.filter((post) => post.postByID === userID);
    default:
      return archiveFilterArr;
  }

  // if (archive && userID) {
  //   return arr.filter(
  //     (post) => post.archive === true && post.postByID === userID
  //   );
  // }

  // if (userID && !feed) {
  //   return archiveFilterArr.filter((post) => post.postByID === userID);
  // }
  // if (bookmark)
  //   return archiveFilterArr.filter((post) => bookmark.includes(post.postID));

  // if (feed) {
  //   return archiveFilterArr.filter(
  //     (post) => feed.includes(post.postByID) || post.postByID === userID
  //   );
  // }
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
