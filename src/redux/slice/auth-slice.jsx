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
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = statusConstants.loading;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.status = statusConstants.fulfilled;
    },
  },
});

export default authSlice.reducer;
