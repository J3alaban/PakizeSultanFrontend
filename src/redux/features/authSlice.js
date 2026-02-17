import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  modalOpen: false,
  username: localStorage.getItem("username") ?? "",
  role: localStorage.getItem("role") ?? null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action) => {
      state.modalOpen = action.payload;
    },
    doLogin: (state, action) => {
      localStorage.setItem("username", action.payload.email);
      localStorage.setItem("role", action.payload.role);

      state.username = action.payload.email;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      state.modalOpen = false;
    },
    doLogout: (state) => {
      localStorage.clear();
      state.username = "";
      state.role = null;
      state.isLoggedIn = false;
    },
  },
});

export const { updateModal, doLogin, doLogout } = authSlice.actions;
export default authSlice.reducer;
