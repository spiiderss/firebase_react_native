import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    posts: [],
    userFollows: [],
  },
  reducers: {
    inc: (state, action) => {
      state.currentUser = action.payload;
    },
    userPost: (state, action) => {
      state.posts = action.payload;
    },
    addUserFollows: (state, action) => {
      state.userFollows.push(...action.payload);
    },
    clearUserPosts: (state, action) => {
      state = {
        currentUser: null,
        posts: [],
        userFollows: [],
      };
    },
  },
});
export const { inc, userPost, addUserFollows, clearUserPosts } =
  authSlice.actions;
export default authSlice.reducer;
