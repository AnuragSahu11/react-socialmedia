import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../firebase/firestore-methods";
import { statusConstants } from "../../utils/constants";

const initialState = {
  status: statusConstants.idle,
  error: null,
  posts: {},
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.status = statusConstants.loading;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = statusConstants.fulfilled;
    },
  },
});

export default postSlice.reducer;
