import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  newPostModal: false,
  darkmode: false,
  filterPost: null,
  sortPost: null,
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
    changeFilter: (state, action) => {
      state.filterPost = action.payload;
    },
  },
});

export const { showNewPostModal, hideNewPostModal } = operationSlice.actions;
export default operationSlice.reducer;
