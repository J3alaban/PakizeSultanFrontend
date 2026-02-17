import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  categories: [],
  newProducts: [],
  featuredProducts: [],
  wishlist: [],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    updateNewList: (state, action) => {
      return { ...state, newProducts: action.payload };
    },
    updateFeaturedList: (state, action) => {
      return { ...state, featuredProducts: action.payload };
    },
    addToWishlist: (state, action) => {
      const { wishlist } = state;

      if (wishlist.findIndex(item => item.id === action.payload.id) === -1) {
        const updatedList = [...state.wishlist, action.payload];
        return { ...state, wishlist: updatedList };
      }
    },
    addCategories: (state, action) => {
      return { ...state, categories: action.payload };
    },
    addProducts: (state, action) => {
      return { ...state, allProducts: action.payload };
    },
    setWishlist: (state, action) => {
      return { ...state, wishlist: action.payload };
    },
  },
});

export const {
  updateNewList,
  updateFeaturedList,
  addToWishlist,
  setWishlist,
  addCategories,
  addProducts,
} = productSlice.actions;

export default productSlice.reducer;
