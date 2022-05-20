import { createSlice } from "@reduxjs/toolkit";
import { filterConstants } from "../../utils";
import { statusConstants } from "../../utils/constants";

const initialState = {
  status: statusConstants.idle,
  error: null,
  newPostModal: false,
  darkmode: false,
  sortPost: filterConstants.recent,
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
