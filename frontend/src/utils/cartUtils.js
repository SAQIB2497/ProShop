export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
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

  return state;
};
