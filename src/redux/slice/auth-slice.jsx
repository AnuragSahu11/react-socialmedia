import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../firebase/firebase-auth";
import { statusConstants } from "../../utils/constants";

const initialState = {
  status: statusConstants.idle,
  error: null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear("token");
      state.token = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = statusConstants.loading;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      state.status = statusConstants.fulfilled;
    },
    [loginUser.rejected]: (state) => {
      state.status = statusConstants.rejected;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
