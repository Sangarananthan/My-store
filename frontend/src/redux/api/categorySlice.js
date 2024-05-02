import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../features/constants";
export const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),
    removeCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),
    listCategory: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/list`,
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
  useListCategoryQuery,
} = categorySlice;
