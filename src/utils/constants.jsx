export const filterConstants = {
  trending: "trending",
  userPost: "user-posts",
  recent: "recent",
};

export const statusConstants = {
  idle: "idle",
  loading: "loading",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

export const cloudinaryLink =
  "https://api.cloudinary.com/v1_1/lucidui-cl-a/image/upload";

export const toastConstants = {
  signupSuccess: "SignUp Successful",
  loginAfterSignup: "Login with your new account",
  signupFailed: "SignUp failed",
  loginSuccess: "Login Successful",
  loginFailed: `Login Failed`,
  postSuccess: "New Post Created",
  postFailed: "New Post Failed",
  draftSuccess: "Added to Drafts",
  draftFailed: "Add to Draft Failed",
  deleteSuccess: "Post Deleted",
  deleteFailed: "Post delete Failed",
  editSuccess: "Post edited",
  editFailed: "Post edit Failed",
  profileSuccess: "Profile edited",
  profileFailed: "Profile edit Failed",
  logout: "You are logged out",
  commentSuccess: "Comment Added",
  commentFailed: "Comment not added",
};

export const anuragLoginCredentials = {
  email: "anurag@gmail.com",
  password: "123456",
};

export const ankushLoginCredentials = {
  email: "ankush@gmail.com",
  password: "123456",
};

export const initialSignUpInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  acceptTC: false,
};

export const titleConstants = {
  loginPage: "Login/Signup",
  bookmarkPage: "Your Bookmarked Posts",
  errorPage: "Page not Found",
  explorePage: "Explore Tradepeer",
  feedPage: "Your Feed",
  profilePage: "Your Profile page",
};

export const loginPageTabList = [
  {
    key: "login",
    tab: "Login",
  },
  {
    key: "signup",
    tab: "Sign Up",
  },
];

export const toastProps = {
  hideProgressBar: true,
  autoClose: 3500,
  position: "top-center",
  closeOnClick: true,
};

export const initialLoginInput = { email: "", password: "" };
