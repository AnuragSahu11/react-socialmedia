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

export { filterPost };
