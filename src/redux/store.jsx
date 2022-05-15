import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth-slice";
import userDataReducer from "./slice/userdata-slice";

export const store = configureStore({
  reducer: { token: authReducer, userData: userDataReducer },
});
