import { createSlice } from "@reduxjs/toolkit";
import { getUserData, getUserPost } from "../../firebase/firestore-methods";

const initialState = {
  status: "idle",
  error: null,
  userData: {},
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.status = "loading";
    },
    [getUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = "fulfilled";
    },
  },
});

export default userDataSlice.reducer;
