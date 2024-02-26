import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { orderExApiSlice } from "./ordersApiSlice";

const ordersAdapter = createEntityAdapter({
  selectId: (entity) => entity.order_id,
  sortComparer: (a, b) => b.order_updated_at.localeCompare(a.order_updated_at),
});

const initialState = ordersAdapter.getInitialState({});

const cartSlice = createSlice({
  name: "order",
  initialState,

  extraReducers: (builder) => {
    builder
      .addMatcher(
        orderExApiSlice.endpoints.getAllOrders.matchFulfilled,
        (state, action) => {
          ordersAdapter.setAll(state, action.payload);
        }
      )
      .addMatcher(
        orderExApiSlice.endpoints.createOrder.matchFulfilled,
        (state, action) => {
          const order_id = action.payload[0].order_id;
          state.ids.push(order_id);
          state.entities[order_id] = action.payload[0];
        }
      )
      .addMatcher(
        orderExApiSlice.endpoints.getOrderById.matchFulfilled,
        (state, action) => {
          const order_id = action.payload[0].order_id;
          const orderItemId = state.entities[order_id];

          if (orderItemId) {
            state.entities[order_id] = action.payload[0];
          }
        }
      )
      .addMatcher(
        orderExApiSlice.endpoints.updateOrder.matchFulfilled,
        (state, action) => {
          const order_id = action.payload[0].order_id;
          const orderItemId = state.entities[order_id];

          if (orderItemId) {
            state.entities[order_id] = action.payload[0];
          }
        }
      )
      .addMatcher(
        orderExApiSlice.endpoints.deleteOrder.matchFulfilled,
        (state, action) => {
          console.log("this is delete", action.payload);
          const order_id = action.payload.order_id;
          const order = state.entities[order_id];

          if (order) {
            const idIndex = state.ids.indexOf(order_id);
            state.ids.splice(idIndex, 1);
            delete state.entities[order_id];
          }
        }
      );
  },
});

export default cartSlice.reducer;

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectAllOrderIds,
} = ordersAdapter.getSelectors((state) => state.orders);
