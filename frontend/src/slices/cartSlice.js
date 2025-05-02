import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("Cart")
  ? JSON.parse(localStorage.getItem("Cart"))
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
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

      // calculate items price
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // calculate shipping price
      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

      // calculate tax price (15%)
      state.taxPrice = addDecimal(0.15 * state.itemsPrice);

      // calculate total price
      state.totalPrice = addDecimal(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      );

      // update local storage
      localStorage.setItem("Cart", JSON.stringify(state));
    },
  },
});

export const { addtoCart } = cartSlice.actions;
export default cartSlice.reducer;
 