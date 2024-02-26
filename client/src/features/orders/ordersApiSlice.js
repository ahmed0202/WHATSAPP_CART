import apiSlice from "../../app/api/apiSlice";

export const orderExApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `/orders/`,
      }),
      transformResponse: (resData) => resData.data,

      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (order_id) => ({
        url: `/orders/?order_id=${order_id}`,
      }),
      transformResponse: (resData) => {
        return resData.data;
      },
      transformErrorResponse: (err) => console.log(err),

      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: () => ({
        url: "/orders/create",
      }),
      transformResponse: (resData) => {
        return resData.data;
      },
    }),
    updateOrder: builder.mutation({
      query: (order) => ({
        url: "/orders/update",
        method: "PUT",
        body: order,
      }),
      transformResponse: (resData) => {
        return resData.data;
      },
    }),
    deleteOrder: builder.mutation({
      query: ({ order_id }) => ({
        url: `/orders/${order_id}/delete`,
        method: "DELETE",
      }),
      transformResponse: (resData) => resData.data,
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderExApiSlice;
