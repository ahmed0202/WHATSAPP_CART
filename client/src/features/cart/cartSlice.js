import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { orderExApiSlice } from "../orders/ordersApiSlice";

const cookies = Cookies.get();
const parsedOrder = cookies?.cart ? JSON.parse(cookies.cart) : null;
const initialState = {
  cart: parsedOrder ? parsedOrder : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  extraReducers: (builder) => {
    builder
      .addMatcher(
        orderExApiSlice.endpoints.createOrder.matchFulfilled,
        (state, action) => {
          state.cart = action.payload[0];
        }
      )
      .addMatcher(
        orderExApiSlice.endpoints.updateOrder.matchFulfilled,
        (state, action) => {
          state.cart = [];
        }
      );
  },
});

export default cartSlice.reducer;

export const selectCart = (state) => state.cart.cart;
export const selectCartId = (state) => state.cart.cart.order_id;
