import { toast } from "react-toastify";

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

const signupFormValidation = ({
  firstName,
  lastName,
  email,
  password,
  acceptTC,
}) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return firstName && lastName && regex.test(email) && password && acceptTC;
};

const loginFormValidation = ({ email, password }) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email) && password;
};

const postFormValidation = ({ caption, content }) => {
  if (caption.length < 3) {
    toast.warn("Increase post caption length");
    return false;
  }
  if (content.length < 5) {
    toast.warn("Increase post content length");
    return false;
  }
  return true;
};

const profileFormValidation = ({ handle, website, bio }) => {
  let regex = /(http|https)/;
  if (regex.test(website)) {
    toast.warn("Please remove 'https'");
    return false;
  }
  if (handle.length < 2) {
    toast.warn("Increase handle length");
    return false;
  }
  if (bio.length < 2) {
    toast.warn("Increase bio content");
    return false;
  }
  return true;
};

const tagValidation = (tag, tags) => {
  if (tags.length > 4) {
    toast.warn("Maximum 5 tags can be added");
  } else if (tags.includes(tag)) {
    toast.warn("Tag already present");
  } else if (tag.length < 4) {
    toast.warn("Tag should have atleast 4 alphabets");
  } else {
    return true;
  }
};

const onScroll = (pageRef, setPageEnd) => {
  if (pageRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = pageRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setPageEnd(true);
    }
    if (scrollTop + clientHeight <= scrollHeight - 5) {
      setPageEnd(false);
    }
  }
};

export {
  objectToArr,
  notificationDisc,
  signupFormValidation,
  loginFormValidation,
  postFormValidation,
  profileFormValidation,
  tagValidation,
  onScroll,
};
