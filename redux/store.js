import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import userSlice from "./auth/userSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});
