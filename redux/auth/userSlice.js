import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    userLoaded: 0,
  },
  reducers: {
    // 将目标id的用户信息添加入users
    users_data_state_change: (state, action) => {
      state.users.push(action.payload);
    },
    // 如果传来的uid存在于users列表中，那么就将这个用户的posts写入users列表
    user_Post_change: (state, { payload: { posts, uid } }) => {
      const user = state.users.find((item) => (item.uid = uid));

      state.users = state.users.map((item) =>
        item.uid === user.uid ? { ...item, posts } : state.users
      );
      state.userLoaded += 1;
    },
  },
});
export const { users_data_state_change, user_Post_change } = userSlice.actions;
export default userSlice.reducer;
