import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),

  tagTypes: ["Categories", "Products", "OrderItems"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
