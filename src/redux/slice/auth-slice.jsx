import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../firebase/firebase-auth";
import { statusConstants } from "../../utils/constants";

const initialState = {
  status: statusConstants.idle,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = statusConstants.loading;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.status = statusConstants.fulfilled;
    },
    [loginUser.rejected]: (state) => {
      state.status = statusConstants.rejected;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
