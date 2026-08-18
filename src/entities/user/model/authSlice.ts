import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message, AuthPayload } from "./types";

interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
  message: Message;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userEmail: null,
  message: { text: "", type: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthPayload>) {
      state.isAuthenticated = true;
      state.userEmail = action.payload.email;
      state.message = { text: "Вы успешно вошли", type: "success" };
    },
    signUpSuccess(state, action: PayloadAction<AuthPayload>) {
      state.isAuthenticated = true;
      state.userEmail = action.payload.email;
      state.message = { text: "Аккаунт успешно создан", type: "success" };
    },
    authError(state, action: PayloadAction<string>) {
      state.message = { text: action.payload, type: "error" };
    },
    clearMessage(state) {
      state.message = { text: "", type: "" };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userEmail = null;
      state.message = { text: "", type: "" };
    },
  },
});

export const { loginSuccess, signUpSuccess, authError, clearMessage, logout } =
  authSlice.actions;
export default authSlice.reducer;
