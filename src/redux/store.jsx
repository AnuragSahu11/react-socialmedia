import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth-slice";
import userDataReducer from "./slice/userdata-slice";
import postsReducer from "./slice/posts-slice";
import operationReducer from "./slice/operation-slice";

export const store = configureStore({
  reducer: {
    token: authReducer,
    userData: userDataReducer,
    posts: postsReducer,
    operationData: operationReducer,
  },
});
