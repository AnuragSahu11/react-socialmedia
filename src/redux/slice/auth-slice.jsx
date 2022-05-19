import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../firebase/firebase-auth";

const initialState = {
  status: "idle",
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
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.status = "fulfilled";
    },
  },
});

export default authSlice.reducer;
