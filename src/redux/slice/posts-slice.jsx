import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../firebase/firestore-methods";

const initialState = {
  status: "idle",
  error: null,
  posts: {},
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "fulfilled";
    },
  },
});

export default postSlice.reducer;
