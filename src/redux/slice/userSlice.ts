// src/redux/slices/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserInfo = {
  id: string;
  name: string;
  email: string;
  role: "user" | "owner";
};

type UserState = {
  user: UserInfo | null;
  isLoggedIn: boolean;
  token: string | null;
  email:string |null
};

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  token: null,
  email:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ✅ Sets all user info + optional token
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    // ✅ Optional: set token separately
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { setUserInfo, setToken, clearUser,setEmail } = userSlice.actions;
export default userSlice.reducer;
