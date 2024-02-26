import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { orderItemsExApiSlice } from "./orderItemsApiSlice";

const orderItemsAdapter = createEntityAdapter({
  selectId: (entity) => entity.order_item_id,
});

const initialState = orderItemsAdapter.getInitialState({});

const orderItemSlice = createSlice({
  name: "OrderItems",
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(
        orderItemsExApiSlice.endpoints.getOrderItems.matchFulfilled,
        (state, action) => {
          orderItemsAdapter.setAll(state, action.payload);
        }
      )
      .addMatcher(
        orderItemsExApiSlice.endpoints.createOrderItem.matchFulfilled,
        (state, action) => {
          const order_item_id = action.payload[0].order_item_id;
          state.ids.push(order_item_id);
          state.entities[order_item_id] = action.payload[0];
        }
      )
      .addMatcher(
        orderItemsExApiSlice.endpoints.updateOrderItem.matchFulfilled,
        (state, action) => {
          const orderItemQty = action.payload[0].order_item_qty;
          const order_item_id = action.payload[0].order_item_id;
          const orderItemId = state.entities[order_item_id];

          if (orderItemId && orderItemQty === 0) {
            const idIndex = state.ids.indexOf(order_item_id);
            state.ids.splice(idIndex, 1);
            delete state.entities[order_item_id];
          }
          if (orderItemId && orderItemQty !== 0) {
            state.entities[order_item_id] = action.payload[0];
          }
        }
      )
      .addMatcher(
        orderItemsExApiSlice.endpoints.deleteOrderItem.matchFulfilled,
        (state, action) => {
          const order_item_id = action.payload[0].order_item_id;
          const orderItemId = state.entities[order_item_id];

          if (orderItemId) {
            const idIndex = state.ids.indexOf(order_item_id);
            state.ids.splice(idIndex, 1);
            delete state.entities[order_item_id];
          }
        }
      );
  },
});

export default orderItemSlice.reducer;

export const {
  selectAll: selectAllOrderItems,
  selectIds: selectAllOrderItemIds,
  selectById: selectOrderItemById,
} = orderItemsAdapter.getSelectors((state) => state.orderItems);

export const selectAllOrderItemIdProductId = createSelector(
  (state) => state.orderItems,
  (orderItems) =>
    orderItemsAdapter
      .getSelectors()
      .selectAll(orderItems)
      .map((orderItem) => orderItem.product_id)
);

export const selectOrderItemTotals = createSelector(
  (state) => state.orderItems,

  (orderItems) => {
    let accumlatedQtyTotal = 0;
    let accumlatedAmountTotal = 0;

    for (const item of Object.values(orderItems.entities)) {
      const qty = item.order_item_qty;
      const amount = item.order_item_price;
      accumlatedQtyTotal += qty;
      accumlatedAmountTotal += qty * amount;
    }
    return { accumlatedAmountTotal, accumlatedQtyTotal };
  }
);
