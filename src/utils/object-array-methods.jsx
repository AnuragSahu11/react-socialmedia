const objectToArr = (obj, id = "userID") => {
  return Object.keys(obj).map((key) => {
    return {
      [id]: key,
      ...obj[key],
    };
  });
};

export { objectToArr };
