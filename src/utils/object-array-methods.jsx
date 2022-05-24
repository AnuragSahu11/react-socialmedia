const objectToArr = (obj, id = "userID") => {
  return Object.keys(obj).map((key) => {
    return {
      [id]: key,
      ...obj[key],
    };
  });
};

const notificationDisc = (name, type) => {
  switch (type) {
    case "unfollow":
      return `${name} stoped following you.`;
      break;
    case "follow":
      return `${name} started following you.`;
      break;
  }
};

export { objectToArr, notificationDisc };
