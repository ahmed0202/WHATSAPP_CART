import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseDb } from "../../services/firebaseConfig";
import Cookies from "js-cookie";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(
      firebaseDb,
      email,
      password
    );

    return { email: data.user.email, accessToken: data.user.accessToken };
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(firebaseDb, email, password);
    return { email: data.user.email, accessToken: data.user.accessToken };
  }
);

export const sign_out = createAsyncThunk("auth/sign_out", async () => {
  const data = await signOut(firebaseDb);
  return data;
});

// i know ;)
const cookies = Cookies.get();

const initialState = {
  user: cookies?.email || null,
  token: cookies?.token || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        const { email, accessToken } = action.payload;
        state.user = email;
        state.token = accessToken;
      })
      .addCase(signUp.rejected, (state, action) => {
        const error = action.error.message;
        state.error = error;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const { email, accessToken } = action.payload;
        state.user = email;
        state.token = accessToken;
      })
      .addCase(signIn.rejected, (state, action) => {
        const error = action.error.message;
        state.error = error;
      })
      .addCase(sign_out.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
      })
      .addCase(sign_out.rejected, (state, action) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectAuthError = (state) => state.auth.error;
