import { createEntityAdapter, createSelector, isDraft } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

const productsAdapter = createEntityAdapter({
  selectId: (entity) => entity.product_id,
  sortComparer: (a, b) =>
    b.product_updated_at.localeCompare(a.product_updated_at),
});

const initialState = productsAdapter.getInitialState();

export const productsExApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: "/products/" }),
      transformResponse: (resData) => {
        return productsAdapter.setAll(initialState, resData.data);
      },
      providesTags: (result, error, arg) => [
        { type: "Products", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Products", id })),
      ],
    }),

    createProduct: builder.mutation({
      query: (formDataBody) => ({
        url: "/products/create",
        method: "POST",
        body: formDataBody,
      }),
      transformResponse: (resData) => {
        return resData.data[0];
      },
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(
              productsExApiSlice.util.updateQueryData(
                "getProducts",
                undefined,
                (draft) => {
                  draft.ids.unshift(data.product_id);
                  draft.entities[data.product_id] = data;
                }
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });
      },
      invalidatesTags: (result, error, { product_id }) => [
        { type: "Products", id: { product_id } },
      ],
    }),
    updateProduct: builder.mutation({
      query: (formData) => ({
        url: "/products/update",
        method: "PUT",
        body: formData,
      }),
      transformResponse: (resData) => {
        return resData.data[0];
      },

      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data: data } = await queryFulfilled;

          dispatch(
            productsExApiSlice.util.updateQueryData(
              "getProducts",
              undefined,
              (draft) => {
                const product = draft.entities[data.product_id];
                if (product) {
                  draft.entities[data.product_id] = data;
                }
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: (result, error, { product_id }) => [
        { type: "Products", id: { product_id } },
      ],
    }),
    deleteProduct: builder.mutation({
      query: ({ product_id }) => ({
        url: `/products/${product_id}/delete`,
        method: "DELETE",
      }),
      async onQueryStarted({ product_id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            productsExApiSlice.util.updateQueryData(
              "getProducts",
              undefined,
              (draft) => {
                const idIndex = draft.ids.indexOf(product_id);
                draft.ids.splice(idIndex, 1);
                delete draft.entities[product_id];
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: (result, error, { product_id }) => [
        { type: "Products", id: { product_id } },
      ],
    }),
  }),
});

const selectProductsResult = productsExApiSlice.endpoints.getProducts.select();

const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data
);
export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsExApiSlice;
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectTotal: selectProductTotal,
} = productsAdapter.getSelectors(
  (state) => selectProductsData(state) ?? initialState
);
