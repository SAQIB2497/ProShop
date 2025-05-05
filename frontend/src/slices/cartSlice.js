import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils.js";

const initialState = localStorage.getItem("Cart")
  ? JSON.parse(localStorage.getItem("Cart"))
  : {
      cartItems: [],
      shippingAdress: {},
      paymentMethod: "Paypal",
    };

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      return updateCart(state);
    },
    removefromcart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
    saveShippingAdress: (state, action) => {
      state.shippingAdress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.oayload;
      return updateCart(state);
    },
  },
});

export const {
  addtoCart,
  removefromcart,
  saveShippingAdress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
