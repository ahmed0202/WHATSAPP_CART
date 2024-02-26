import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

export const orderItemsExApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderItems: builder.query({
      query: (order_id) => ({
        url: `/order-items/?order_id=${order_id}`,
      }),
      transformResponse: (resData) => resData.data,
    }),
    createOrderItem: builder.mutation({
      query: (orderItem) => ({
        url: "/order-items/create",
        method: "POST",
        body: orderItem,
      }),
      transformResponse: (resData) => resData.data,
    }),
    updateOrderItem: builder.mutation({
      query: ({ order_item_id, order_item_qty }) => ({
        url: "/order-items/update",
        method: "PUT",
        body: {
          order_item_id,
          order_item_qty,
        },
      }),
      transformResponse: (resData) => {
        return resData.data;
      },
    }),
    deleteOrderItem: builder.mutation({
      query: ({ order_item_id }) => ({
        url: `/order-items/${order_item_id}/delete`,
        method: "DELETE",
      }),
      transformResponse: (resData) => {
        return resData.data;
      },
    }),
  }),
});

export const {
  useGetOrderItemsQuery,
  useCreateOrderItemMutation,
  useUpdateOrderItemMutation,
  useDeleteOrderItemMutation,
} = orderItemsExApiSlice;
