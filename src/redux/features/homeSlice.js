import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBannerVisible:
    localStorage.getItem("isBannerVisibleClosed") === "true" ? false : true,
  isDarkMode: false,
  isLoading: false,
};

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    updateBanner: (state, action) => {
      return { ...state, isBannerVisible: action.payload };
    },
    updateDarkMode: (state, action) => {
      return { ...state, isDarkMode: action.payload };
    },
    updateLoading: (state, action) => {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { updateBanner, updateDarkMode, updateLoading } =
  homeSlice.actions;
export default homeSlice.reducer;
