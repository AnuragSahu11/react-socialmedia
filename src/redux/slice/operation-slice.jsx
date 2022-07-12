import { createSlice } from "@reduxjs/toolkit";
import { getUserList } from "../../firebase/firestore-methods";
import { filterConstants } from "../../utils";
import { statusConstants } from "../../utils/constants";

const initialState = {
  userListStatus: statusConstants.idle,
  error: null,
  newPostModal: false,
  draftData: null,
  darkmode: false,
  sortPost: filterConstants.recent,
  userList: null,
  getPostFlag: false,
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
    changePostFlag: (state) => {
      state.getPostFlag = !state.getPostFlag;
    },
  },
  extraReducers: {
    [getUserList.pending]: (state) => {
      state.userListStatus = statusConstants.loading;
    },
    [getUserList.fulfilled]: (state, action) => {
      state.userList = action.payload;
      state.userListStatus = statusConstants.fulfilled;
    },
  },
});

export const {
  showNewPostModal,
  hideNewPostModal,
  changeSort,
  setDraftData,
  clearDraftData,
  changePostFlag,
} = operationSlice.actions;
export default operationSlice.reducer;
