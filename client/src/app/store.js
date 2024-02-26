import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderItemsReduce from "../features/orderItems/orderItemsSlice";
import ordersReducer from "../features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    orderItems: orderItemsReduce,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});
