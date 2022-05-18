import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  newPostModal: false,
  darkmode: false,
  sortPost: "recent",
};

const operationSlice = createSlice({
  name: "operation",
  initialState,
  reducers: {
    showNewPostModal: (state) => {
      state.newPostModal = true;
    },
    hideNewPostModal: (state) => {
      state.newPostModal = false;
    },
    changeSort: (state, action) => {
      state.sortPost = action.payload;
    },
  },
});

export const { showNewPostModal, hideNewPostModal, changeSort } =
  operationSlice.actions;
export default operationSlice.reducer;
