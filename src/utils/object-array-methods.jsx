const objectToArr = (obj) => {
  return Object.keys(obj).map((userID) => {
    return {
      userID,
      ...obj[userID],
    };
  });
};

export { objectToArr };
