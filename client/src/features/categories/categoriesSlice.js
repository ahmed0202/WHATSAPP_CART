import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

const categoriesAdapter = createEntityAdapter({
  selectId: (entity) => entity.category_id,
});

const initialState = categoriesAdapter.getInitialState();

export const categoriesExApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({ url: "/categories" }),
      transformResponse: (resData) => {
        return categoriesAdapter.setAll(initialState, resData.data);
      },
      providesTags: (result, error, arg) => [
        { type: "Categories", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Categories", id })),
      ],
    }),
    createCategory: builder.mutation({
      query: ({ category_name }) => ({
        url: "/categories/create",
        method: "POST",
        body: {
          category_name,
        },
      }),
      transformResponse: (resData) => {
        return resData.data[0];
      },
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => {
            dispatch(
              categoriesExApiSlice.util.updateQueryData(
                "getCategories",
                undefined,
                (draft) => {
                  draft.ids.push(data.category_id);
                  draft.entities[data.category_id] = data;
                }
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });
      },
      invalidatesTags: (result, error, { category_id }) => [
        { type: "Categories", id: { category_id } },
      ],
    }),
    updateCategory: builder.mutation({
      query: ({ category_id, category_name }) => ({
        url: "/categories/update",
        method: "PUT",
        body: {
          category_id,
          category_name,
        },
      }),
      transformResponse: (resData) => {
        return resData.data[0];
      },

      async onQueryStarted({ category_id }, { dispatch, queryFulfilled }) {
        try {
          const { data: data } = await queryFulfilled;

          dispatch(
            categoriesExApiSlice.util.updateQueryData(
              "getCategories",
              undefined,
              (draft) => {
                const category = draft.entities[category_id];
                if (category) {
                  draft.entities[category_id] = data;
                }
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: (result, error, { category_id }) => [
        { type: "Categories", id: { category_id } },
      ],
    }),
    deleteCategory: builder.mutation({
      query: ({ category_id }) => ({
        url: `/categories/${category_id}/delete`,
        method: "DELETE",
      }),
      async onQueryStarted({ category_id }, { dispatch, queryFulfilled }) {
        try {
          const { data: data } = await queryFulfilled;

          dispatch(
            categoriesExApiSlice.util.updateQueryData(
              "getCategories",
              undefined,
              (draft) => {
                const idIndex = draft.ids.indexOf(category_id);
                draft.ids.splice(idIndex, 1);
                delete draft.entities[category_id];
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: (result, error, { category_id }) => [
        { type: "Categories", id: { category_id } },
      ],
    }),
  }),
});

const selectCategoriesResult =
  categoriesExApiSlice.endpoints.getCategories.select();

const selectCategoriesData = createSelector(
  selectCategoriesResult,
  (categoriesResult) => categoriesResult.data
);

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesExApiSlice;

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors(
  (state) => selectCategoriesData(state) ?? initialState
);
