import { createSlice } from "@reduxjs/toolkit";
import { getUserList } from "../../firebase/firestore-methods";
import { filterConstants } from "../../utils";
import { statusConstants } from "../../utils/constants";

const initialState = {
  status: statusConstants.idle,
  error: null,
  newPostModal: false,
  draftData: null,
  darkmode: false,
  sortPost: filterConstants.recent,
  userList: null,
};

const operationSlice = createSlice({
  name: "operation",
  initialState,
  reducers: {
    showNewPostModal: (state) => {
      state.newPostModal = true;
    },
    hideNewPostModal: (state) => {
      state.draftData = null;
      state.newPostModal = false;
    },
    changeSort: (state, action) => {
      state.sortPost = action.payload;
    },
    setDraftData: (state, action) => {
      state.draftData = action.payload;
    },
    clearDraftData: (state) => {
      state.draftData = null;
    },
  },
  extraReducers: {
    [getUserList.pending]: (state) => {
      state.status = statusConstants.loading;
    },
    [getUserList.fulfilled]: (state, action) => {
      state.userList = action.payload;
      state.status = statusConstants.fulfilled;
    },
  },
});

export const {
  showNewPostModal,
  hideNewPostModal,
  changeSort,
  setDraftData,
  clearDraftData,
} = operationSlice.actions;
export default operationSlice.reducer;
