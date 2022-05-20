import { createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../../firebase/firestore-methods";
import { statusConstants } from "../../utils/constants";

const initialState = {
  status: statusConstants.idle,
  error: null,
  userData: {},
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.status = statusConstants.loading;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = statusConstants.fulfilled;
    },
  },
});

export default userDataSlice.reducer;
